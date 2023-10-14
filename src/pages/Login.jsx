import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import userRedux from "../redux/userRedux";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isFetching, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const setEmails = (event) => {
    setEmail(event.target.value);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    let l = await login(dispatch, { email, password });
   

    setLoading(false);
    
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
            width: {xs:"80vw",sm:"50vw",md:"30vw"},
            margin: "auto",
            mt: 10,
            positon: "absolute",
            borderRadius: "8px",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box
              sx={{
                height:"10vh",
              
                position: "relative",
                top: "30px",
                mb: 8,
              }}
            >
              <Typography
                // variant="h5"
                sx={{
                  color: "black",
                  mt: 1,
                  // display: { xs: "none", md: "flex" },
                  fontSize:{sx:"18px",sm:"20px",md:"23px"}
                }}
              >
                EXPENSE MANAGER
              </Typography>
            </Box>
            <Form sx={{ maxWidth: 500 }} onSubmit="">
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

              <Button
                onClick={handleClick}
                disabled={isFetching}
                variant="contained"
                sx={{
                  mb: "10px",
                  "&:hover": {
                    color: "white",
                    bgcolor: "green",
                  },
                }}
              >
                SIGN IN
              </Button>
              {/* <Button
                disabled={isFetching}
                variant="contained"
                sx={{
                  "&:hover": {
                    color: "white",
                    bgcolor: "green",
                  },
                }}
              >
                <GoogleIcon />
                &nbsp; Google
              </Button> */}
              {error ? <div>Oops! Email or Password is wrong</div> : <></>}
            </Form>
            <div style={{textDecoration:"none"}}>
            <Link to="/register">
            <Typography style={{marginTop:"10px",textDecoration:"none",}} variant="body1" color="initial">Not registered! Register here</Typography>
            </Link>
            </div>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Login;
