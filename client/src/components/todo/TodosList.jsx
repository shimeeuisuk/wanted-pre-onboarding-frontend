import TodoBox from "./TodoBox.jsx";
import styled from "styled-components";
import { useState } from "react";

const TodoList = ({ todos, setTodos }) => {
  return (
    <Container>
      {todos.map((el, i) => {
        return (
          <TodoBox key={i} el={el} id={el.id} setTodos={setTodos}></TodoBox>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  border: 1px solid blue;
`;
export default TodoList;
