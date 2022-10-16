import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteTodo, UpdateTodo } from "../../utils/apis/todoApi";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import { useRef, useState } from "react";

const TodoBox = ({ id, el, setTodos }) => {
  const [check, setCheck] = useState(el.isCompleted);
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(el.todo);

  const checkHandler = (e) => {
    setCheck((prev) => !prev);
    UpdateHandler(el.todo, !check);
  };

  const clickHandler = () => {
    setIsEdit(!isEdit);
  };

  const DeleteHandler = () => {
    setIsEdit(false);
    DeleteTodo({ id: el.id }).then(() =>
      setTodos((prev) => prev.filter((todo) => el.id !== todo.id))
    );
  };

  const UpdateHandler = (todo, isCompleted) => {
    const updateTodoForm = { todo, isCompleted };
    UpdateTodo({ updateTodoForm, id: el.id }).then(() => {
      setTodos((prev) => {
        const todo = prev.find((todo) => el.id === todo.id);
        todo.todo = updateTodoForm.todo;
        todo.isCompleted = updateTodoForm.isCompleted;
        return [...prev];
      });
    });
  };

  return (
    <Container>
      <Input
        id={id}
        type="checkbox"
        checked={check}
        onChange={checkHandler}
      ></Input>
      <label htmlFor={id}></label>
      {isEdit ? (
        <>
          <Input
            value={text}
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></Input>
          <Button
            text="수정"
            mode="ORANGE"
            onSubmit={() => {
              UpdateHandler(text, check);
              setIsEdit(false);
            }}
          />
          <Button
            text="취소"
            mode="GREEN"
            onSubmit={() => {
              setIsEdit(false);
            }}
          />
        </>
      ) : (
        <>{el.todo}</>
      )}

      <FontAwesomeIcon icon={faPen} onClick={clickHandler} />
      <FontAwesomeIcon icon={faTrash} onClick={DeleteHandler} />
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  border: 1px solid green;
  display: flex;
`;

export default TodoBox;
