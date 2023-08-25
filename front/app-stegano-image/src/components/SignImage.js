import React, { useContext, useState } from 'react';
import { Button, Container, Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

import Navbar from './Navbar';
import Copyright from './Copyright';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function InputFileUpload() {
  const dataContext = useContext(DataContext)
  const authContext = useContext(AuthContext)

  const [tempImgToUpload, setTempImpToUpload] = useState([
    
  ])

  // const a = authContext.id
  // console.log(dataContext.getPngFiles(a, a))

  const handleUploadFiles = async (event) => {
    const files = event.target.files
    for (const file of files) {

      let fileId = 0
      if(tempImgToUpload.length > 0) fileId = tempImgToUpload[tempImgToUpload.length - 1].id + 1
      console.log(fileId)
      const fileSrc = URL.createObjectURL(file);
      const fileName = file.name

      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   fileSrc = file.result;
      // };

      //console.log(fileId, fileSrc, fileName, file)

      // TODO later -> URL.revokeObjectURL(objectURL);


      setTempImpToUpload(current => [...current, {
        id: fileId,
        img: fileSrc,
        title: fileName,
        file: file
      }])
    }
  }

  const handleConfirm = async (event) => {
    const id = authContext.id
    console.log(tempImgToUpload[0].file)

    for(const file in tempImgToUpload) {
      dataContext.sendPngFile(id, file.file)
    }
  }

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
          <Grid container spacing={2}>

            <Grid item xs={8}>
              <Typography variant='h5' sx={{ textAlign: "center" }}>
                Images to be signed
              </Typography>
              <ImageList >
                {tempImgToUpload.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={item.img}
                      srcSet={item.img}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

            <Grid item xs={4}>
            <Toolbar>
              <Box>
                <Button sx={{margin: "2px"}}
                  variant="contained"
                  component="label"
                >
                  Add files to sign
                  <input
                    type="file"
                    hidden
                    accept="image/png"
                    multiple
                    onChange={(e) => { handleUploadFiles(e) }}
                  />
                </Button>
                <Button sx={{margin: "2px"}}
                  variant="contained"
                  component="label"
                  onClick={(e) => {handleConfirm()}}
                >
                  Confirm
                </Button>
              </Box>
              </Toolbar>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />

        </Container>
      </Box>
    </Box>


  )
}