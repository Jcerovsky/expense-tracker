import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/InputForm";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<InputForm />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
