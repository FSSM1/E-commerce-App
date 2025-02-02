import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const ProductList = ({ data, handleDelete ,handleEdit}) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {data.map((el) => (
          <Grid item key={el.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
              {/* CardMedia with fixed height and object-fit */}
              <CardMedia
                component="img"
                alt={el.name}
                height="200" // Fixed height for all images
                image={el.image}
                sx={{
                  width: '100%', // Ensure the image takes full width of the card
                  objectFit: 'cover', // Ensures the image covers the area without distortion
                  aspectRatio: '1/1', // Enforce a consistent aspect ratio (e.g., 16:9)
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {el.name}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${el.price}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {el.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {handleDelete(el.id)}}
                >
                  Delete
                </Button>
                <Button variant="contained" color="primary" size="small" onClick={()=>{handleEdit(el)}}>
                  Update
                </Button>
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
