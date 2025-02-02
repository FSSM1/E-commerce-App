import React, { useState } from "react";
import { TextField, Button} from "@mui/material";

const EditCategories = ({categorie,handleSave,setSelectedcategorie}) => {
const [formData, setFormData] = useState(categorie);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData); // Call onSave with the updated user data
  };
  return (
   <form onSubmit={handleSubmit} style={{ width: "400px" }}>
         <TextField
           label="name"
           name="name"
           value={formData.name}
           onChange={handleChange}
           fullWidth
           margin="normal"
         />
          <Button type="submit" variant="contained" color="primary" fullWidth>
        Save Changes
      </Button>
      <Button
        variant="outlined"
        sx={{ borderColor: "gray", color: "gray", marginTop: "10px" }}
        fullWidth
        onClick={() => setSelectedcategorie(null)}
      >
        Cancel
      </Button>
    </form>
  )
}

export default EditCategories
