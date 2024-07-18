import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';

function AllUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://blog-backend-pgsc.onrender.com/users/getAllUsers');
        setUsers(response.data.data); // Assuming response.data contains { status: 'Success', data: users }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        All Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Username</strong></TableCell>
            <TableCell align="center"><strong>Email</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllUser;
