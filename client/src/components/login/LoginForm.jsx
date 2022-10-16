import styled from "styled-components";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import { emailRegex, passwordRegex } from "../../constants/regex.js";
import {
  ERROR_MSG_02,
  ERROR_MSG_03,
  ERROR_MSG_06,
  SUCCESS_MSG_03,
  SUCCESS_MSG_04,
  SUCCESS_MSG_05,
} from "../../constants/message.js";
import { LogIn } from "../../utils/apis/authApi.js";

const LoginForm = () => {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeEmail = (e) => {
    const emailValue = emailRef.current.value;
    if (!emailRegex.test(emailValue)) {
      setIsEmail(false);
      setEmailMessage(ERROR_MSG_02);
    } else {
      setIsEmail(true);
      setEmailMessage(SUCCESS_MSG_03);
    }
  };
  const onChangePassword = (e) => {
    const passwordValue = passwordRef.current.value;
    if (!passwordRegex.test(passwordValue)) {
      setIsPassword(false);
      setPasswordMessage(ERROR_MSG_03);
    } else {
      setIsPassword(true);
      setPasswordMessage(SUCCESS_MSG_04);
    }
  };

  const LoginHandler = (e) => {
    e.preventDefault();
    const loginForm = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    LogIn({ loginForm }).then(() => {
      navigate("/todo");
    });
  };

  const FormBoxs = [
    {
      label: "이메일",
      id: "email",
      placeholder: "이메일을 입력하세요.",
      onChange: onChangeEmail,
      msg: emailMessage,
      type: "text",
      ref: emailRef,
    },
    {
      label: "비밀번호",
      id: "password",
      placeholder: "비밀번호를 입력하세요.",
      onChange: onChangePassword,
      msg: passwordMessage,
      type: "password",
      ref: passwordRef,
    },
  ];

  return (
    <Container>
      {FormBoxs.map((el, i) => {
        return (
          <FormBox key={i}>
            <label className="label" htmlFor={el.id}>
              {el.label}
            </label>
            <Input
              id={el.id}
              placeholder={el.placeholder}
              width="400px"
              height="35px"
              onChange={el.onChange}
              type={el.type}
              ref={el.ref}
            />
            {el.msg}
          </FormBox>
        );
      })}
      <Button
        text="Submit"
        mode="ORANGE"
        type="submit"
        disabled={!(isEmail && isPassword)}
        onSubmit={LoginHandler}
      />
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 700px;
  background-color: white;
  box-shadow: 0px 0px 10px lightgray;
`;
const FormBox = styled.div`
  .label {
    font-size: var(--s);
    color: var(--grn);
  }
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
`;

export default LoginForm;
