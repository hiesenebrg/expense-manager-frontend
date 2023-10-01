import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addexpense } from "../redux/apiCalls";
import { useAsyncValue } from "react-router-dom";
import { addexpenses } from "../redux/infoRedux";

const Addexpense = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState();
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [price, setPrice] = useState(0);
  const addDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDateChange = (date) => {
    // conso;
    let dates = date.format("DD-MM-YYYY");
    setSelectedDate(date);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
    console.log(price);
  };
  const date = selectedDate?.format("DD-MM-YYYY");

  const addExpense = async () => {
    try {
      if (
        !selectedDate ||
        !description ||
        !category ||
        !price ||
        typeof price !== "number"
      ) {
        setError(true);
      } else {
        setError(false);
      }
      console.log(error);
      
        let res = await addexpense(dispatch, {
          description,
          category,
          date,
          price,
        });
        console.log(res.data.todo);

        dispatch(addexpenses(res.data.todo));
      
    } catch (error) {}
  };

  return (
    <>
      <Box
        style={{
          width: "60vw",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "2px solid black",
          borderRadius: "10px",
          marginTop: "40px",
        }}
      >
        <TextField
          id="filled-multiline-static"
          label="Description"
          placeholder="Please write here"
          multiline
          rows={4}
          sx={{ width: "60vw" }}
          variant="filled"
          required
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
              required={true}
              placeholder="$ 100"
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
                required
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
                  required
                  label=" Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box>
            <Button
              sx={{ maxWidth: "16vw", mt: 1, height: "8vh" }}
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={addExpense}
            >
              Add expense
            </Button>
          </Box>
          {error && (
            <Box> please fill all the details and price should be number</Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Addexpense;
