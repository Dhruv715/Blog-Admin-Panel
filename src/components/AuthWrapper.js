import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('Token');
      console.log(token);
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.post('https://blog-backend-pgsc.onrender.com/VerifyAdmin',{}, {
          headers:{
            'auth' : token
          }
        });

        // console.log('Token Validation Response:', response.data);
        console.log('Token Validation Success Auth');

        if (response.data.status !== 'Success') {
          navigate('/login');
        } else {
          setLoading(false);
          if (location.pathname === '/login') {
            navigate('/admin'); // Redirect to '/admin' upon successful authentication
          }
        }
      } catch (error) {
        console.error('Token Validation Error:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
