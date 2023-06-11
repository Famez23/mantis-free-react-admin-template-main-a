import axios from '../../node_modules/axios/index'
import { useEffect, React , useState} from 'react'

const GetProduct = async () => {
  try {
    const response = await axios.get('localhost:8080/api/product');
    const data = response.data;
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default GetProduct;