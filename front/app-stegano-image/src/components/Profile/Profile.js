import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Copyright from '../Copyright';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Container, Button } from '@mui/material';
import { Input } from '@mui/base/Input';


const defaultTheme = createTheme();

export default function SignImage(props) {
  const context = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <div className='sign-image-wrapper'>
              <h1>Profile</h1>
              <p>Username: <input type='text' value={context.username}></input></p>
              <p>Mail: <input type='text' value={context.mail}></input></p>
              <p>ID: {context.id}</p>
              <Button variant="contained" onClick={() => { alert('update user info todo') }}>Update</Button>
            </div>
            <Copyright sx={{ pt: 4 }} />

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}