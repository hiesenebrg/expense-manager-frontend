import React from "react";
import Navbar from "../components/Navbar";
import Addexpense from "../components/Addexpense";
import EXpense from "../components/EXpense";
import ShowExpense from "../components/ShowExpense";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",border:"2px solid black",borderRadius:"10px",minHeight:"80vh"}}>
      <Addexpense />

      <ShowExpense />
      </div>
    </div>
  );
};

export default Homepage;
