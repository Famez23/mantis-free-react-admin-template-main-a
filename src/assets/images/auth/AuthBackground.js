// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Logo from './Logo';
// import logo from './logo-tt.svg';
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  // const theme = useTheme();
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(50px)', zIndex: -1, bottom: 0 }}>
      <Logo />
    </Box>
  );
};

export default AuthBackground;
