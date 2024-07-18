import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Container, TextField, Button, Grid } from '@mui/material';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post(
        'https://blog-backend-pgsc.onrender.com/blog/add',
        {
          title,
          content,
        },
        {
          headers: {
            auth: token,
          },
        }
      );
      console.log('Blog added successfully:', response.data);
      setTitle('');
      setContent('');
      // Optionally: Redirect to another page or show a success message
    } catch (error) {
      console.error('Error adding blog:', error);
      setError('Failed to add blog. Please try again.'); // Example error handling
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={4}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Blog
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
}

export default AddBlog;
