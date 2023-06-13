import React, { useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${id}`);
      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <button onClick={fetchData}>Fetch Data</button>

      {data && (
        <div>
          {/* Display the fetched data */}
          <h2>Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MyComponent;
//

import React from 'react';
import dayjs from 'dayjs';
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Facture = () => {
  const sum="0.000DT";

  //States:
  const [value, setValue] = React.useState(dayjs());
  const [data, setData] = React.useState(null);
const[nom,setNom]=React.useState(null);
  const [field,setField]=React.useState([{
    nomenclature:'',
    qte:''}])

  
  // const [facture, setFacture]=React.useState({
  //   // order:'',
  //   // date:'',
  //   // articles:[],
  //   // région:'',
  //   // ville:''
  // })
  
      //Functions
 
  // function onChange(newValue){
  //   newValue=DatePicker.value;
  //   return newValue;
  // }
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/${data}`);
      const fetchedData = response.data;
      setData(fetchedData);
      console.log("here",fetchData.price)
      // console.log("here",data.id)

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
const  handleChange = (i, e) => {
  let newFormValues = [...field];
  newFormValues[i][e.target.name] = e.target.value;
  setField(newFormValues);
  console.log(newFormValues);
}

const handleKeyUp = (event) => {
  if (event.key === 'Enter') {
    fetchData();
  }
};
  
  function Add(){
    let newField= {nomenclature:'',qte:''};
    setField([...field,newField]);
    console.log(field);
  }
 
  const  removeFormFields = (i) => {
    let newFormValues = [...field];
    newFormValues.splice(i, 1);
    setField(newFormValues)
  }
  
  return(
  <ComponentSkeleton>
    <Typography variant="h6" gutterBottom>
         <b><h3>Rédiger une facture</h3></b>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Order"
            name="Order"
            label="Order NO."
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="lastName"
            name="lastName"
            label="Intitulé"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <DatePicker
          readOnly
          label="Date de transaction"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="ville"
            label="Ville"
            fullWidth
            autoComplete="shipping address-level2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="région"
            label="Région"
            fullWidth
            variant="outlined"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          
        </Grid> 
        <Grid item xs={12} sm={12}>
        <h3>Détailles</h3>
        </Grid> 

        {field.map((element,index)=>
        {  
          return (
            <>
            <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nom"
              name="nomenclature"
              label="Nomenclature Produit"
              fullWidth
              autoComplete="shipping country"
              variant="outlined"
              value={field.nomenclature}
              onChange={e=>handleChange(index,e)}
              onKeyUp={handleKeyUp}
              
            />
          </Grid> 
          <Grid item xs={12} sm={2}>
            <TextField
              
              id="prix"
              name="prix"
              label="prix Unitaire"
              fullWidth
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              // value={product.unitPrice}
            />
          </Grid> 
          <Grid item xs={12} sm={1}>
            <TextField
              required
              id="qte"
              name="qte"
              label="Qte"
              fullWidth
              variant="outlined"
              value={field.qte}
              onChange={e=>handleChange(index,e)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
          
            <TextField
              readOnly
              id="qte"
              name="qte"
              label="Prix total"
              fullWidth
              variant="outlined"
              // value={flow.amountConsumed}
            />
            
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton aria-label="delete"  color="error" onClick={()=>removeFormFields(index)}>
              <DeleteIcon />
            </IconButton>
            </Grid>
          </>
          );
        })}
         <Grid item xs={3} >
          <Button variant="contained" startIcon={<AddShoppingCartIcon color="white" />} onClick={Add} size="small">
            Ajouter
          </Button>
          </Grid> 

          <Grid item xs={3} >
           
          </Grid> 
          <Grid item xs={3} >
             <center>
              <b>Total</b>
          
          </center>
          </Grid> 
          <Grid item xs={3} >
          <b>{sum}</b>
          </Grid> 


          <Grid item xs={3} >
          </Grid> 
          
          <Grid item xs={3} >
            <center>
              <Button variant="outlined" color="success" size ="large" onClick={fetchData}>
                Valider
              </Button>
            </center>
          </Grid> 
          
          <Grid item xs={3} >
            
              <Button variant="outlined" color="error" size="large" >
                Annuler
              </Button>
            
          </Grid> 
          
      </Grid>
  </ComponentSkeleton>);
  
  };

