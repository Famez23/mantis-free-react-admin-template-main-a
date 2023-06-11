
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
  const [value, setValue] = React.useState(dayjs());
  function onChange(newValue){
    newValue=DatePicker.value;
    return newValue;
  }

  const [field,setField]=React.useState([{nomenclature:'',qte:''}])
  function submit(){
    let newField= {nomenclature:'',qte:''};
    setField([...field,newField]);
    console.log(field);
  }
  function remove(index){
    const list=[...field];
    list.splice(index,1);
    setField(list);
  }
  const [facture, setFacture]=React.useState({
    order:'',
    date:'',
    articles:[],
    région:'',
    ville:''
  })
  
    const sum="0.000DT"
    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:8080/api/product', 
          {ordre:facture.nomenclature,
          date:facture.label,
          articles:facture.articles,
          amountDelivered: 4300,
          amountConsumed: 4300,
          quantityConsumed: 122,
          quantityDelivered: 0
        });
        console.log('Data posted successfully:', response.data);
        setOpen(false);
        window.location.reload();
      } catch (error) {
          console.error('Failed post data:', error);
          console.log(error.response);
      }
  };

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
        {field.map(()=>
        {  
          return (
            <>
            <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nom"
              name="nom"
              label="Nomenclature Produit"
              fullWidth
              autoComplete="shipping country"
              variant="outlined"
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
            />
            
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton aria-label="delete"  color="error" onClick={()=>remove(index)}>
              <DeleteIcon />
            </IconButton>
            </Grid>
          

          {/* <Grid item xs={12} sm={3}>
  
          </Grid> */}
          
          </>
            
          );
        })}
         <Grid item xs={3} >
          <Button variant="contained" startIcon={<AddShoppingCartIcon color="white" />} onClick={submit} size="small">
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
              <Button variant="outlined" color="success" size ="large">
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

export default Facture;