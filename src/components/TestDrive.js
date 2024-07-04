import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function TestDrive() {
  const [testDrives, setTestDrives] = useState([]);
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('https://carhub-car-selling-website-backend-1.onrender.com/Admin/AllTestDrive')
      .then(response => {
        setTestDrives(response.data);
      })
      .catch(error => {
        console.error('Error fetching test drive data:', error);
      });
  }, []);

  const handleViewDetails = (id) => {
    axios.get(`https://carhub-car-selling-website-backend-1.onrender.com/Admin/ShowTestDrive/${id}`)
      .then(response => {
        setSelectedTestDrive(response.data);
        setOpen(true);
      })
      .catch(error => {
        console.error('Error fetching test drive details:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTestDrive(null);
  };

  const truncateMessage = (message) => {
    const words = message.split(' ');
    return words.length > 3 ? `${words.slice(0, 3).join(' ')}...` : message;
  };

  return (
    <div>
      <h1>Test Drive List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Car Model</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testDrives.map((testDrive) => (
              <TableRow key={testDrive._id}>
                <TableCell>{testDrive.name}</TableCell>
                <TableCell>{testDrive.email}</TableCell>
                <TableCell>{testDrive.phone}</TableCell>
                <TableCell>{testDrive.carModel}</TableCell>
                <TableCell>{truncateMessage(testDrive.message)}</TableCell>
                <TableCell>{new Date(testDrive.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewDetails(testDrive._id)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedTestDrive && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Test Drive Details</DialogTitle>
          <DialogContent>
            <p><strong>Name:</strong> {selectedTestDrive.name}</p>
            <p><strong>Email:</strong> {selectedTestDrive.email}</p>
            <p><strong>Phone:</strong> {selectedTestDrive.phone}</p>
            <p><strong>Car Model:</strong> {selectedTestDrive.carModel}</p>
            <p><strong>Message:</strong> {selectedTestDrive.message}</p>
            <p><strong>Created At:</strong> {new Date(selectedTestDrive.createdAt).toLocaleString()}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default TestDrive;
