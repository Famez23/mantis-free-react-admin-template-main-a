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
import EditIcon from '@mui/icons-material/Edit';

export default function Edit(product) {
  const [open, setOpen] = React.useState(false);
  const [family, setFamily] =React.useState([]);
  const [stock, setStock] =React.useState([]);
  const [productData, setProductData] =React.useState({ 
    nomenclature:product.nomenclature,
    label: '',
    family: null,
    stock:null,
    price:0,
    seuilMx:null,
    seuilMn:null});
    
  React.useEffect(()=>{
  if(product){
    setProductData({
    nomenclature: product.nomenclature,
    label: product.label,
    family: product.family,
    stock:product.stock,
    price:0,
    seuilMx:product.seuilMx,
    seuilMn:product.seuilMn
    })
  }
  else console.log("no transfert")
  console.log("update",productData);
    },[product]);  
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
  
  

  function handleChangee(event) {
    setProductData(prevPostProd => {
        return {
            ...prevPostProd,
            [event.target.name]: event.target.value
        }
    })
      };
    console.log(productData);

    const handleSubmit = async (id) => {

      try {
        const response = await axios.put(`http://localhost:8080/api/product/${id}`, 
          {nomenclature:productData.nomenclature,
          label:productData.label,
          quantityStocked:0,
          stock:{id:productData.stock},
          productType:{id:productData.family},
          price:productData.price,
          thresholdMax:productData.seuilMx,
          thresholdMin:productData.seuilMn
        });
        console.log('Data modified successfully:', response.data);
        setOpen(false);
        window.location.reload();
      } catch (error) {
          console.error('Failed modify data:', error);
          console.log(error.response);
      }
  };
  





  return (
    <div>
      <IconButton variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      {open && (<Dialog open={open} onClose={handleClose}>
       
          <DialogTitle>Nouvelle article</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField name="nomenclature" label="nomenclature" variant="outlined" value={productData.nomenclature}  onChange={handleChangee} />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField name="label" label="Libellé" variant="outlined"  value={productData.label} onChange={handleChangee} />
              </FormControl>
              <br/>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Famille</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                name="family"
                value={productData.family}
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
                value={productData.stock}
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
              <TextField name="seuilMx" label="seuilMx" variant="outlined"  value={productData.seuilMx} onChange={handleChangee}/>
            </FormControl>
            <FormControl sx={{m:1, minWidth:120}}>
              <TextField name="seuilMn" label="seuilMn" variant="outlined"  value={productData.seuilMn} onChange={handleChangee}/>
            </FormControl>
            <br/>
            <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Prix unitaire</InputLabel>
          <OutlinedInput
            name="price"
            startAdornment={<InputAdornment position="start">DT</InputAdornment>}
            label="Amount"
            value={productData.price}
            onChange={handleChangee}
          />
        </FormControl>
        <br/>
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