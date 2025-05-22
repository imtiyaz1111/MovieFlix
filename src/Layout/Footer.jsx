import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, styled, useTheme } from '@mui/material';

import bg from '../assets/footer-bg.jpg';
import logo from '../assets/logo.png';

const FooterWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6, 2),
  backgroundImage: `url(${bg})`,
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}));

const FooterContent = styled(Container)(({ theme }) => ({
  maxWidth: '1000px',
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const LogoImage = styled('img')({
  marginRight: (theme) => theme.spacing(1),
});

const MenuWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const MenuColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: theme.spacing(1),
}));

const MenuItem = styled(Link)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  textDecoration: 'none',
  color: 'white', // Set color to white
  marginTop: theme.spacing(1),
  '&:first-child': {
    marginTop: 0,
  },
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <FooterContent>
        <LogoBox>
          <LogoImage src={logo} width={100} height={100} alt="tMovies Logo" />
          <Typography component={Link} to="/" variant="h6" sx={{ textDecoration: 'none', color: 'white' }}>
            MovieFlix
          </Typography>
        </LogoBox>
        <MenuWrapper>
          <MenuColumn>
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/">Contact us</MenuItem>
            <MenuItem to="/">Term of services</MenuItem>
            <MenuItem to="/">About us</MenuItem>
          </MenuColumn>
          <MenuColumn>
            <MenuItem to="/">Live</MenuItem>
            <MenuItem to="/">FAQ</MenuItem>
            <MenuItem to="/">Premium</MenuItem>
            <MenuItem to="/">Privacy policy</MenuItem>
          </MenuColumn>
          <MenuColumn>
            <MenuItem to="/">You must watch</MenuItem>
            <MenuItem to="/">Recent release</MenuItem>
            <MenuItem to="/">Top IMDB</MenuItem>
          </MenuColumn>
        </MenuWrapper>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;