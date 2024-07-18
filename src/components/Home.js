import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, Box } from '@mui/material';

function Home() {
  const [blogCount, setBlogCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchBlogCount = async () => {
      try {
        const response = await axios.get('https://blog-backend-pgsc.onrender.com/blog/countBlog');
        setBlogCount(response.data.blogCount);
      } catch (error) {
        console.error('Error fetching blog count:', error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await axios.get('https://blog-backend-pgsc.onrender.com/users/countUsers');
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchBlogCount();
    fetchUserCount();
  }, []);

  return (
    <div>
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Number of Blogs
            </Typography>
            <Typography variant="h4">{blogCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Number of Users
            </Typography>
            <Typography variant="h4">{userCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
