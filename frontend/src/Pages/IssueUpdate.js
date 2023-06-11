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
import InfoIcon from '@mui/icons-material/Info';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';


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
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function IssueUpdate(props) {
  let location = useLocation();

  const [selectedState, setSelectedState] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let id=location.state.issue._id;
    var obj = {
        status: selectedState,
        issueId:id
    }
    let token=localStorage.getItem('token');
    axios.post('http://localhost:4000/api/v1/modifyIssue', obj,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }})
    .then(response=>{
      console.log(response)
      // alert(response.data.message)
      // //if user created
      // if(response.data.message==="User added successfully"){
      //    //navigate to login
      //   navigate('/userslist')
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
            <InfoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Issue Status
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
                name = {selectedState}
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </TextField>
            </Grid>
              
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              onClick={()=>{console.log("Signed up")}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}