import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { authContext } from "../Auth/AuthContext";

const Header = () => {
  const { logout } = useContext(authContext);

  const handleLogout = () => {
    console.log("Logout");
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        background: "rgba(2, 6, 23, 0.95)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        borderBottom: "1px solid rgba(148,163,184,0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 70, px: 3 }}>
        {/* Logo/Title - Left */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#e5e7eb",
              letterSpacing: "-0.5px",
              mr: 2,
            }}
          >
            Premium Collection
          </Typography>
        </Box>

        {/* Logout Button - Right */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              color: "#e5e7eb",
              borderColor: "rgba(148,163,184,0.5)",
              fontWeight: 500,
              fontSize: 14,
              px: 2,
              py: 0.75,
              minWidth: 120,
              height: 40,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(15,23,42,0.8)",
              "&:hover": {
                backgroundColor: "rgba(79,70,229,0.15)",
                borderColor: "#4f46e5",
                boxShadow: "0 0 20px rgba(79,70,229,0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Mobile Logout */}
        <IconButton
          onClick={handleLogout}
          sx={{
            color: "#e5e7eb",
            display: { xs: "block", md: "none" },
            "&:hover": {
              bgcolor: "rgba(79,70,229,0.2)",
              transform: "scale(1.1)",
            },
          }}
        >
          <LogoutIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
