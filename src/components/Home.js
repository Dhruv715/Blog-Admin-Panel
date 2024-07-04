import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, Stack, IconButton, Paper } from '@mui/material';
import { BsThreeDots, BsPeople } from 'react-icons/bs';
import { IoCarSport } from "react-icons/io5";
import { RiSteering2Line } from "react-icons/ri"; // Steering wheel icon for test drive inquiries

const Home = () => {
    const [carCount, setCarCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);
    const [testDriveCount, setTestDriveCount] = useState(0); // New state for test drive inquiries
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const carResponse = await axios.get('https://carhub-car-selling-website-backend-1.onrender.com/Admin/countCars');
                const userResponse = await axios.get('https://carhub-car-selling-website-backend-1.onrender.com/Admin/countUsers');
                const inquiryResponse = await axios.get('https://carhub-car-selling-website-backend-1.onrender.com/Admin/countInquiry');
                const testDriveResponse = await axios.get('https://carhub-car-selling-website-backend-1.onrender.com/Admin/count'); // Fetch test drive count

                setCarCount(carResponse.data.count);
                setUserCount(userResponse.data.count);
                setInquiryCount(inquiryResponse.data.count);
                setTestDriveCount(testDriveResponse.data.count); // Set test drive count
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Container>
            <Grid container spacing={3}>
                {/* First Row */}
                <Grid container item spacing={3}>
                    <Grid item sm={6} xs={12}>
                        <Paper sx={{ padding: '20px' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" gutterBottom color="#000">Number of Cars</Typography>
                                </Box>
                                <IconButton size='small'><BsThreeDots /></IconButton>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                                <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                                    <IoCarSport color='#4154f1' size={35} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                                        {carCount}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Paper sx={{ padding: '20px' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" gutterBottom color="#000">Number of Users</Typography>
                                </Box>
                                <IconButton size='small'><BsThreeDots /></IconButton>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                                <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                                    <BsPeople color='#4154f1' size={35} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                                        {userCount}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Second Row */}
                <Grid container item spacing={3}>
                    <Grid item sm={6} xs={12}>
                        <Paper sx={{ padding: '20px' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" gutterBottom color="#000">Total Inquiries</Typography>
                                </Box>
                                <IconButton size='small'><BsThreeDots /></IconButton>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                                <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                                    <BsThreeDots color='#4154f1' size={35} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                                        {inquiryCount}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Paper sx={{ padding: '20px' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" gutterBottom color="#000">Total Test Drive Inquiries</Typography>
                                </Box>
                                <IconButton size='small'><BsThreeDots /></IconButton>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                                <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                                    <RiSteering2Line color='#4154f1' size={35} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                                        {testDriveCount}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
