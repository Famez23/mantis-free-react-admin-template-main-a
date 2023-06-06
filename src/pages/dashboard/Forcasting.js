import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const Forecast = ({ slot }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#4caf50', '#c62828'],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Fec', 'Mar', 'Avr', 'May', 'Jui', 'Juil', 'aou', 'Sep', 'Oct', 'Nov', 'Déc']
            : ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        },
        
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'CAPEX',
      data: [0, 86, 28, 115, 48, 210, 136]
    },
    {
      name: 'OPEX',
      data: [0, 43, 14, 56, 24, 105, 68]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Stock réel',
        data: slot === 'month' ? [100, 85, 101, 98, 87, 105, 91, 114, 94] : [31, 40, 35, 41]
      },
      {
        name: 'Prévision',
        data: slot === 'month' ? [110, 87, 99, 103, 90, 106, 95, 115, 100, 95, 110, 41] : [20, 40, 28, 32, 45, 33, 155]
      }
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

Forecast.propTypes = {
  slot: PropTypes.string
};

export default Forecast;

