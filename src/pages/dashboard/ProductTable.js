import PropTypes from 'prop-types';
import { useState,React,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from '../../../node_modules/axios/index';
// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(trackingNo, name, fat, carbs, protein) {
  return { trackingNo, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Cable R2V CU 3G10 Rigide', 100, 0, 40570),
  createData(98764564, 'Câble 3 paires, 30 AWG,Non blindé', 600, 1, 180139),
  createData(98756325, 'Câble réseau catégorie 6 longueur 20m ', 855, 1, 90989),
  createData(98652366, 'Câble Réseau RJ45 - 15m Cat. 6 Droit', 0, 2, 10239),
  createData(13286564, 'Dispositif de terminaison intérieure (DTI) Rj45', 0, 2, 83348),
  createData(86739658, 'Câble série 89/88', 990, 1, 410780),
  createData(13256498, 'Câble série 74', 125, 0, 70999),
  createData(98753263, 'Câble série 98/99', 89, 0, 10570),
  createData(98753275, 'Câble IEC 708-4', 2885, 1, 98063),
  createData(98753291, 'Câble SERIES 5 - 10', 1000, 1, 14001)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'ID No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Libellé'
  },
  {
    id: 'fat',
    align: 'left',
    disablePadding: false,
    label: 'Quantité en stock'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Statut'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Montant stockée'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Re-order';
      break;
    case 1:
      color = 'success';
      title = 'En stock';
      break;
    case 2:
      color = 'error';
      title = 'En rupture';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
 
  const [product, setProduct] = useState([]);
  
  
  useEffect(() => {

    async function getProduct() {
        try {
            const response = await axios.get('http://localhost:8080/api/product');
            console.log(response.data);
            setProduct(response.data);
            console.log("product", product);
  
        } catch (error) {
            console.error(error);
        }
    }

    
    getProduct();
    console.log("product:", product)
}, []);




  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          
          
      
          
        
      
      <TableBody>
            {product.map((object) => {
              
            var statue=3;
            if((object.quantityStocked)<(object.thresholdMax)){
              statue=1;
            }
            if ((object.quantityStocked)<(object.thresholdMin)) {
              statue=0;
            }
            if ((object.quantityStocked)==0)
            {
              statue=2;
            }
          

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={object.id}
                >
                  <TableCell component="th"  scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {object.nomenclature}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{object.label}</TableCell>
                  <TableCell align="left">{object.quantityStocked}</TableCell>
                  <TableCell align="left">
                    

                      <OrderStatus status={statue} />
                    
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={object.price*object.quantityStocked} displayType="text" thousandSeparator prefix="DT" />
                  </TableCell>
                </TableRow>
              );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
