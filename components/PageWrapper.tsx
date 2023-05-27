import { Container, Typography } from "@mui/material";
import { HeaderFooterData } from "../utils/payload-types";
import { SocialLink } from "../utils/types";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
  headerFooter: HeaderFooterData;
  children?: JSX.Element | JSX.Element[];
}

function PageWrapper({ title, subtitle, className, headerFooter, children }: Props) {
  return (
    <>
      <AppHeader navLinks={headerFooter.navigationLinks ?? []}/>
      <main className={className}>
        <Container maxWidth="lg" sx={{ mb: '1rem' }}>
          {title && <Typography variant='h1' gutterBottom={!subtitle} sx={{ mt: '1rem' }}>{title}</Typography>}
          {subtitle && <Typography variant='subtitle1' component='p' gutterBottom>{subtitle}</Typography>}
          {children}
        </Container>
      </main>
      <AppFooter icons={headerFooter.socialLinks as SocialLink[]} text={headerFooter.copyrightText}/>
    </>
  );
}
export default PageWrapper;