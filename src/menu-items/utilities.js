// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  SwapOutlined,
  DatabaseOutlined,
  UserAddOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  SwapOutlined,
  DatabaseOutlined,
  UserAddOutlined,
  SolutionOutlined,
  PeopleOutlineIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'Articles',
      title: 'Articles',
      type: 'item',
      url: '/typography',
      icon: icons.DatabaseOutlined
    },
    {
      id: 'Mouvement',
      title: 'Mouvement',
      type: 'item',
      url: '/color',
      icon: icons.SwapOutlined
    },
    {
      id: 'Fournisseur',
      title: 'Fournisseur',
      type: 'item',
      url: '/shadow',
      icon: icons.UserAddOutlined
    },
    {
      id: 'Facture',
      title: 'Facture',
      type: 'item',
      url: '/icons/ant',
      icon: icons.SolutionOutlined ,
      breadcrumbs: true
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/User',
      icon: PeopleOutlineIcon ,
      breadcrumbs: true
    }
  ]
};

export default utilities;
