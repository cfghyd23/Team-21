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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var obj = {
      issueTitle: data.get('title'),
      issueDescription: data.get('description'),
      category: selectedUser
    }
    //console.log(obj)
    let token=localStorage.getItem('token');
    axios.post('http://localhost:4000/api/v1/addNewIssue', obj,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }})
    .then(response=>{
      console.log(response.data)
      // alert(response.data.message)
      // //if user created
      // if(response.data.message==="User added successfully"){
      //    //navigate to login
         navigate('/issuesOfYA')
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
            Submit Issue
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField type='number'
                  required
                  fullWidth
                  id="id"
                  label="Issue_id"
                  name="id"
                />
              </Grid> */}
              <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                id="dropdown"
                label="Type of issue"
                name = {selectedUser}
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <MenuItem value="medicalIssue">Medical Issue</MenuItem>
                <MenuItem value="financialIssue">Financial Issue</MenuItem>
                <MenuItem value="mentalImbalance">Mental Imbalance</MenuItem>
              </TextField>
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
              Submit Issue
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}