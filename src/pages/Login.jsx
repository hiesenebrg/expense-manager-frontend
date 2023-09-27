import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import userRedux from "../redux/userRedux";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    let l = await login(dispatch, { email, password });
    
    if (l.success) {
      Navigate("/");
    }else{
      Navigate("/login");
    }
  };

  const Form = styled("form")({
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    justifyContent: "space-between",
  });

  return (
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
            variant="h4"
            sx={{ color: "black", mt: 1, display: { xs: "none", md: "flex" } }}
          >
            KRAPTIN CARE
          </Typography>
        </Box>
        <Form sx={{ maxWidth: 500 }} onSubmit="">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="password"
            type="password"
            id="Password"
            label="Password"
            variant="outlined"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
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
          </Button>
          {error ? <div>Something went wrong</div> : <></>}
        </Form>
      </Stack>
    </Box>
  );
};

export default Login;