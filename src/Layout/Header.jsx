import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../Context/AuthProvider";
import { toast } from "react-toastify";

const navLinks = [
  { label: "TV Shows", path: "/tv" },
  { label: "Movies", path: "/movie" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    navigate("/login");
    handleProfileMenuClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", mt: 2 }}>
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItem button component={Link} to={path} key={label}>
            <ListItemText primary={label} sx={{ textAlign: "center", color: "#fff" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {auth?.user ? (
        <>
          <MenuItem
            component={Link}
            to="/update-password"
            onClick={handleProfileMenuClose}
          >
            Update Password
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            component={Link}
            to="/login"
            onClick={handleProfileMenuClose}
          >
            Login
          </MenuItem>
          <MenuItem
            component={Link}
            to="/register"
            onClick={handleProfileMenuClose}
          >
            Register
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#111" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo + Nav */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: 80, marginRight: 10 }}
              />
            </Link>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navLinks.map(({ label, path }) => (
                <Typography
                  variant="button"
                  component={Link}
                  to={path}
                  key={label}
                  sx={{
                    mx: 2,
                    cursor: "pointer",
                    color: "#fff",
                    textDecoration: "none",
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Right side: profile + welcome + menu icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {auth?.user && (
              <>
                <Typography
                  variant="body1"
                  sx={{ color: "#fff", mr: 1, display: { xs: "none", sm: "block" } }}
                >
                  Welcome, {auth.user.name || "User"}
                </Typography>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ p: 0, mr: 2 }}
                >
                  <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : "U"}
                  </Avatar>
                </IconButton>
              </>
            )}
            {!auth?.user && (
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{ color: "#fff" }}
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
              >
                {/* Default avatar icon when no user */}
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  {/* Icon or letter */}
                  
                </Avatar>
              </IconButton>
            )}

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}

      {/* Drawer for small screens */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: 200,
            backgroundColor: "#111",
            color: "#fff",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
