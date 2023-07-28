import '@/src/styles/globals.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import { ThemeProvider } from '@mui/material/styles';
import { getCurrentTheme } from '../utils/theme';

export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={getCurrentTheme()}><Component {...pageProps} /></ThemeProvider>;
}
