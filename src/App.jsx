import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OCConnect, LoginCallBack } from '@opencampus/ocid-connect-js';
import HeroSection from "./components/pages/hero";
import LoginPage from "./components/pages/login";
import RedirectPage from "./components/pages/RedirectPage";
import Form from "./components/pages/form";
import AboutUs from "./components/pages/about";
import HowEduGrantWorks from "./components/pages/works";
import ImpactStories from "./components/pages/impact";

function App() {
  const opts = {
    redirectUri: 'http://localhost:5173/redirect',
    referralCode: 'PARTNER6',
    domain: 'localhost',
    sameSite: false
  };

  const loginSuccess = () => {
    console.log('Login successful');
    window.location.href = '/';
  };

  const loginError = (error) => {
    console.error('Login failed:', error);
    window.location.href = '/login?error=auth_failed';
  };

  return (
    <OCConnect opts={opts} sandboxMode={true}>
      <div className="min-h-screen bg-white">
        <Router>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/form" element={<Form />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/works" element={<HowEduGrantWorks />} />
            <Route path="/impact" element={<ImpactStories />} />
            <Route 
              path="/redirect" 
              element={
                <LoginCallBack 
                  successCallback={loginSuccess}
                  errorCallback={loginError}
                />
              } 
            />
          </Routes>
        </Router>
      </div>
    </OCConnect>
  );
}

export default App;