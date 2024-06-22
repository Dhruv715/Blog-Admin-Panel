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
  CircularProgress,
  Typography,
  Box
} from '@mui/material';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Admin/GetAllUsers', {
          headers: {
            auth: localStorage.getItem('Token'),
          },
        });
        if (response.data) {
          setUsers(response.data.users);
        } else {
          setError('Failed to fetch user data: ' + response.data.message);
        }
      } catch (error) {
        setError('Error fetching user data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        All User Data
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Profile Image</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Email Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
              <TableCell>
                  {user.profileImage ? (
                    <img
                      src={`http://localhost:5000/images/${user.profileImage}`}
                      alt="Profile"
                      style={{ width: '50px', height: '50px', objectFit: 'cover',borderRadius:'50%' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                
                <TableCell>
                   {user.emailOTP.verified  ? (
                    <img
                      src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg"
                      alt="Profile"
                      style={{ width: '50px', height: '50px', objectFit: 'cover',borderRadius:'50%' }}
                    />
                  ) : (
                    'No Image'
                  )}
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Users;
