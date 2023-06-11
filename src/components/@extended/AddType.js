import React from 'react';
import axios from '../../../node_modules/axios/index';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//  import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { get } from 'lodash';
// import getProduct from '../../pages/dashboard/ProductTable'
export default function AddType() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [type, setType] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [postType, setPostType] =React.useState({
    label: ''
  });
  function handleChangee(event) {
    setPostType(prevpostType => {
        return {
            ...prevpostType,
            [event.target.name]: event.target.value
        }
    })
        }
        console.log(postType);
    
        const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/type', 
      {familyLabel:postType.label,
      });
      console.log('Data posted successfully:', response.data);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed post data:', error);
      console.log(error.response);
    }
  };




  const handleClick=(event) =>{
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
      {open && (<Dialog open={open} onClose={handleClose}>
       
          <DialogTitle>Nouvelle Famille d'article</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField name="label" label="libellé de famille" variant="outlined" value={postType.label}  onChange={handleChangee} />
              </FormControl>
            <DialogActions> 
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
            </form >
            </DialogContent>

          
      </Dialog>)}
      
    </div>
  );
}