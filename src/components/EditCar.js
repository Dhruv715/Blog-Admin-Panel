import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Grid,
  Typography,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function EditCar({ car, onClose, onSave }) {
  const [editedCar, setEditedCar] = useState({ ...car });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEditedCar({ ...editedCar, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = editedCar.images.filter((_, i) => i !== index);
    setEditedCar({ ...editedCar, images: updatedImages });
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/Admin/UploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth': localStorage.getItem('Token')
          }
        });

        if (response.data.status === 'Success') {
          const newImageName = response.data.imageName;
          setEditedCar((prevCar) => ({
            ...prevCar,
            images: [...prevCar.images, newImageName]
          }));
        } else {
          setError('Failed to upload image: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while uploading image');
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.patch(`http://localhost:5000/Admin/modifyCarData/${car._id}`, editedCar, {
        headers: { 'auth': token }
      });

      if (response.data.status === 'Success') {
        onSave(editedCar);
        onClose();
      } else {
        setError('Failed to update car: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating car');
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <TextField
          label="Car Name"
          name="name"
          value={editedCar.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          name="model"
          value={editedCar.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={editedCar.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          name="year"
          value={editedCar.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Color"
          name="color"
          value={editedCar.color}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Owner Type"
          name="ownerType"
          value={editedCar.ownerType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="First Owner">First Owner</MenuItem>
          <MenuItem value="Second Owner">Second Owner</MenuItem>
        </TextField>
        <TextField
          label="KM Reading"
          name="kmReading"
          value={editedCar.kmReading}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          {editedCar.images.map((img, index) => (
            <Grid item key={index} xs={6} sm={4} md={3}>
              <div style={{ position: 'relative' }}>
                <img src={`http://localhost:5000/images/${img}`} alt={`car ${index}`} style={{ width: '100%' }} />
                <IconButton
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Grid>
          ))}
          <Grid item xs={6} sm={4} md={3}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={handleAddImage}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <AddPhotoAlternateIcon style={{ fontSize: '3rem' }} />
              </IconButton>
            </label>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCar;