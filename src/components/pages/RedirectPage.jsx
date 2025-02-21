import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOCAuth } from '@opencampus/ocid-connect-js';

export default function RedirectPage() {
  const { isInitialized, authState, OCId, ethAddress } = useOCAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !authState.error) {
      fetch('/api/auth/educhain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OCId,
          ethAddress,
          authState
        })
      })
      .then(response => {
        if (response.ok) {
          navigate('/');
        } else {
          throw new Error('Failed to authenticate with server');
        }
      })
      .catch(error => {
        console.error('Authentication error:', error);
        navigate('/login?error=auth_failed');
      });
    }
  }, [isInitialized, authState, navigate]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  return <div>Processing authentication...</div>;
} 