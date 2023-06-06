/* eslint-disable no-unused-vars */
// material-ui
// import { Breadcrumbs, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import {
  Grid,
  Typography
} from '@mui/material';
// project import
import ComponentSkeleton from './ComponentSkeleton';
import OrdersTable from 'pages/dashboard/ProductTable';
import MainCard from 'components/MainCard';
import Add from 'components/@extended/Add';
// import MainCard from 'components/MainCard';

const ComponentTypography = () => (
  <ComponentSkeleton>
    <Grid item xs={12} md={7} lg={8}>
    <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <div style={{
                  marginLeft: "10px", display: 'flex',
                }}>
                    <Add  />
                    <Typography color="black" variant="h6" fontsize="bold" spacing={1} margin={1} justifyContent="flex-start">
                      Ajouter un produit
                    </Typography>
                </div>
              </Grid>
            </Grid>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5"></Typography>
        </Grid>
        <Grid item />
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <OrdersTable />
      </MainCard>
    </Grid>
  </ComponentSkeleton>
);

export default ComponentTypography;
