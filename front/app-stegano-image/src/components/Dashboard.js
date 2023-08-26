import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ImageHistory from './ImageHistory'
import Navbar from './Navbar';
import Copyright from './Copyright';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard(props) {
  const authContext = useContext(AuthContext);
  // const navigate = useNavigate()
  
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
            {/* <h2 className='dashboard-title'>Welcome {authContext.username} with email {authContext.email}</h2> */}
            <ImageHistory />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}
