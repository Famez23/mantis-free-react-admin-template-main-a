import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//  import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function AddUser() {
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
        <DialogTitle>Gérer les utilisateurs</DialogTitle>
          <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField id="Nomenclature" label="Email" variant="outlined"  placeholder="démo@tunisietelecom.tn"  />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <TextField id="label" label="Nom et prénom" variant="outlined"  placeholder="Nom prénom" />
            </FormControl>
            
          </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
    </Dialog>
  </div>
);
}