import React, { useContext, useState } from 'react';
import { Button, Container, Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';

import Navbar from './Navbar';
import Copyright from './Copyright';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { red, green } from '@mui/material/colors';

export default function InputFileUpload() {
  const dataContext = useContext(DataContext)
  const authContext = useContext(AuthContext)

  const [uploadStatusColor, setUploadStatusColor] = useState(green[500])
  const [showUploadStatus, setShowUploadStatus] = useState('')
  const [uploadStatus, setUploadStatus] = useState('')

  const [tempImgToUpload, setTempImpToUpload] = useState([

  ])

  const handleUploadFiles = async (e) => {
    e.preventDefault()
    const files = e.target.files
    let id = 0
    for (let file of files) {
      const fileSrc = URL.createObjectURL(file);
      const fileName = file.name
      const fileId = id

      setTempImpToUpload(current => [...current, {
        id: fileId,
        img: fileSrc,
        title: fileName,
        file: file
      }])
      id++
    }
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    setShowUploadStatus('inline')

    const formData = new FormData();

    for (const x in tempImgToUpload) {
      // console.log(tempImgToUpload)
      formData.append(tempImgToUpload[x].file.name, tempImgToUpload[x].file);
    }

    const response = await dataContext.sendPngFiles(authContext.id, formData)

    if (response.confirmation) {
      setUploadStatusColor(green[500])
      setUploadStatus(response.message + ` (error: ${response.code})`)
      // retrieve images then
    }
    else {
      setUploadStatusColor(red[500])
      setUploadStatus(response.error + ` (error: ${response.code})`)
    }

  }

  const handleImageClick = async (e) => {
    setTempImpToUpload(tempImgToUpload.filter(item => item.id.toString() !== e.target.id))
    URL.revokeObjectURL(e.target.src)
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
                  <ImageListItem key={item.id}>
                    <img
                      src={item.img}
                      srcSet={item.img}
                      id={item.id}
                      alt={item.title}
                      loading="lazy"
                      onClick={(e) => { handleImageClick(e) }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

            <Grid item xs={4}>
              <Toolbar>
                <Box>
                  <Button sx={{ margin: "2px" }}
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
                  <Button sx={{ margin: "2px" }}
                    variant="contained"
                    component="label"
                    onClick={(e) => { handleConfirm(e) }}
                  >
                    Confirm
                  </Button><br />
                  <Typography component="h5" sx={{ display: showUploadStatus, color: uploadStatusColor }}>
                    {uploadStatus}
                  </Typography>
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