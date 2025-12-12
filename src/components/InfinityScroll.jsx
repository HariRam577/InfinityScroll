import React, { useCallback, useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const InfinityScroll = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const isFetching = useRef(false);
  const API_URL = "https://dummyjson.com/products";

  const fetchData = useCallback(
    async (curruntSkip) => {
      if (isFetching.current) return;
      isFetching.current = true;
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}?limit=${limit}&skip=${curruntSkip}`
        );
        if (!res.ok) {
          throw new Error("Api Fetch Issue");
        }
        const data = await res.json();
        setProduct((prev) => [...prev, ...data.products]);
        setSkip(curruntSkip + limit);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [limit]
  );

  const handleScroll = useCallback(() => {
    const viewPort = window.innerHeight;
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    console.log(totalHeight);

    if (
      viewPort + scrollY >= totalHeight - 200 &&
      !loading &&
      // hasMore &&
      !isFetching.current
    ) {
      console.log("Make Api Call");

      fetchData(skip);
    }
  }, [loading, skip, fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="xl">
        {/* Professional Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#1a1a2e",
              mb: 1,
              letterSpacing: "-1px",
            }}
          >
            Premium Collection
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 700, mx: "auto", mb: 2 }}
          >
            Explore our handpicked selection of quality products
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: "#0f3460",
              mx: "auto",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Loading Backdrop */}
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress color="inherit" size={60} thickness={4} />
              <Typography sx={{ mt: 2, color: "white" }}>
                Loading products...
              </Typography>
            </Box>
          </Backdrop>
        )}

        {/* Error Alert */}
        {error && (
          <Stack sx={{ width: "100%", mb: 4 }} spacing={2}>
            <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
              <strong>Error:</strong> {error}
            </Alert>
          </Stack>
        )}

        {/* Product Grid - 4 Items Per Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {product.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3
                style={{
                  fontSize: "18px",
                  margin: "0 0 8px 0",
                  color: "#333",
                }}
              >
                {product.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  margin: "0 0 10px 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2563eb",
                  }}
                >
                  ${product.price}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  ⭐ {product.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && product.length === 0 && !error && (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              No products available
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Please check back later
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InfinityScroll;
