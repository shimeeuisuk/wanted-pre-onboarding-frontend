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
import { SignUp } from "../../utils/apis/authApi.js";

const SignupForm = () => {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

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

  const onChangePasswordCheck = (e) => {
    const passwordCheckValue = passwordCheckRef.current.value;
    const password = passwordRef.current.value;

    if (password !== passwordCheckValue) {
      setIsPasswordCheck(false);
      setPasswordConfirmMessage(ERROR_MSG_06);
    } else {
      setIsPasswordCheck(true);
      setPasswordConfirmMessage(SUCCESS_MSG_05);
    }
  };

  const SignUpHandler = (e) => {
    e.preventDefault();
    const signupForm = {
      email: emailRef.current.value,
      password: passwordCheckRef.current.value,
    };
    SignUp({ signupForm }).then(() => {
      navigate("/login");
    });
  };

  const FormBoxs = [
    {
      label: "?????????",
      id: "email",
      placeholder: "???????????? ???????????????.",
      onChange: onChangeEmail,
      msg: emailMessage,
      type: "text",
      ref: emailRef,
    },
    {
      label: "????????????",
      id: "password",
      placeholder: "??????????????? ???????????????.",
      onChange: onChangePassword,
      msg: passwordMessage,
      type: "password",
      ref: passwordRef,
    },
    {
      label: "???????????? ??????",
      id: "passwordCheck",
      placeholder: "??????????????? ?????? ??? ??????????????????.",
      onChange: onChangePasswordCheck,
      msg: passwordConfirmMessage,
      type: "password",
      ref: passwordCheckRef,
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
        disabled={!(isEmail && isPassword && isPasswordCheck)}
        onSubmit={SignUpHandler}
      />
      <div>
        <span>???????????? ????????????????</span>
        <span
          onClick={() => {
            navigate("/login");
          }}
        >
          ???????????????
        </span>
      </div>
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

export default SignupForm;
