// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
// import Logo from 'assets/images/auth/Logo';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
      {/* <Logo /> */}
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
