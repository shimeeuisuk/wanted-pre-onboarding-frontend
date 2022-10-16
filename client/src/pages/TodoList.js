import { useEffect, useState } from "react";
import TodoInput from "../components/todo/TodoInput.jsx";
import TodosList from "../components/todo/TodosList.jsx";
import { GetTodos } from "../utils/apis/todoApi.js";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    GetTodos().then((data) => {
      setTodos(data);
    });
  }, []);
  return (
    <div>
      <TodoInput setTodos={setTodos}></TodoInput>
      <TodosList setTodos={setTodos} todos={todos}></TodosList>
    </div>
  );
};

export default TodoList;
