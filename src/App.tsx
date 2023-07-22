import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/InputForm";
import UserLogin from "./components/UserLogin";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<InputForm />} />
        <Route path="/signin" element={<UserLogin />} />
      </Routes>
    </div>
  );
}

export default App;
