import styled from "@emotion/styled";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../redux/apiCalls";

const Register = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
const [name,setName] = useState();
const [email,setEmail] = useState();
const [password,setPassword] = useState();
const handleRegister =async ()=>{
  let res = await signup(dispatch, {name,email,password});
  if(res){
    Navigate('/login');
  }else{
    Navigate('/register');
  }
}


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
            name="name"
            type="input"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <TextField
            name="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            name="password"
            type="password"
            id="Password"
            label="Password"
            variant="outlined"
            sx={{ mb: 2 }}
            value={name}
            onChange={(e)=>setPassword(e.target.value)}
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
      </Stack>
    </Box>
  );
};

export default Register;