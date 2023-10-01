import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../redux/apiCalls";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../components/Loading";
const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  justifyContent: "space-between",
});

const Register = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const handleRegister = async () => {
    setloading(true);
    let res = await signup(dispatch, { name, email, password });
    if (res) {
      setloading(false);
      Navigate("/login");
    } else {
      Navigate("/register");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const setEmails = (event) => {
    setEmail(event.target.value);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            border: 4,
            height: "70vh",
            width: "30vw",
            margin: "auto",
            mt: 10,
            positon: "absolute",
            borderRadius: "8px",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box
              sx={{
                height: "8vh",
                width: "20vw",
                position: "relative",
                top: "30px",
                mb: 8,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "black",
                  mt: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                EXPENSE MANAGER
              </Typography>
            </Box>
            <Form sx={{ maxWidth: 500 }} onSubmit="">
              <TextField
                name="name"
                type="input"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{ mb: 2 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="text"
                name="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ mb: 2 }}
                value={email}
                onChange={setEmails}
              />

              <TextField
                sx={{ mb: 2 }}
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="password"
                type="password"
                id="confirm Password"
                label="Confirm Password"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                onClick={handleRegister}
                variant="contained"
                sx={{
                  "&:hover": {
                    color: "white",
                    bgcolor: "green",
                  },
                }}
              >
                Register
              </Button>
            </Form>
            <div style={{textDecoration:"none"}}>
            <Link to="/login">
            <Typography  variant="body1" color="initial">Already registered! Login here</Typography>
            </Link>
            </div>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Register;
