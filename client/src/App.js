import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import GlobalStyle from "./styles/globalstyles";
import "./styles/root.css";
import LogIn from "../src/pages/LogIn";
import TodoList from "../src/pages/TodoList";
import { getToken } from "./utils/localstorage";

function App() {
  const token = getToken();

  return (
    <>
      <GlobalStyle />
      {token && <Navigate to="/todo" />}
      <Routes>
        <Route path="/" ren element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/todo" element={<TodoList />}></Route>
      </Routes>
    </>
  );
}

export default App;
