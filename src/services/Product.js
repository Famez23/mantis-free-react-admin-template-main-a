import axios from '../../node_modules/axios/index'
import { useEffect, React , useState} from 'react'

export default function Product() {

const [product, setProduct]=useState(null);

    useEffect(()=>{
        axios.get(
            'http://localhost:8080/api/product'
          ).then((response)=>{
            setProduct(response.data)
          })
    },[]
    );
    if(!product) return null;
    console.log(product.id);


    return (
    <>
    <h1>{product.id}</h1>
    </>
  )
}
