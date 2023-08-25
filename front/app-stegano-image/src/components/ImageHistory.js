import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function ImageHistory(props) {
  const context = useContext(AuthContext);

  const downloadImageHandler = async (e) => {
    console.log(cardsInfos[e.target.name].url)
  }



  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cardsInfos = { 1: { url: "https://source.unsplash.com/random?wallpapers" }, 2: { url: "https://source.unsplash.com/random?wallpapers" } };


  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h3"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Last signed images
      </Typography>

      <Container sx={{ py: 2 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  onClick={(e) => downloadImageHandler(e)}
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={cardsInfos[1].url}
                />
                <CardActions>
                  <a href={cardsInfos[1].url} download="acv.png">
                    <Button size="small" name={card} onClick={(e) => downloadImageHandler(e)}>
                      <SaveIcon sx={{ marginRight: 1 }} />

                      Download
                    </Button>
                  </a>
                  {/* <Button size="small">Edit</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>



  );
}

// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

// export default function StandardImageList() {
//   return (
//     <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
//       {itemData.map((item) => (
//         <ImageListItem key={item.img}>
//           <img
//             src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
//             srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//             alt={item.title}
//             loading="lazy"
//             onClick={() => {console.log(item.img)}}
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   );
// }

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//   },
// ];