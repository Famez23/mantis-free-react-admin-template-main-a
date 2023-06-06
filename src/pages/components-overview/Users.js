import React from 'react'
import UserTable from 'pages/dashboard/UserTable'
import ComponentSkeleton from './ComponentSkeleton'
import { Grid } from '../../../node_modules/@mui/material/index'
import { Typography } from '../../../node_modules/@mui/material/index'
import AddUser from 'components/@extended/AddUser'
import MainCard from 'components/MainCard'
export default function Users() {
  return (
    <ComponentSkeleton>
        <Grid container spacing={6}>
              <Grid item xs={12} md={12}>
                <div style={{
                  marginLeft: "10px", display: 'flex',
                }}>
                    <AddUser/>
                    <Typography color="black" variant="h6" fontsize="bold" spacing={1} margin={1} justifyContent="flex-start">
                      Approuver un utilisateur
                    </Typography>
                </div>
              </Grid>
            </Grid>
            <MainCard>
            <UserTable/>
            </MainCard>
    
    
    </ComponentSkeleton>
    
    )
}
