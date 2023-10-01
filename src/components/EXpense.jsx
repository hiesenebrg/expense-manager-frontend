import { Box, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Addexpense from "./Addexpense";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { userRequest } from "../requestMethods";
// import { parse, format } from "date-fns";
import { Success, deleteexpense } from "../redux/infoRedux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateexpenses } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { updateexpense } from "../redux/infoRedux";
import CancelIcon from "@mui/icons-material/Cancel";
import { update } from "../redux/userRedux";

const EXpense = ({ expense }) => {
  console.log(expense);

  const expensess = useSelector((state) => state.info.expenses);

  const [selectedDate, setSelectedDate] = useState();
  const [category, setCategory] = React.useState(expense.category);
  const [description, setDescription] = useState(expense.description);
  const [price, setPrice] = useState(expense.price);
  const [showFullText, setShowFullText] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const addDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (date) => {
    let dates = date.format("DD-MM-YYYY");
    setSelectedDate(date);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
    console.log(price);
  };
  const handleDelete = async () => {
    console.log("THis is delete id ", expense._id);
    try {
      console.log(`the deleted is ${expense._id}`);
      const res = await userRequest.delete(`/todo/delete/${expense._id}`);
      dispatch(deleteexpense(expense._id));
      dispatch(Success());
    } catch (error) {
      console.log("THere is an error while deleting", error);
    }
  };
  const handleEdit = async () => {
    setEditMode(true);
  };
  const dates = selectedDate?.format("DD-MM-YYYY");
  const editexpense = async () => {
    const dateString = dates;
    const parts = dateString.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    console.log("the id to delete", expense._id);
    const info = { price, description, date, category };

    const res = await userRequest.put(`/todo/update/${expense._id}`, info);
    console.log(res.data.data);

    const newNumbers = [...expensess];
    console.log(`this will be the update data ${res.data.data.todo}`);

    const indexToUpdate = newNumbers.findIndex(
      (expense) => expense._id === res.data.data.todo._id
    );
    console.log(
      `the id that need to be updated is  ${res.data.data.todo._id} and the index is ${indexToUpdate}`
    );
    newNumbers[indexToUpdate] = res.data.data.todo;
    console.log(newNumbers);

    dispatch(updateexpense(newNumbers));

    // dispatch(updateexpense(res.data.data.todos))
    setEditMode(false);
  };
  const cancelEdit = () => {
    setEditMode(false);
  };
  if (expense.description === undefined) {
    return null;
  }

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <>
      {!editMode ? (
        <>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              width:"63vw",
              maxWidth: "63vw",

              height: "18vh",
              maxHeight:"80vh",
              backgroundColor: "#f0f0f0",
              border: "2px solid black",
              borderRadius: "5px",
              flexWrap: "wrap",
              marginTop:"20px"
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 3,
                Width: "75vw",
                textAlign: "justify",
                flexWrap: "wrap",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              
                <Typography style={{marginTop:"20px"}} variant="h4" color="initial">
                  {expense.description.length > 20 ? (
                    <div>
                      {showFullText ? (
                        <span>
                          {expense.description}
                          <button onClick={toggleText}>Show Less</button>
                        </span>
                      ) : (
                        <span>
                          {expense.description.slice(0, 20)}...
                          <button onClick={toggleText}>Show More</button>
                        </span>
                      )}
                    </div>
                  ) : (
                    <span>{expense.description}</span>
                  )}
                </Typography>
             
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "24px",
                    fontWeight: "bolder",
                  }}
                >
                  Price :{" "}
                  <Typography variant="h5" color="initial">
                    {expense.price}
                  </Typography>
                </Box>
                <Box
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "24px",
                    fontWeight: "bolder",
                  }}
                >
                  Category :
                  <Typography
                    sx={{ color: "red" }}
                    variant="h5"
                    color="initial"
                  >
                    {expense.category}
                  </Typography>
                </Box>
                <Box
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "24px",
                    fontWeight: "bolder",
                  }}
                >
                  Date :{" "}
                  <Typography variant="h5" color="initial">
                    {expense.date.slice(0, 10)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: "10px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "#1976d2",
                    borderRadius: "50%",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="edit"
                    color="secondary"
                    onClick={handleEdit}
                  >
                    <ModeEditIcon style = {{color:"white" }}/>
                  </IconButton>
                </div>
              </Box>
              <Box style={{ flexGrow: 1 }}>
                <div
                  style={{
                    height: "50px",
                    width: "50px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="delete"
                    color="secondary"
                    onClick={handleDelete}
                  >
                    <DeleteIcon style = {{color:"white" }} />
                  </IconButton>
                </div>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          style={{
            width: "50vw",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid black",
          }}
        >
          <TextField
            id="filled-multiline-static"
            label="Description"
            placeholder="Please write here"
            multiline
            rows={4}
            value={description}
            sx={{ width: "48vw" }}
            variant="filled"
            onChange={addDescription}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ maxWidth: "10vw" }}>
              <TextField
                label="Price"
                placeholder="$ 100"
                value={price}
                onChange={handlePrice}
              ></TextField>
            </Box>
            <Box sx={{ mt: 1 }}>
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleChange}
                  label="Categories"
                >
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Transportation"}>Transportation</MenuItem>
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Utilities"}>Utilities</MenuItem>
                  <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label=" Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                width: "20vw",
                mt: 1,
                height: "8vh",
                backgroundColor: "green",
                color: "white",
              }}
              // variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={editexpense}
            >
              Edit expense
            </Button>
            <Button
              sx={{
                width: "20vw",
                mt: 1,
                height: "8vh",
                backgroundColor: "red",
                color: "white",
              }}
              // variant="contained"
              startIcon={<CancelIcon />}
              onClick={cancelEdit}
            >
              {" "}
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EXpense;
