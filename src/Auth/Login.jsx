import React, { useContext, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authContext } from "./AuthContext";
import { da } from "zod/locales";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password too long"),
});

// type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loggedin } = useContext(authContext);
  console.log(login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("Login data:", data);
    // handle login here
    loggedin(data);
    reset();
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #020617 40%, #111827 100%)",
      }}
    >
      {/* Left side: brand / illustration */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          color: "#e5e7eb",
          p: 8,
        }}
      >
        <Box maxWidth="sm">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="h6" color="grey.400" gutterBottom>
            Log in to access your dashboard, manage projects, and track
            performance in real time.
          </Typography>
          <Box mt={6}>
            <Typography variant="subtitle2" color="grey.500">
              Secure • Modern • Fast
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Right side: login card */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            bgcolor: "#020617",
            border: "1px solid rgba(148, 163, 184, 0.18)",
            boxShadow:
              "0 24px 80px rgba(15,23,42,0.75), 0 0 0 1px rgba(148,163,184,0.12)",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 40,
                  height: 40,
                  fontSize: 18,
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600} color="#e5e7eb">
                  Sign in
                </Typography>
                <Typography variant="body2" color="grey.500">
                  Use your work email to continue
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="caption"
              color="grey.500"
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Admin Portal
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              fullWidth
              required
              id="email"
              label="Email address"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              InputLabelProps={{ sx: { color: "grey.400" } }}
              InputProps={{
                sx: {
                  color: "#e5e7eb",
                  borderRadius: 2,
                  "& fieldset": { borderColor: "rgba(148,163,184,0.4)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(129, 140, 248, 0.9)",
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              InputLabelProps={{ sx: { color: "grey.400" } }}
              InputProps={{
                sx: {
                  color: "#e5e7eb",
                  borderRadius: 2,
                  "& fieldset": { borderColor: "rgba(148,163,184,0.4)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(129, 140, 248, 0.9)",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                      sx={{ color: "grey.400" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              mt={1}
              mb={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="grey.500">
                Forgot your password?
              </Typography>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: 14, fontWeight: 500 }}
              >
                Reset it
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 1,
                mb: 2,
                py: 1.3,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)",
                boxShadow:
                  "0 18px 40px rgba(79,70,229,0.45), 0 0 0 1px rgba(129,140,248,0.5)",
                "&:hover": {
                  boxShadow:
                    "0 22px 55px rgba(79,70,229,0.7), 0 0 0 1px rgba(129,140,248,0.8)",
                  transform: "translateY(-1px)",
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #4f46e5 40%, #7c3aed 100%)",
                },
              }}
            >
              Continue
            </Button>

            <Box mt={1} textAlign="center">
              <Typography variant="body2" color="grey.500">
                New here?{" "}
                <Link href="#" underline="hover" sx={{ fontWeight: 500 }}>
                  Create an account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
