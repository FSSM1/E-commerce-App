import {React,useState,useEffect} from 'react'
import axios from 'axios';
import { Grid, Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
function Allproduct() {
  const navigate = useNavigate();

const [data, setData] = useState([]);

  const fetchproduct = async () => {
    try {
      const products = await axios.get("http://127.0.0.1:3000/api/products/getAll");
      console.log("Fetched products:", products.data.data);
      setData(products.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  


  return (
    
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={2} sx={{ bgcolor: "#f5f5f5", display: "flex", alignItems: "flex-start", justifyContent: "left" }}>
         
        </Grid>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }} >
      <Grid container spacing={3}>
      {data.map((el) => (
        <Grid item key={el.id} xs={12} sm={6} md={4} lg={3} onClick={()=>{navigate(`/client/products/${el.id}`)}}>
          <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
            {/* CardMedia with fixed height and object-fit */}
            <CardMedia
              component="img"
              alt={el.name}
              height="200" 
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
            </CardActions>
          </Card>
        </Grid>
        
              ))}
              
         
        </Grid>
        </Grid>
        </Grid>

    
  );
};

export default Allproduct;
