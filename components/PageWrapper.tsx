import { Container, Typography } from "@mui/material";
import { FooterData } from "../utils/payload-types";
import { SocialLink } from "../utils/types";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
  footer: FooterData;
  children?: JSX.Element | JSX.Element[];
}

function PageWrapper({ title, subtitle, className, footer, children }: Props) {
  return (
    <>
      <AppHeader />
      <main className={className}>
        <Container maxWidth="lg" sx={{ mb: '1rem' }}>
          {title && <Typography variant='h1' gutterBottom={!subtitle} sx={{ mt: '1rem' }}>{title}</Typography>}
          {subtitle && <Typography variant='subtitle1' component='p' gutterBottom>{subtitle}</Typography>}
          {children}
        </Container>
      </main>
      <AppFooter icons={footer.socialLinks as SocialLink[]} text={footer.copyrightText}/>
    </>
  );
}
export default PageWrapper;