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
export default function Add() {
  const [open, setOpen] = React.useState(false);
  const [family, setFamily] =React.useState([]);
  const [stock, setStock] =React.useState([]);

React.useEffect(() => {

  async function getFamily() {
      try {
          const response = await axios.get('http://localhost:8080/api/type');
          console.log(response.data);
          setFamily(response.data);

      } catch (error) {
          console.error(error);
      }
  }

  
  getFamily();
  console.log("Family:", family)
}, []);
React.useEffect(() => {

  async function getStock() {
      try {
          const response = await axios.get('http://localhost:8080/api/stock');
          console.log(response.data);
          setStock(response.data);

      } catch (error) {
          console.error(error);
      }
  }

  
  getStock();
  console.log("stock:", stock)
}, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [type, setType] = React.useState('');
  const [unit, setUnit] = React.useState('');
  const [postprod, setPostprod] =React.useState({
    nomenclature: '',
    label: '',
    family: null,
    stock:null,
    price:0,
    seuilMx:null,
    seuilMn:null
  });
  function handleChangee(event) {
    setPostprod(prevPostProd => {
        return {
            ...prevPostProd,
            [event.target.name]: event.target.value
        }
    })
      }
        console.log(postprod);
    

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:8080/api/product', 
          {nomenclature:postprod.nomenclature,
          label:postprod.label,
          quantityStocked:0,
          stock:{id:postprod.stock},
          productType:{id:postprod.family},
          price:postprod.price,
          thresholdMax:postprod.seuilMx,
          thresholdMin:postprod.seuilMn
        });
        console.log('Data posted successfully:', response.data);
        setOpen(false);
        window.location.reload();
      } catch (error) {
          console.error('Failed post data:', error);
          console.log(error.response);
      }
  };
  





  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      {open && (<Dialog open={open} onClose={handleClose}>
       
          <DialogTitle>Nouvelle article</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField name="nomenclature" label="nomenclature" variant="outlined" value={postprod.nomenclature}  onChange={handleChangee} />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField name="label" label="Libellé" variant="outlined"  value={postprod.label} onChange={handleChangee} />
              </FormControl>
              <br/>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Famille</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                name="family"
                value={postprod.family}
                label="family"
                onChange={handleChangee}
                
                 >
                  {family.map((obj)=>{
                    return(
                      <MenuItem value={obj.id}>{obj.familyLabel}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">stock</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                name="stock"
                value={postprod.stock}
                label="stock"
                onChange={handleChangee}
                 >
                {stock.map((object1)=>{
                    return(
                      <MenuItem value={object1.id}>{object1.stockLabel}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl sx={{m:1, minWidth:120}}>
              <TextField name="seuilMx" label="seuilMx" variant="outlined"  value={postprod.seuilMx} onChange={handleChangee}/>
            </FormControl>
            <FormControl sx={{m:1, minWidth:120}}>
              <TextField name="seuilMn" label="seuilMn" variant="outlined"  value={postprod.seuilMn} onChange={handleChangee}/>
            </FormControl>
            <br/>
            <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Prix unitaire</InputLabel>
          <OutlinedInput
            name="price"
            startAdornment={<InputAdornment position="start">DT</InputAdornment>}
            label="Amount"
            value={postprod.price}
            onChange={handleChangee}
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
            </FormControl> */}<DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogActions>
            </form >
            </DialogContent>

          
      </Dialog>)}
      
    </div>
  );
}