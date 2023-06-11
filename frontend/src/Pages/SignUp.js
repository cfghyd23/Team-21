import * as React from 'react';
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

function LinkBehavior(props) {
  return <Link {...props} variant="body2" />;
}


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rainbow Foundation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  let navigate=useNavigate()

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEmpStatus, setSelectedEmpStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var obj = {
      email: data.get('email'),
      password: data.get('password'),
      typeOfUser: selectedUser,
      name: data.get('name'),
      age: Math.floor((new Date() - new Date(data.get('dob'))) / (365.25 * 24 * 60 * 60 * 1000)),
      employmentStatus: selectedEmpStatus,
      company: data.get('company'),
      phoneNumber: parseInt(data.get('phoneNumber')),
      location: data.get('location')
  }
    
    axios.post('http://localhost:4000/api/v1/signup', obj)
    .then(response=>{
      console.log(response)
      // alert(response.data.message)
      // //if user created
      // if(response.data.message==="User added successfully"){
      //    //navigate to login
      navigate('/login')
      // }
    })
    .catch(error=>{
      console.log(error.message)
      alert("Something went wrong!! Please try again after sometime..")
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                id="dropdown"
                label="Dropdown"
                name = {selectedUser}
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <MenuItem value="youngAdult">Young Adult</MenuItem>
                <MenuItem value="alumni">Alumni</MenuItem>
                <MenuItem value="controller">Controller</MenuItem>
                <MenuItem value="fieldWorker">Field Worker</MenuItem>
              </TextField>
            </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="age"
                  type = 'tel'
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="location"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="dob"
                  label=""
                  id="dob"
                  type='date'
                  autoComplete="dob"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="dropdown"
                label="Employment Status"
                value={selectedEmpStatus}
                onChange={(e) => setSelectedEmpStatus(e.target.value)}
              >
                <MenuItem value="employed">Employed</MenuItem>
                <MenuItem value="unemployed">Unemployed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="company"
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  autoFocus
                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              onClick={()=>{console.log("Signed up")}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}