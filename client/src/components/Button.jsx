import styled from "styled-components";

const COLOR = {
  ORANGE: {
    bgcolor: "var(--org)",
    ftcolor: "var(--white)",
  },
  GREEN: {
    bgcolor: "var(--grn)",
    ftcolor: "var(--white)",
  },
};

function Button({
  mode,
  shadow,
  text,
  ftsize,
  padding,
  type,
  disabled,
  onSubmit,
}) {
  const { bgcolor, ftcolor } = COLOR[mode];
  return (
    <Container
      ftcolor={ftcolor}
      bgcolor={bgcolor}
      shadow={shadow}
      ftsize={ftsize}
      padding={padding}
      type={type}
      disabled={disabled ?? false}
      onClick={onSubmit}
    >
      {text}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.ftcolor};
  padding: ${(props) => props.padding || "6px 12px"};
  border-radius: 50px;
  font-size: ${(props) => props.ftsize || "var(--reg)"};
  cursor: pointer;
  border: none;
  box-shadow: ${(props) => props.shadow};
`;

export default Button;
