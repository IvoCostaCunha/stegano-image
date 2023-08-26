import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import Navbar from './Navbar';
import Copyright from './Copyright';

import { Box, Toolbar, Container } from '@mui/material';


export default function VerifyImage(props) {
  const authContext = useContext(AuthContext)
  const dataContext = useContext(DataContext)


  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
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

          <div>
            <p> This is VerifyImage React Functional Componant</p>
          </div>
          <Copyright />

        </Container>
      </Box>
    </Box>
  );
}