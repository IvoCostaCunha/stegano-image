import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './ImageHistory.css'


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
    <div>
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
      </Container>

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
      </Container></div>

  );
}