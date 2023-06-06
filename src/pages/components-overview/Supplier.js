import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import AddSupp from 'components/@extended/AddSupp';
import OrdersTable from './SupplierTable';



const ComponentShadow = () => {
  const theme = useTheme();

  return (
    <ComponentSkeleton>
      <Grid item xs={12} md={7} lg={8}>
    <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <div style={{
                  marginLeft: "10px", display: 'flex',
                }}>
                    <AddSupp/>
                    <Typography color="black" variant="h6" fontsize="bold" spacing={1} margin={1} justifyContent="flex-start">
                      Ajouter un Fournisseur
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
};

export default ComponentShadow;
