// import PropTypes from 'prop-types';

import MainCard from 'components/MainCard';
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '../../../node_modules/@mui/material/index';
// import Typography from 'themes/overrides/Typography';
import {  MessageOutlined, SettingOutlined } from '@ant-design/icons';
import IconTr from '../../assets/images/icons/file.png'
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};
const ComponentColor = () => {
  return (
    <>
      <MainCard sx={{ mt: 2 }} content={false}>
        <List
          component="nav"
          sx={{
            px: 0,
            py: 0,
            '& .MuiListItemButton-root': {
              py: 1.5,
              '& .MuiAvatar-root': avatarSX,
              '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
            }
          }}
        >
          <ListItemButton divider>
            <ListItemAvatar>
              <Avatar
                sx={{
                  color: 'success.main',
                  bgcolor: 'success.lighter'
                }}
              >
                <img alt='avatar' src={IconTr} width="19px" height="19px"/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="10 Mai, 2:00 PM" />
            <ListItemSecondaryAction>
              <Stack alignItems="flex-end">
                <Typography variant="subtitle1" noWrap>
                  + DT 9,430
                </Typography>
                {/* <Typography variant="h6" color="secondary" noWrap>
                  78%
                </Typography> */}
              </Stack>
            </ListItemSecondaryAction>
          </ListItemButton>
          <ListItemButton divider>
            <ListItemAvatar>
              <Avatar
                sx={{
                  color: 'primary.main',
                  bgcolor: 'primary.lighter'
                }}
              >
                <MessageOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 Mai, 10:45 AM" />
            <ListItemSecondaryAction>
              <Stack alignItems="flex-end">
                <Typography variant="subtitle1" noWrap>
                  + DT 30,900
                </Typography>
                {/* <Typography variant="h6" color="secondary" noWrap>
                  8%
                </Typography> */}
              </Stack>
            </ListItemSecondaryAction>
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                sx={{
                  color: 'error.main',
                  bgcolor: 'error.lighter'
                }}
              >
                <SettingOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="4 Mai, 3:10 AM" />
            <ListItemSecondaryAction>
              <Stack alignItems="flex-end">
                <Typography variant="subtitle1" noWrap>
                  + DT 682
                </Typography>
                {/* <Typography variant="h6" color="secondary" noWrap>
                  16%
                </Typography> */}
              </Stack>
            </ListItemSecondaryAction>
          </ListItemButton>
        </List>
      </MainCard>
    </>
  );
};

export default ComponentColor;
