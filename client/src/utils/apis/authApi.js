import { authAPI } from "./instance";
import { addToken } from "../localstorage";

//회원가입
const SignUp = async ({ signupForm }) => {
  try {
    const result = await authAPI.post(`/auth/signup`, signupForm);
    console.log(result.data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

//로그인
const LogIn = async ({ loginForm }) => {
  try {
    const result = await authAPI.post(`/auth/signin`, loginForm);
    const access_token = result.data.access_token;
    addToken({ access_token });
  } catch (err) {
    console.log(err);
  }
};

export { SignUp, LogIn };
