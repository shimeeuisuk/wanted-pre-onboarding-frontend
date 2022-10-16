import styled from "styled-components";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    { width, height, onChange, type, value, placeholder, id, bdcolor, checked },
    ref
  ) => {
    return (
      <>
        <Inputs
          placeholder={placeholder}
          width={width}
          height={height}
          id={id}
          type={type}
          bdcolor={bdcolor}
          onChange={onChange}
          value={value}
          ref={ref}
          checked={checked}
        ></Inputs>
      </>
    );
  }
);

const Inputs = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.bdcolor || "var(--blk)"};
  border-radius: 1rem;
`;

export default Input;
