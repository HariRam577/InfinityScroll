import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Backdrop,
  CircularProgress,
  Stack,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Rating,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = "https://dummyjson.com/products";
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: "linear-gradient(135deg, #020617 0%, #020617 100%)",
          minHeight: "100vh",
          py: 5,
        }}
      >
        <Backdrop open={true} sx={{ color: "#fff", zIndex: 1300 }}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="inherit" size={60} thickness={4} />
            <Typography sx={{ mt: 2, color: "white" }}>
              Loading product details...
            </Typography>
          </Box>
        </Backdrop>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box
        sx={{
          bgcolor: "linear-gradient(135deg, #020617 0%, #020617 100%)",
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Container maxWidth="xl">
          <Stack sx={{ width: "100%", mb: 4 }} spacing={2}>
            <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
              <strong>Error:</strong> {error || "Product not found"}
            </Alert>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor:
          "linear-gradient(135deg, #020617 0%, #020617 40%, #020617 100%)",
        background:
          "radial-gradient(circle at top, #1e293b 0, #020617 45%, #020617 100%)",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* Main Product Section */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: "rgba(15,23,42,0.96)",
                border: "1px solid rgba(148,163,184,0.22)",
                boxShadow: "0 20px 40px rgba(15,23,42,0.85)",
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="450"
                image={product.thumbnail}
                alt={product.title}
                sx={{
                  objectFit: "cover",
                  transition: "filter 0.3s ease",
                  "&:hover": { filter: "saturate(1.2) brightness(1.05)" },
                }}
              />
            </Card>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    bgcolor: "rgba(79,70,229,0.2)",
                    color: "#e5e7eb",
                    mb: 2,
                    fontWeight: 500,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "#e5e7eb",
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#4ade80",
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: "0.02em",
                  }}
                >
                  ${product.price}
                  {product.discountPercentage && (
                    <Typography
                      component="span"
                      variant="h6"
                      sx={{
                        color: "#ef4444",
                        ml: 1,
                        textDecoration: "line-through",
                      }}
                    >
                      $
                      {(
                        (product.price * 100) /
                        (100 - product.discountPercentage)
                      ).toFixed(2)}
                    </Typography>
                  )}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 3, mt: 1 }}
                >
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                  <Typography
                    sx={{ ml: 1, color: "rgb(148,163,184)", fontWeight: 500 }}
                  >
                    {product.rating.toFixed(1)} / 5
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "rgb(148,163,184)",
                    mb: 3,
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                  }}
                >
                  {product.description}
                </Typography>

                <Divider sx={{ my: 3, borderColor: "rgba(148,163,184,0.3)" }} />

                {/* Quick Stats */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14, mb: 0.5 }}
                    >
                      Stock
                    </Typography>
                    <Typography sx={{ color: "#10b981", fontWeight: 600 }}>
                      {product.stock} available
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14, mb: 0.5 }}
                    >
                      Brand
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", fontWeight: 600 }}>
                      {product.brand}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: "auto" }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: 16,
                    py: 1.5,
                    height: 56,
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)",
                    boxShadow: "0 10px 25px rgba(79,70,229,0.6)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                      boxShadow: "0 14px 32px rgba(79,70,229,0.8)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Additional Details */}
        <Card
          sx={{
            bgcolor: "rgba(15,23,42,0.96)",
            border: "1px solid rgba(148,163,184,0.22)",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(15,23,42,0.85)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{ color: "#e5e7eb", mb: 2, fontWeight: 600 }}
                >
                  Specifications
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14 }}
                    >
                      Weight
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", fontWeight: 500 }}>
                      {product.weight}g
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14 }}
                    >
                      Dimensions
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", fontWeight: 500 }}>
                      {product.dimensions?.width} × {product.dimensions?.height}{" "}
                      × {product.dimensions?.depth} cm
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14 }}
                    >
                      SKU
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", fontWeight: 500 }}>
                      {product.sku}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{ color: "#e5e7eb", mb: 2, fontWeight: 600 }}
                >
                  Policies
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14 }}
                    >
                      Warranty
                    </Typography>
                    <Typography sx={{ color: "#e5e7eb", fontWeight: 500 }}>
                      {product.warrantyInformation}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14 }}
                    >
                      Shipping
                    </Typography>
                    <Typography sx={{ color: "#10b981", fontWeight: 500 }}>
                      {product.shippingInformation}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: "rgb(148,163,184)", fontSize: 14 }}
                    >
                      Status
                    </Typography>
                    <Chip
                      label={product.availabilityStatus}
                      color="success"
                      size="small"
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography
                  variant="h6"
                  sx={{ color: "#e5e7eb", mb: 2, fontWeight: 600 }}
                >
                  Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {product.tags?.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "rgba(79,70,229,0.2)",
                        color: "#e5e7eb",
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ViewProduct;
