import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import { getIcon } from "../utils/payload-icons";
import { SocialLink } from "../utils/types";

type Props = {
  icons: SocialLink[];
  text?: string;
}

function AppFooter({ icons, text }: Props) {
  return (
    <AppBar component='footer' position='static' sx={{ mt: 'auto' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: '0.5rem' }}>
        <Box sx={{ mb: '0.25rem' }}>
          {icons.map(icon => (
            <IconButton key={icon.icon} component='a' aria-label={icon.ariaLabel} href={icon.url} target={icon.openInNewTab ? '_blank' : undefined}>
              <SvgIcon component={getIcon(icon.icon)} inheritViewBox />
            </IconButton>
          ))}
        </Box>
        <Typography variant='subtitle2' component='span' sx={{ color: '#afafaf'}}>{text}</Typography>
      </Container>
    </AppBar>
  );
}
export default AppFooter;