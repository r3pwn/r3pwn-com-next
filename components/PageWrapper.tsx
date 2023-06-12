import { Container, Typography } from '@mui/material';
import { NavigationData } from '../utils/payload-types';
import { SocialLink } from '../utils/types';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
  navigation: NavigationData;
  children?: JSX.Element | JSX.Element[];
}

function PageWrapper({ title, subtitle, className, navigation, children }: Props) {
  return (
    <>
      <AppHeader navLinks={navigation.header?.navigationLinks ?? []}/>
      <main className={className}>
        <Container maxWidth="lg" sx={{ mb: '1rem' }}>
          {title && <Typography variant='h1' gutterBottom={!subtitle} sx={{ mt: '1rem' }}>{title}</Typography>}
          {subtitle && <Typography variant='subtitle1' component='p' gutterBottom>{subtitle}</Typography>}
          {children}
        </Container>
      </main>
      <AppFooter icons={navigation.footer?.socialLinks as SocialLink[]} text={navigation.footer?.copyrightText}/>
    </>
  );
}
export default PageWrapper;