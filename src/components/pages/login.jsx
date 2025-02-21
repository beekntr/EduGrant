'use client'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import eduChainLogo from '../../assets/educhain.svg';

export default function LoginPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isInitialized, authState, ocAuth } = useOCAuth();

  useEffect(() => {
    // Load Google's OAuth 2.0 library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      if (!window.google) {
        throw new Error('Google API not loaded');
      }

      const client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: async (response) => {
          if (response.access_token) {
            try {
              // Get user info from Google
              const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${response.access_token}`,
                },
              });
              
              if (!userInfoResponse.ok) {
                throw new Error('Failed to get user info from Google');
              }

              const userInfo = await userInfoResponse.json();

              // Send to our backend
              const serverResponse = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userInfo.email,
                  name: userInfo.name,
                  googleId: userInfo.sub,
                }),
              });

              if (!serverResponse.ok) {
                throw new Error('Failed to authenticate with server');
              }

              navigate('/');
            } catch (error) {
              console.error('Authentication error:', error);
              setError('Authentication failed. Please try again.');
            }
          }
        },
      });

      client.requestAccessToken();
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleEduChainSignIn = async () => {
    try {
      if (!isInitialized) {
        throw new Error('EduChain SDK not initialized');
      }
      
      await ocAuth.signInWithRedirect({ 
        state: 'opencampus'
      });
      
    } catch (err) {
      console.error('EduChain login error:', err);
      setError('Failed to sign in with EduChain. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center">
          <img
            src={eduChainLogo}
            alt="EduChain Logo"
            className="mx-auto h-16 w-16 mb-6"
          />
          <h2 className="text-2xl font-bold mb-8">Sign in to your account</h2>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Email address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm">Password</label>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              <span className="ml-2">Google</span>
            </button>
            <button
              type="button"
              onClick={handleEduChainSignIn}
              disabled={!isInitialized}
              className={`flex items-center justify-center px-4 py-2 border rounded-lg ${
                isInitialized ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <img
                className="h-5 w-5"
                src={eduChainLogo}
                alt="EduChain logo"
              />
              <span className="ml-2">EduChain</span>
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}

        {!isInitialized && (
          <p className="mt-4 text-center text-gray-500">
            Initializing EduChain...
          </p>
        )}
      </div>
    </div>
  );
}