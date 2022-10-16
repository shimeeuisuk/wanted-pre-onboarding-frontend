import { authRequest } from "./instance";

//게시글 작성
export const CreateTodo = async ({ todoForm }) => {
  try {
    const result = await authRequest.post(`/todos`, todoForm);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//게시글 불러오기
export const GetTodos = async () => {
  try {
    const result = await authRequest.get(`/todos`);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//게시글 수정
export const UpdateTodo = async ({ updateTodoForm, id }) => {
  try {
    const result = await authRequest.put(`/todos/${id}`, updateTodoForm);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//게시글 삭제
export const DeleteTodo = async ({ id }) => {
  try {
    const result = await authRequest.delete(`/todos/${id}`);
  } catch (err) {
    console.log(err);
  }
};
