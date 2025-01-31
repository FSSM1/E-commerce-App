import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Oneproduct({ product }) {
  return (
    <Card sx={{ minWidth: 300, borderRadius: 2, boxShadow: 3, mr: 2 }}>
      {/* CardMedia with fixed height and object-fit */}
      <CardMedia
        component="img"
        alt={product.name}
        height="200" // Fixed height for all images
        image={product.image}
        sx={{
          width: '100%', // Ensure the image takes full width of the card
          objectFit: 'cover', // Ensures the image covers the area without distortion
          aspectRatio: '1/1', // Enforce a consistent aspect ratio (e.g., 16:9)
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="error"
          size="small"
          // onClick={() => onDelete(product.id)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          // onClick={() => onUpdate(product)}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
  
export default Oneproduct;