import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// Icons added to this object will automatically appear in Payload, and will automatically support being displayed on the site
const iconList = {
  email: EmailIcon,
  facebook: FacebookIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  reddit: RedditIcon,
  telegram: TelegramIcon,
  twitter: TwitterIcon
}

export const getSupportedIcons = function () {
  return Object.keys(iconList);
}

export const getIcon = function (iconName: string): OverridableComponent<SvgIconTypeMap<{}, 'svg'>> {
  if (!iconList[iconName]) {
    // if the icon requested is not supported, use the broken image icon instead
    return BrokenImageIcon;
  }
  return iconList[iconName];
}