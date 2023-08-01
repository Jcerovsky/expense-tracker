import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/InputForm";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { UserContext } from "./context/UserContext";
import Dashboard from "./components/Dashboard";

function App() {
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    if (
      auth.currentUser === null &&
      window.location.pathname !== "/signup" &&
      context?.userId !== null
    ) {
      setAuthChecked(true);
      navigate("/login");
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  if (!authChecked) {
    return (
      <div className="flex justify-center content-center h-screen bg-blue-300">
        <h1 className="animate-bounce text-4xl items-center self-center ">
          <LoadingScreen />
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
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/test" element={<LoadingScreen />}></Route>
      </Routes>
    </div>
  );
}

export default App;
