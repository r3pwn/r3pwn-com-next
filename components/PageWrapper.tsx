import { Container } from "@mui/material";
import { FooterData } from "../utils/payload-types";
import { SocialLink } from "../utils/types";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

type Props = {
  className?: string;
  footer: FooterData;
  children?: JSX.Element | JSX.Element[];
}

function PageWrapper({ className, footer, children }: Props) {
  return (
    <>
      <AppHeader />
      <main className={className}>
        <Container maxWidth="lg" sx={{ mb: '1rem' }}>
          {children}
        </Container>
      </main>
      <AppFooter icons={footer.socialLinks as SocialLink[]} text={footer.copyrightText}/>
    </>
  );
}
export default PageWrapper;