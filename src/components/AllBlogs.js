import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, IconButton, Modal, Backdrop, Fade, Button, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://blog-backend-pgsc.onrender.com/blog/AllBlog');
      setBlogs(response.data); // Assuming response.data is an array of blog objects
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [deleteId, updateId]); // Update useEffect dependencies to refresh on delete or update

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blog-backend-pgsc.onrender.com/blog/deleteblog/${id}`);
      setDeleteId(id); // Trigger useEffect to refresh data
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setOpenDeleteModal(false); // Close the delete modal
    }
  };

  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenUpdateModal = (id, title, content) => {
    setOpenUpdateModal(true);
    setUpdateId(id);
    setUpdateTitle(title);
    setUpdateContent(content);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setUpdateId(null);
    setUpdateTitle('');
    setUpdateContent('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://blog-backend-pgsc.onrender.com/blog/updateblog/${updateId}`, {
        title: updateTitle,
        content: updateContent,
      });
      setUpdateId(null); // Trigger useEffect to refresh data
    } catch (error) {
      console.error('Error updating blog:', error);
    } finally {
      setOpenUpdateModal(false); // Close the update modal
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        All Blogs Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Title</strong></TableCell>
            <TableCell align="center"><strong>Content</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog, index) => (
            <TableRow key={index}>
              <TableCell align="center">{blog.title}</TableCell>
              <TableCell align="center">{blog.content}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleOpenUpdateModal(blog._id, blog.title, blog.content)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteModal(blog._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeleteModal}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
            <Typography variant="h6" id="delete-modal-title" gutterBottom>
              Confirm Delete
            </Typography>
            <Typography variant="body1" id="delete-modal-description">
              Are you sure you want to delete this blog?
            </Typography>
            <Button onClick={() => handleDelete(deleteId)} variant="contained" color="secondary" style={{ marginTop: '10px' }}>
              Delete
            </Button>
          </div>
        </Fade>
      </Modal>

      {/* Update Modal */}
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUpdateModal}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
            <Typography variant="h6" id="update-modal-title" gutterBottom>
              Update Blog
            </Typography>
            <form onSubmit={handleUpdate}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </TableContainer>
  );
}

export default AllBlogs;
