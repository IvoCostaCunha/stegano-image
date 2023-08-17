// import React, { useState, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
// import { AppContext } from '../../contexts/AppContext';
// import './Login.css';
// import Button from '@mui/material/Button';


// export default function Login(props) {
//   const [mail, setMail] = useState()
//   const [password, setPassword] = useState()
//   const context = useContext(AppContext)

//   const navigate = useNavigate()

//   context.token = false
//   localStorage.setItem('token', false)

//   // Recuperate user information and setting it up in context & cookies
//   const onUserConnected = async (e) => {
//     try {
//       let res = await fetch(`http://localhost:5000/api/0.1/user/${context.mail}`);

//       let resJSON = await res.json();



//       if (res.status === 200) {
//         console.log('User data retrieved')
//         context.id = resJSON.id
//         context.username = resJSON.username

//         localStorage.setItem('id', context.id)
//         localStorage.setItem('username', context.username)

//       } else {
//         console.log("Error on API side")
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   const handleSubmit = async (e) => {
//     console.log(context)
//     e.preventDefault()
//     console.log(context)

//     try {
//       let res = await fetch("http://localhost:5000/api/0.1/login", {
//         method: "POST",
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           mail: mail,
//           password: password,
//         }),
//       });

//       let resJSON = await res.json();

//       if (res.status === 200) {
//         if (resJSON['response'] === 'OK') {
//           console.log('User authentified')
//           context.mail = mail
//           context.token = true

//           localStorage.setItem('mail', context.mail)
//           localStorage.setItem('token', context.token)

//           await onUserConnected().then(() => {
//             console.log(context.token)
//             navigate("/dashboard", { replace: true });
//           })


//         } else {
//           console.log('User non authentified')
//           context.token = false
//         }

//       }
//       else {
//         console.log("Error on API side")
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   return (
//     <div className="login-wrapper">
//       <h1> Welcome </h1>
//       <form onSubmit={handleSubmit.bind(this)} method="POST">
//         <label>
//           <p>Email</p>
//           <input
//             type="text" value={mail}
//             placeholder="Mail"
//             name="mail"
//             onChange={(e) => setMail(e.target.value)}
//           />
//         </label>
//         <label>
//           <p>Password</p>
//           <input
//             type="password" value={password}
//             placeholder="Password"
//             name="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <div>
//           <Button type="submit">Login</Button>
//         </div>
//       </form>
//     </div>
//   );


// }




import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import Copyright from '../Copyright';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const context = useContext(AuthContext)

  const navigate = useNavigate()

  context.token = false
  localStorage.setItem('token', false)

  // Recuperate user information and setting it up in context & cookies
  const onUserConnected = async (e) => {
    try {
      let res = await fetch(`http://localhost:5000/api/0.1/user/${context.mail}`);

      let resJSON = await res.json();



      if (res.status === 200) {
        console.log('User data retrieved')
        context.id = resJSON.id
        context.username = resJSON.username

        localStorage.setItem('id', context.id)
        localStorage.setItem('username', context.username)

      } else {
        console.log("Error on API side")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = async (e) => {
    console.log(context)
    e.preventDefault()
    console.log(context)

    const data = new FormData(e.currentTarget);

    console.log({
      mail: data.get('mail'),
      password: data.get('password'),
    });

    try {
      let res = await fetch("http://localhost:5000/api/0.1/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: data.get('mail'),
          password: data.get('password'),
        }),
      });

      let resJSON = await res.json();

      if (res.status === 200) {
        if (resJSON['response'] === 'OK') {
          console.log('User authentified')
          context.mail = data.get('mail')
          context.token = true

          localStorage.setItem('mail', context.mail)
          localStorage.setItem('token', context.token)

          await onUserConnected().then(() => {
            console.log(context.token)
            navigate("/dashboard", { replace: true });
          })


        } else {
          console.log('User non authentified')
          context.token = false
        }

      }
      else {
        console.log("Error on API side")
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="mail"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password? TODO
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/app/signup' variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}