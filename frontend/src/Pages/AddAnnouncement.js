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

export default function Announcement() {

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedEmpStatus, setSelectedEmpStatus] = useState('');

  let navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var obj = {
      announcementTitle: data.get('name'),
      announcementDescription: data.get('description'),
    }
    let token=localStorage.getItem('token');
    axios.post('http://localhost:4000/api/v1/addNewAnnouncement', obj,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }})
    .then(response=>{
      console.log(response.data)
      //alert(response.data.message)
      // //if user created
      // if(response.data.message==="User added successfully"){
      //    //navigate to login
        navigate('/announcements')
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
          <Typography component="h1" variant="h5">
            Add Announcement
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              onClick={()=>{console.log("Submit Issue")}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}