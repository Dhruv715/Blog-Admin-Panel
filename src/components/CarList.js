import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
  Box,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCar from './EditCar';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Admin/AllCars', {
          headers: {
            auth: token,
          },
        });
        if (response.data.status === 'Success') {
          setCars(response.data.data);
        } else {
          setError('Failed to fetch car data: ' + response.data.message);
        }
      } catch (error) {
        setError('Error fetching car data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleEdit = (car) => {
    setSelectedCar(car);
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.delete(`http://localhost:5000/Admin/DeleteCar/${carId}`, {
          headers: {
            auth: token,
          },
        });
        if (response.data.status === 'Success') {
          const updatedCars = cars.filter((car) => car._id !== carId);
          setCars(updatedCars);
        } else {
          setError('Failed to delete car: ' + response.data.message);
        }
      } catch (error) {
        setError('Error deleting car: ' + error.message);
      }
    }
  };

  const handleStatusChange = async (car, status) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.patch(`http://localhost:5000/Admin/modifyCarData/${car._id}`, {
        status: status
      }, {
        headers: {
          auth: token,
        },
      });

      if (response.data.status === 'Success') {
        const updatedCars = cars.map((c) =>
          c._id === car._id ? { ...c, status: status } : c
        );
        setCars(updatedCars);
      } else {
        setError('Failed to update car status: ' + response.data.message);
      }
    } catch (error) {
      setError('Error updating car status: ' + error.message);
    }
  };

  const handleCloseEdit = () => {
    setSelectedCar(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Car List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="car table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Car Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Owner Type</TableCell>
              <TableCell>KM Reading</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>
                  <img
                    src={`http://localhost:5000/images/${car.images[0]}`}
                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                    alt=""
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.name}
                </TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell>{car.ownerType}</TableCell>
                <TableCell>{car.kmReading}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      value={car.status}
                      onChange={(e) => handleStatusChange(car, e.target.value)}
                    >
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="process">Process</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(car)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(car._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(selectedCar)} onClose={handleCloseEdit}>
        {selectedCar && (
          <EditCar
            car={selectedCar}
            onClose={handleCloseEdit}
            onSave={(updatedCar) => {
              const updatedCars = cars.map((car) =>
                car._id === updatedCar._id ? updatedCar : car
              );
              setCars(updatedCars);
              setSelectedCar(null);
            }}
          />
        )}
      </Dialog>
    </Box>
  );
}

export default CarList;
