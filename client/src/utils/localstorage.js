const addToken = ({ access_token }) => {
  localStorage.setItem("access_token", access_token);
};

const getToken = () => {
  const access_token = localStorage.getItem("access_token");
  return access_token;
};

const removeToken = () => {
  localStorage.removeItem("access_token");
};

export { addToken, getToken, removeToken };
