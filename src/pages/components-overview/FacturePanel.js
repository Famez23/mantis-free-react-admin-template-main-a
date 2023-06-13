
import {React,useState,useEffect} from 'react';
import axios from '../../../node_modules/axios/index';
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
  //State
const[fields,setFields]=useState(
  [{
    nomenclature:null,
    qte:null
  }]
);
const[id,setId]=useState('')
const [data, setData] = useState([{id:""}]);

// Function:
const  handleChange = (i, event) => {
  let newFormValues = [...fields];
  newFormValues[i][event.target.name] = event.target.value;
  setId( event.target.value);
  setFields(newFormValues);
  console.log(newFormValues);
}
const  removeFormFields = (i) => {
  let newFormValues = [...fields];
  newFormValues.splice(i, 1);
  setFields(newFormValues)
}
function Add(){
  let newField= {nomenclature:'',qte:''};
  setFields([...fields,newField]);
  console.log(fields);
}
// try {
  //   const response = await axios.get(
  //     `http://localhost:3001/api/product/${fields.nomenclature}`
  //   );
  //   const fetchedData = response.data;
  //   setData(fetchedData);
  // } catch (error) {
  //   console.error("Failed to fetch data:", error);
  // }
const fetchData = async () => {
  try {
    const responseArray = await Promise.all(fields.map(async (field) => {
      const url = `http://localhost:3001/api/product/${field.nomenclature}`;
      const response = await axios.get(url);
      const responseData= response.data;
      setData((prev)=>[...prev,responseData]);
      console.log("this is the data" ,data);
      console.log(response.data);
      return response.data;
    }));

    
  } catch (error) {
    console.error("Failed to fetch data:", error);
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
          // value={date}
          onChange={(newDate) => setValue(newDate)}
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

        {fields.map((element,index)=>
        {  
          return (
            <>
            {data.map((item,i)=> {
              return(
                <>
                 {/* <Grid item xs={12} key={i}> */}
                  <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nom"
              name="nomenclature"
              label="Nomenclature Produit"
              fullWidth
              autoComplete="shipping country"
              variant="outlined"
              value={fields.nomenclature}
              onChange={e=>handleChange(index,e)}
              // onKeyUp={handleKeyUp}
              
            />
          </Grid> 
          
          <Grid item xs={12} sm={2}>
            <TextField
              
              id="prix"
              name="prix"
              fullWidth
              variant="outlined"
              placeholder="prix "
              InputProps={{
                readOnly: true,
              }}
              value={item.price}
            />
          </Grid>
           {/* </Grid> */}

                
         
          <Grid item xs={12} sm={1}>
            <TextField
              required
              id="qte"
              name="qte"
              label="Qte"
              fullWidth
              variant="outlined"
              value={fields.qte}
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
            <IconButton aria-label="delete"  color="error" 
            onClick={()=>removeFormFields(index)}
            >
              <DeleteIcon />
            </IconButton>
            </Grid>
            </>
              )
            })}
            
          </>
          );
        })}
         <Grid item xs={3} >
          <Button variant="contained" startIcon={<AddShoppingCartIcon color="white" />} 
          onClick={Add} 
          size="small">
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
          {/* <b>{sum}</b> */}
          </Grid> 


          <Grid item xs={3} >
          </Grid> 
          
          <Grid item xs={3} >
            <center>
              <Button variant="outlined" color="success" size ="large" 
              onClick={fetchData}
              >
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