import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import LogoIcon from './LogoIcon';

type Props = {
  minimal?: boolean;
}

const pages = [
  { name: 'Blog posts', path: '/blog' },
  { name: 'Projects', path: '/blog' },
  { name: 'Hackathons', path: '/blog' },
  { name: 'About me', path: '/about' }
];

function ResponsiveAppBar({ minimal }: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton 
            aria-label="Home page"
            href="/"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <LogoIcon fontSize="large" />
          </IconButton>

          {!minimal && <Box sx={{ display: { xs: 'flex', md: 'none' }, zIndex: '1' }}>
            <IconButton
              size="large"
              aria-label="site navigation link menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} component="a" href={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}

          <Box sx={{ position: 'absolute', width: '100%'}}>
            <IconButton 
              aria-label="Home page"
              href="/"
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 'auto', ml: 'auto', width: 'min-content' }}>
              <LogoIcon fontSize="large" />
            </IconButton>
          </Box>

          {!minimal && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '0.5rem' }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;