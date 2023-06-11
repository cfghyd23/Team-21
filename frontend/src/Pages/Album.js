import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rainbow Foundation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  let x=localStorage.getItem('token')
  let y=localStorage.getItem('user')

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Rainbow
          </Typography>
          {
              y=="youngAdult"
              &&
              <>
              <Link style={{color:"white", padding: "20px"}} href='/announcements'>Announcements</Link>
              <Link style={{color:"white",  padding: "20px"}} href='/addAnnouncement'>Add Announcements</Link>
              <Link style={{color:"white",  padding: "20px"}} href='/issuesOfYA'>Previous Issues</Link>
              <Link style={{color:"white",  padding: "20px"}} href='/addIssue'>Add Issue</Link>
              </>
              
            }

{
              y=="homeController"
              &&
              <>
              <Link style={{color:"white", padding: "20px"}} href='/announcements'>Announcements</Link>
              <Link style={{color:"white",  padding: "20px"}} href='/addAnnouncement'>Add Announcements</Link>
              <Link style={{color:"white",  padding: "20px"}} href='/issues'>Issues</Link>
              </>
              
            }
    
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Rainbow Foundation
            </Typography>
            
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Our Mission
to support people to regain their sense of worth and discover their full potential, by supporting them in making changes to bring this potential into the world and ensuring their voice is heard.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {!x && (
  <>
    <Link href='/signup'><Button variant="contained">Sign Up</Button></Link>
    <Link href='/login'><Button variant="outlined">Sign In</Button></Link>
    <Button variant="outlined">Donate</Button>
  </>
)}

              
            </Stack>
          </Container>
        </Box>
        
      </main>
      
    </ThemeProvider>
  );
}