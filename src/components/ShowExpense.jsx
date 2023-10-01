import React from "react";
import EXpense from "./EXpense";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { addexpenses, emptyExpenses } from "../redux/infoRedux";
import Loading from "./Loading";
const ShowExpense = () => {
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState([]);
  const expensess = useSelector((state) => state.info.expenses);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getallexpenses = async () => {
      try {
        const res = await userRequest.get("/todo/get");
        console.log(res);
        // console.log(res.data.reponse.status);
        if (res.data.response?.status == 401) {
          console.log("Unauthorized");
        } else {
          console.log("authorized");
        }
        const todos = res.data.data.todos;
        if (todos) {
          for (let todo in todos) setExpenses(expenses.concat(todo));
          console.log("empty product");
          dispatch(emptyExpenses());

          todos.forEach((todo) => {
            console.log("This is user specific each data", todo);
            dispatch(addexpenses(todo)); // Replace with your actual action and payload
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log();
    getallexpenses();
  }, []);

  console.log("All expenses", expensess);
  return (
    <>
      <div>
        {expensess.map((ex) => (
          <EXpense key={ex._id} expense={ex} />
        ))}
      </div>
    </>
  );
};

export default ShowExpense;
