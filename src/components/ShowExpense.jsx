import React from "react";
import EXpense from "./EXpense";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { addexpenses, emptyExpenses } from "../redux/infoRedux";
const ShowExpense = () => {
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState([]);
  const expensess = useSelector((state) => state.info.expenses);
  useEffect(() => {
    const getallexpenses = async () => {
      const res = await userRequest.get("/todo/get");
      const todos = res.data.data.todos;
      if (todos) {
        for (let todo in todos) setExpenses(expensess.concat(todo));
        console.log("empty product");
        dispatch(emptyExpenses());

        todos.forEach((todo) => {
          console.log("This is user specific each data", todo);
          dispatch(addexpenses(todo)); // Replace with your actual action and payload
        });
      }
    };

    getallexpenses();
  }, []);

  console.log("All expenses", expenses);
  return (
    <>
      {expensess.map((ex) => (
        <EXpense key={ex._id} expense ={ex} />
      ))}
    </>
  );
};

export default ShowExpense;
