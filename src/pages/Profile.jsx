import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { updateprofile } from "../redux/apiCalls";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const userid = user.currentUser.data.user._id;
  const dispatch = useDispatch();
  const [name, setName] = useState(user.currentUser.data.user.name);
  const [email, setEmail] = useState(user.currentUser.data.user.email);
  const [password, setPassword] = useState(user.currentUser.data.user.password);
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
  return (
    <>
      <Navbar />

      <Box
        sx={{
          height: "50vh",
          width: "40vw",
          bgcolor: "skyblue",
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
          <input
            style={{ padding: 8, width: "60%",borderRadius:"6px" }}
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label style={{marginLeft:"-250px"}}>Email</label>
          <input
            style={{ padding: 8, width: "60%" ,borderRadius:"6px"}}
            type="text"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label style={{marginLeft:"-250px"}}>Password</label>
          <input
            style={{ padding: 8, width: "60%" ,borderRadius:"6px"}}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
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