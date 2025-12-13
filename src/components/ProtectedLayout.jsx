import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";

const ProtectedLayout = ({ children, loading = false, error = "" }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor:
          "linear-gradient(135deg, #020617 0%, #020617 40%, #020617 100%)",
        background:
          "radial-gradient(circle at top, #1e293b 0, #020617 45%, #020617 100%)",
        backgroundAttachment: "fixed",
        py: 5,
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Fixed Header */}
      <Header />

      {/* Main Content Container */}
      <Container
        maxWidth="xl"
        sx={{ py: 2, mt: 12, position: "relative", zIndex: 2 }}
      >
        {/* Loading Overlay */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(2, 6, 23, 0.8)",
            }}
          >
            <CircularProgress size={60} sx={{ color: "#4f46e5" }} />
          </Box>
        )}

        {/* Error Alert */}
        {/* {error && (
          <Alert severity="error" sx={{ mb: 3, zIndex: 100 }}>
            {error}
          </Alert>
        )} */}

        {/* Dynamic Page Content */}
        {children}
      </Container>
    </Box>
  );
};

export default ProtectedLayout;
