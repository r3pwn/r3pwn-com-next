import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { PageData } from '@/payload/payload-types';
import LogoIcon from './LogoIcon';

type Props = {
  navLinks: { label: string, target: string | PageData }[];
}

function AppHeader({ navLinks }: Props) {
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

          <Box sx={{ display: { xs: 'flex', md: 'none' }, zIndex: '1' }}>
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
              {navLinks.map((link) => (
                <MenuItem key={link.label} component="a" href={(link.target as PageData).breadcrumbs?.at(-1)?.url} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{link.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ position: 'absolute', width: '100%'}}>
            <IconButton 
              aria-label="Home page"
              href="/"
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 'auto', ml: 'auto', width: 'min-content' }}>
              <LogoIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '0.5rem' }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={(link.target as PageData).breadcrumbs?.at(-1)?.url}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block' }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppHeader;