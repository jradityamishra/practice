import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { login, reset } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../component/Layout/Layout";
import Spinner from "../component/Spinner";

const LoginPageComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(login(formData));
    } catch (err) {
      toast.error(err.message || "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || (user && !user.isAdmin)) navigate("/");
    else if (isSuccess || (user && user.isAdmin)) navigate("/admin");
    else if (isSuccess || (user && user.isSuperAdmin)) navigate("/super-admin");
    dispatch(reset());
  }, [user, isError, message, isSuccess, dispatch, navigate]);

  return (
    <Layout>
      {isLoading && <Spinner />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Container maxWidth="xs">
          <Paper sx={{ p: 2, mt: 5 }}>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Email address"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                type="password"
              />

              <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
                Don't have an account?{" "}
                <Link to={"/register"}>
                  <strong>Register</strong>
                </Link>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default LoginPageComponent;
