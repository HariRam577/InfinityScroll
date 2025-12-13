import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loader = ({ loading, message = "Loading products..." }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "rgba(2, 6, 23, 0.95)",
        backdropFilter: "blur(20px)",
        background:
          "radial-gradient(circle at center, rgba(30, 41, 59, 0.3) 0%, rgba(2, 6, 23, 0.95) 70%)",
      }}
      open={loading}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          borderRadius: 3,
          border: "1px solid rgba(148, 163, 184, 0.3)",
          boxShadow:
            "0 25px 50px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(79, 70, 229, 0.3)",
          minWidth: 300,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: -100,
            width: 100,
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(79,70,229,0.1), transparent)",
            animation: "shimmer 1.5s infinite",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <CircularProgress
            color="inherit"
            size={60}
            thickness={4}
            sx={{
              mb: 3,
              "&::after": {
                position: "absolute",
                content: '""',
                top: -10,
                left: -10,
                right: -10,
                bottom: -10,
                borderRadius: "50%",
                boxShadow: "0 0 25px rgba(79,70,229,0.6)",
                animation: "pulse 2s infinite",
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#e5e7eb",
              mb: 1,
              letterSpacing: "-0.5px",
            }}
          >
            {message}
          </Typography>
          <Typography
            sx={{
              color: "rgb(148, 163, 184)",
              fontSize: "0.95rem",
            }}
          >
            Please wait while we prepare your content
          </Typography>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default Loader;
