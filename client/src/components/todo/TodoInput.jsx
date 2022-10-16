import styled from "styled-components";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import { useRef } from "react";
import { CreateTodo } from "../../utils/apis/todoApi.js";

const TodoInput = ({ setTodos }) => {
  const todoRef = useRef(null);

  const TodoInputHandler = (e) => {
    e.preventDefault();
    const todoForm = {
      todo: todoRef.current.value,
    };
    CreateTodo({ todoForm }).then((data) => {
      setTodos((prev) => [...prev, data]);
      todoRef.current.value = "";
      todoRef.current.focus();
    });
  };

  return (
    <Container>
      <label className="label" htmlFor="todoinput">
        할 일을 등록하세요!
      </label>
      <Input
        width="300px"
        height="35px"
        id="todoinput"
        type="text"
        placeholder="할 일을 적어주세요."
        ref={todoRef}
      ></Input>
      <Button text="등록" mode="GREEN" onSubmit={TodoInputHandler}></Button>
    </Container>
  );
};

const Container = styled.form`
  width: 500px;
  height: 100px;
  border: 1px solid red;
`;

export default TodoInput;
