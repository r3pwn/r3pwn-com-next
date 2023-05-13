import { Breakpoint, Theme, createTheme } from '@mui/material/styles';

type ResponsiveFontSize = {
  lg?: string;
  md?: string;
  sm?: string;
}

export const getCurrentTheme = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: "Inter,sans-serif",
      h1: {
        fontSize: '3rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      }
    },
  });
  
  theme.typography.h1 = {
    ...theme.typography.h1,
    ...generateResponsiveSize(theme, { lg: '3rem', md: '2.75rem', sm: '2rem' })
  };

  theme.typography.h2 = {
    ...theme.typography.h2,
    ...generateResponsiveSize(theme, { lg: '2rem', md: '1.75rem', sm: '1.75rem' })
  };

  theme.typography.h3 = {
    ...theme.typography.h3,
    ...generateResponsiveSize(theme, { md: '1.75rem', sm: '1.5rem' })
  };

  theme.typography.h4 = {
    ...theme.typography.h4,
    ...generateResponsiveSize(theme, { sm: '1.25rem' })
  };

  theme.typography.h5 = {
    ...theme.typography.h5,
    ...generateResponsiveSize(theme, { sm: '1rem' })
  };

  return theme;
}

function generateResponsiveSize(theme: Theme, fontSizes: ResponsiveFontSize) {
  let mediaQueries = {};

  for (let size of Object.keys(fontSizes)) {
    mediaQueries[theme.breakpoints.down(size as Breakpoint)] = {
      fontSize: fontSizes[size]
    }
  }

  return mediaQueries;
}