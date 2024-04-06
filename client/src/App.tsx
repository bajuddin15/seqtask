import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const authToken = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authToken ? <HomePage /> : <LoginPage />} />
        <Route
          path="/register"
          element={authToken ? <HomePage /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={authToken ? <HomePage /> : <LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
