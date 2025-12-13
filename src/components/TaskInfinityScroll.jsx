import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Backdrop,
  CircularProgress,
  Alert,
  Stack,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Container,
  Box,
  Chip,
  IconButton,
  Rating,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HighAuth from "../Auth/HighAuth";
import { authContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Loader from "../utlities/Loader";
import Error from "../utlities/Error";
// import Hoc from "../Auth/Hoc";
// import HOC from "../Auth/HOC";

const TaskInfinityScroll = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const isFetching = useRef(false);
  const API_URL = "https://dummyjson.com/products";
  const navigate = useNavigate();
  const fetchData = useCallback(
    async (currentSkip) => {
      if (isFetching.current) return;
      isFetching.current = true;
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}?limit=${limit}&skip=${currentSkip}`
        );
        if (!res.ok) throw new Error("Api Fetch Issue");
        const data = await res.json();
        setProduct((pre) => [...pre, ...data.products]);
        setSkip(currentSkip + limit);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchData(0);
  }, [fetchData]);

  const handleScroll = useCallback(() => {
    const viewPort = window.innerHeight;
    const scrolly = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;

    if (
      viewPort + scrolly >= totalHeight - 300 &&
      !loading &&
      !isFetching.current
    ) {
      fetchData(skip);
    }
  }, [loading, skip, fetchData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  //handle ViewDetails
  const handleView = (id) => {
    // console.log("Item id: ", id);
    navigate(`/view/${id}`);
  };
  return (
    <Container maxWidth="xl">
      {/* Loading Backdrop */}
      {loading && <Loader loading={loading} />}

      {/* Error Alert */}
      {error && <Error error={error} />}

      {/* Product Grid - MUI dark cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {product.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                bgcolor: "rgba(15,23,42,0.96)",
                border: "1px solid rgba(148,163,184,0.22)",
                boxShadow:
                  "0 20px 40px rgba(15,23,42,0.85), 0 0 0 1px rgba(15,23,42,0.6)",
                overflow: "hidden",
                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: "rgba(129,140,248,0.85)",
                  boxShadow:
                    "0 26px 60px rgba(79,70,229,0.6), 0 0 0 1px rgba(129,140,248,0.8)",
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="190"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{
                    objectFit: "cover",
                    filter: "saturate(1.1)",
                    borderBottom: "1px solid rgba(31,41,55,0.9)",
                  }}
                />
                <Chip
                  label={item.category}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    bgcolor: "rgba(15,23,42,0.92)",
                    color: "#e5e7eb",
                    border: "1px solid rgba(148,163,184,0.4)",
                    textTransform: "capitalize",
                    fontSize: 11,
                  }}
                />
                {item.discountPercentage && (
                  <Chip
                    label={`-${Math.round(item.discountPercentage)}%`}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 2.2 }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#e5e7eb",
                    mb: 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgb(148,163,184)",
                    mb: 1.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    minHeight: 40,
                  }}
                >
                  {item.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#4ade80",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                      }}
                    >
                      ${item.price}
                    </Typography>
                    {item.stock && (
                      <Typography
                        variant="caption"
                        sx={{ color: "rgb(148,163,184)" }}
                      >
                        In stock: {item.stock}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Rating
                      size="small"
                      precision={0.1}
                      value={item.rating}
                      readOnly
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "rgb(156,163,175)" }}
                    >
                      {item.rating.toFixed(1)} / 5
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <CardActions
                sx={{ p: 2.2, pt: 0, justifyContent: "space-between" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: 999,
                    color: "rgb(148,163,184)",
                    borderColor: "rgba(148,163,184,0.5)",
                    "&:hover": {
                      borderColor: "rgba(129,140,248,0.9)",
                      color: "#e5e7eb",
                      background:
                        "radial-gradient(circle at top, rgba(79,70,229,0.15), transparent 60%)",
                    },
                  }}
                  onClick={() => handleView(item.id)}
                >
                  View details
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 999,
                    fontWeight: 600,
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)",
                    boxShadow:
                      "0 10px 25px rgba(79,70,229,0.6), 0 0 0 1px rgba(129,140,248,0.8)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #4f46e5 40%, #7c3aed 100%)",
                      boxShadow:
                        "0 14px 32px rgba(79,70,229,0.8), 0 0 0 1px rgba(129,140,248,1)",
                    },
                  }}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </div>

      {/* Empty State */}
      {!loading && product.length === 0 && !error && (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h5" sx={{ fontWeight: 500, color: "#e5e7eb" }}>
            No products available
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "rgb(148,163,184)" }}>
            Please check back later
          </Typography>
        </Box>
      )}
    </Container>
  );
};
// Hoc
export default HighAuth(TaskInfinityScroll);
