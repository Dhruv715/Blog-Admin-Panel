import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    overflowX: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  table: {
    minWidth: 650,
  },
}));

function Inquiry() {
  const classes = useStyles();
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Admin/getAllInquiry');
        setInquiries(response.data.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error.message);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Inquiry List
      </Typography>
      <Paper className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Car Model</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry._id}>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{inquiry.phone}</TableCell>
                <TableCell>{inquiry.carModel}</TableCell>
                <TableCell>{inquiry.location}</TableCell>
                <TableCell>{inquiry.message}</TableCell>
                <TableCell>{new Date(inquiry.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default Inquiry;
