import { createTheme } from '@mui/material/styles';

export const getCurrentTheme = () => createTheme({
  typography: {
    fontFamily: "Inter,sans-serif",
    h1: {
      fontSize: '4rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    }
  },
});

