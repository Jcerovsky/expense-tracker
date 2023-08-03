import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/InputForm";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";

function App() {
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser === null && window.location.pathname !== "/signup") {
      navigate("/login");
      setAuthChecked(true);
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const signout = async () => {
    await auth.signOut();
  };

  if (!authChecked) {
    return (
      <div className="flex justify-center content-center h-screen bg-blue-300">
        <h1 className="animate-bounce text-4xl items-center self-center ">
          <LoadingScreen />
        </h1>
      </div>
    );
  }

  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/signup"
  ) {
    signout().then();
    console.log("signed out");
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {auth.currentUser && <Route path="/" element={<Home />} />}
        <Route path="/form" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/test" element={<LoadingScreen />}></Route>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
