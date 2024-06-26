import * as React from 'react';
import { Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl, FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Grid, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
            .post("https://carhub-car-selling-website-backend-1.onrender.com/Admin/Login", values)
            .then((response) => {
                console.log(response);
                console.log(response.data.token);
                localStorage.setItem('Token', response.data.token);
                navigate("/admin");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Grid container justifyContent="center" padding="50px 0px">
                    <Grid item sm={8} xs={12}>
                        <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                            <CardContent sx={{ padding: "30px 20px" }}>
                                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" className='nunito-sans' color="#012970">
                                    Login to Your Account
                                </Typography>
                                <Typography variant="body2" textAlign="center" marginBottom="22px">
                                    Enter your username & password to login
                                </Typography>
                                <form onSubmit={handleLogin}>
                                    <Stack spacing={2}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Username</FormLabel>
                                            <TextField
                                                type='text'
                                                size='small'
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Password</FormLabel>
                                            <OutlinedInput
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                size='small'
                                            />
                                        </FormControl>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox disableRipple />
                                            <Typography>
                                                Remember me
                                            </Typography>
                                        </Stack>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#0d6efd" }}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Login;
