import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/InputForm";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null) {
      setAuthChecked(true);
      navigate("/login");
    }
  }, [navigate]);

  if (!authChecked) {
    return (
      <div className="flex justify-center content-center h-screen bg-blue-300">
        <h1 className="animate-bounce text-4xl items-center self-center ">
          Loading...
        </h1>
      </div>
    );
  }

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
