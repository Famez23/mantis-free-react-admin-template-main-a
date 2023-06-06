import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//  import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function Add() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [type, setType] = React.useState('');
  const [unit, setUnit] = React.useState('');

  const handleChange1=(event) =>{
    setUnit(event.target.value)
  }
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Nouvelle article</DialogTitle>
            <DialogContent>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField id="Nomenclature" label="Nomenclature" variant="outlined"   />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField id="label" label="Libellé" variant="outlined"   />
              </FormControl>
              <br/>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Famille</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={unit}
                label="unit"
                onChange={handleChange1}
                 >
          
                <MenuItem value={10}>câble</MenuItem>
                <MenuItem value={20}>Accessoires</MenuItem>
                <MenuItem value={20}>Autre</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">stock</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={type}
                label="stock"
                onChange={handleChange}
                 >
          
                <MenuItem value={10}>CAPEX</MenuItem>
                <MenuItem value={20}>OPEX</MenuItem>
              </Select>
            </FormControl>
            <br/>
            <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Prix unitaire</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">DT</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <br/>
        {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Autocomplete
                fullWidth
                id="combo-box-demo"
                // options={top100Films}
                sx={{ width: 200 }}
                ListboxProps={{ style: { maxHeight: 150 } }}
                renderInput={() => <TextField  label="Fournisseurs" />}
              />
            </FormControl> */}
            </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}