import { authRequest } from "./instance";

//게시글 작성
const CreateTodo = async ({ todoForm }) => {
  try {
    const result = await authRequest.post(`/todos`, todoForm);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//게시글 불러오기
const GetTodos = async () => {
  try {
    const result = await authRequest.get(`/todos`);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//게시글 수정
const UpdateTodo = async ({ updateTodoForm, id }) => {
  try {
    const result = await authRequest.put(`/todos/${id}`, updateTodoForm);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//게시글 삭제
const DeleteTodo = async ({ id }) => {
  try {
    const result = await authRequest.delete(`/todos/${id}`);
  } catch (err) {
    console.log(err);
  }
};
