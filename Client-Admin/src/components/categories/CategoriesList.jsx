import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
const CategoriesList = ({categories,handleDelete,handleEdit}) => {
  return (
    
       <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name categories</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((categorie) => (
            <TableRow key={categorie.id}>
              <TableCell>{categorie.name}</TableCell>
             
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(categorie)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(categorie.id)}
                >
                  Delete
                </Button>
          
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
    
}

export default CategoriesList
