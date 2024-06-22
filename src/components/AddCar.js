import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Typography, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Alert from '@mui/material/Alert'; 
const AddCar = () => {
  const [carData, setCarData] = useState({
    name: '',
    model: '',
    price: '',
    year: '',
    color: '',
    images: [],
    description: '',
    ownerType: 'First Owner',
    kmReading: '',
    features: [''],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + carData.images.length > 10) {
      setErrorMessage('You can upload a maximum of 10 images.');
      return;
    }

    setErrorMessage('');
    const updatedImages = [...carData.images, ...files];
    setCarData({ ...carData, images: updatedImages });

    const previews = updatedImages.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleFeatureChange = (index, e) => {
    const features = [...carData.features];
    features[index] = e.target.value;
    setCarData({ ...carData, features });
  };

  const addFeatureField = () => {
    setCarData({ ...carData, features: [...carData.features, ''] });
  };

  const handleImageDelete = (index) => {
    const updatedImages = carData.images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setCarData({ ...carData, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in carData) {
      if (key === 'images') {
        carData[key].forEach(image => data.append('images', image));
      } else if (key === 'features') {
        carData[key].forEach(feature => data.append('features', feature));
      } else {
        data.append(key, carData[key]);
      }
    }
    const token  = localStorage.getItem('Token');
    console.log(token);
    try {
      const response = await axios.post('http://localhost:5000/Admin/AddCar', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          auth : token
        },
      });
      console.log(response.data);
      setSuccessMessage('Car added successfully');
      setOpenSnackbar(true);
      setCarData({
        name: '',
        model: '',
        price: '',
        year: '',
        color: '',
        images: [],
        description: '',
        ownerType: 'First Owner',
        kmReading: '',
        features: [''],
      });
      setImagePreviews([]);
    } catch (error) {
      console.error('Error adding car', error);
      setErrorMessage('Error adding car');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Car
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={carData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Model"
            name="model"
            value={carData.model}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Price"
            name="price"
            value={carData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Year"
            name="year"
            value={carData.year}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Color"
            name="color"
            value={carData.color}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        </Grid>
      </Grid>
      <TextField
        label="Description"
        name="description"
        value={carData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Owner Type</InputLabel>
        <Select
          label="Owner Type"
          name="ownerType"
          value={carData.ownerType}
          onChange={handleChange}
        >
          <MenuItem value="First Owner">First Owner</MenuItem>
          <MenuItem value="Second Owner">Second Owner</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="KM Reading"
            name="kmReading"
            value={carData.kmReading}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
      </Grid>
      {carData.features.map((feature, index) => (
        <TextField
          key={index}
          label={`Feature ${index + 1}`}
          value={feature}
          onChange={(e) => handleFeatureChange(index, e)}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" onClick={addFeatureField} fullWidth sx={{ mb: 2 }}>
        Add Feature
      </Button>
      <Button variant="contained" component="label" fullWidth margin="normal">
        Upload Images
        <input type="file" name="images" onChange={handleImageChange} hidden multiple />
      </Button>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {imagePreviews.map((src, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100px', height: '100px' }}>
            <img src={src} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <IconButton
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleImageDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Add Car
      </Button>
    </Box>
  );
};

export default AddCar;
