import { Box, Button, IconButton, Typography } from "@mui/material";
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
    <div>
      {/* Header with Logout Button */}
      <Box sx={{ mb: 6 }}>
        {/* Logout Button - Top Right */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1300,
            display: { xs: "none", md: "block" },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout} // Add your logout handler here
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

        {/* Mobile Logout Button */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            textAlign: "right",
            mb: 2,
          }}
        >
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "#e5e7eb",
              "&:hover": {
                bgcolor: "rgba(79,70,229,0.2)",
                transform: "scale(1.1)",
              },
            }}
          >
            <LogoutIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Header Title */}
        <Box sx={{ textAlign: "center", position: "relative" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#e5e7eb",
              mb: 1,
              letterSpacing: "-1px",
            }}
          >
            Premium Collection
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              maxWidth: 700,
              mx: "auto",
              mb: 2,
              color: "rgb(148, 163, 184)",
            }}
          >
            Explore our handpicked selection of quality products
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: "#4f46e5",
              mx: "auto",
              borderRadius: 2,
              boxShadow: "0 0 18px rgba(79,70,229,0.9)",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Header;
