import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Button } from "@mui/material";
import Allproduct from "../../components/productsClient/Allproduct";
import { fetchAllProducts } from "../../features/productSlice";
const Products = () => {
  const data = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  console.log("data from redux", data);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={2}
          sx={{
            bgcolor: "#f5f5f5",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "left",
          }}
        ></Grid>
        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Allproduct data={data} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
