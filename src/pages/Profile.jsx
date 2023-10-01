import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { updateprofile } from "../redux/apiCalls";
import {TextField} from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../components/Loading";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const userid = user.currentUser.data.user.id;
  const dispatch = useDispatch();
  const [name, setName] = useState(user.currentUser.data.user.username);
  const [email, setEmail] = useState(user.currentUser.data.user.email);
  const [password, setPassword] = useState(user.currentUser.data.user.password);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setImage] = useState();
  const handleUpdate = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("avatar", avatar);
    formdata.append("name", name);
    formdata.append("email", email);

   console.log(userid);
    let res = await updateprofile(dispatch, formdata,userid);
    
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
      <Navbar />

      <Box
        sx={{
          height: "60vh",
          width: "40vw",
          border:"2px solid black",
          m: "auto",
          mt: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          borderRadius:"10px"
        }}
      >
        <form
          style={{
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label style={{marginLeft:"-250px"}}>Name</label>
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
                sx={{ mb: 2 , width:"18vw", margin:"auto" }}
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
          <label style={{marginLeft:"-220px"}}>Profile Image</label>
          <input
            style={{ padding: 8, width: "60%" }}
            name="avatar"
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
          ></input>
          <button
          onClick={handleUpdate}
          style={{
            height: "40px",
            width: "80px",
            margin: "auto",
            color: "white",
            backgroundColor: "green",
            borderRadius: "8px",
          }}
        >
          Update
        </button>
        </form>
        
      </Box>
    </>
  );
};

export default Profile;