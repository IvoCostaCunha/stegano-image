import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ImageHistory from '../ImageHistory/ImageHistory'
import DashboardUtils from '../DashboardUtils/DashboardUtils';
import Navbar from '../Navbar/Navbar';
import Copyright from '../Copyright';
import './Dashboard.css'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { AuthContext } from '../../contexts/AuthContext';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const context = useContext(AuthContext);
  const navigate = useNavigate()

  // if(!context.token) {
  //   return(<Login />)
  // }

  console.log(context.token)

  useEffect(() => {
    if (!context.token || context.token == null) {
      navigate("/signin", { replace: true })
    }
  })

  const handleDisconnect = () => {
    context.token = false

    // Delete cookies associated with user
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    localStorage.removeItem('mail')
    localStorage.removeItem('token')

    console.log("disconnected")

    navigate("/signin", { replace: true });
  }

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
            <h2 className='dashboard-title'>Welcome {context.username} with mail {context.mail}</h2>
            <ImageHistory />
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
