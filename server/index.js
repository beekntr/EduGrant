import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri ? 'URI is set' : 'URI is missing'); // Debug log

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
    db = client.db('educhain');
    // Test the connection
    await db.command({ ping: 1 });
    console.log("Database ping successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Connect to MongoDB when starting the server
await connectDB().catch(console.error);

app.post('/api/auth/google', async (req, res) => {
  try {
    console.log('Received Google auth request with body:', {
      email: req.body.email,
      name: req.body.name,
      googleId: req.body.googleId ? 'present' : 'missing'
    });

    const { email, name, googleId } = req.body;

    // Validate required fields
    if (!email || !name || !googleId) {
      console.log('Missing required fields:', { email, name, googleId });
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        received: { email, name, googleId }
      });
    }

    // Ensure database connection
    if (!db) {
      console.error('Database connection not established');
      return res.status(500).json({
        success: false,
        error: 'Database connection not established'
      });
    }

    const users = db.collection('users');

    // Check if user exists
    let user = await users.findOne({ email });
    console.log('Existing user found:', user ? 'yes' : 'no');

    if (!user) {
      // Create new user
      const newUser = {
        email,
        name,
        googleId,
        createdAt: new Date()
      };

      const result = await users.insertOne(newUser);
      console.log('New user created with ID:', result.insertedId);

      user = {
        _id: result.insertedId,
        ...newUser
      };
    }

    // Send success response
    res.status(200).json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Detailed auth error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    dbConnected: !!db,
    timestamp: new Date()
  });
});

const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}); 