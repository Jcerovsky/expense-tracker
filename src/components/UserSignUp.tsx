import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../context/UserContext";

function UserSignUp() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const context = useContext(UserContext);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const auth = getAuth();

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setErrorMsg("Passwords do not match");
    } else if (usernameRef.current && usernameRef.current.value.length < 4) {
      setErrorMsg("Username must be at least 4 characters long");
    }

    createUserWithEmailAndPassword(
      auth,
      emailRef.current?.value as string,
      passwordRef.current?.value as string,
    )
      .then((userCredential) => {
        context && context.setUserId(userCredential.user.uid);
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("Account with this email already exists");
        }
      });
  };

  return (
    <div className="bg-gray-100">
      <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />

      <form
        action=""
        className="flex flex-col gap-4 h-screen text-xl p-12 max-w-lg ml-auto mr-auto"
      >
        <h1 className="text-center text-4xl mb-6">Sign up</h1>
        <p className="text-sm">
          Already a member?{" "}
          <a href="/login" className="underline text-blue-700">
            Log in.
          </a>
        </p>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          ref={usernameRef}
          required={true}
          className="border-2 rounded-lg p-3 hover:bg-gray-100"
        />
        <input
          type="email"
          name="email"
          id="username"
          placeholder="Email"
          ref={emailRef}
          required={true}
          className="border-2 rounded-lg p-3 hover:bg-gray-100"
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
          required={true}
          className="border-2 rounded-lg p-3 hover:bg-gray-100"
        />
        <input
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required={true}
          className="border-2 rounded-lg p-3 hover:bg-gray-100"
        />
        <button
          className="border-0 rounded-full p-3 bg-blue-600 text-center hover:bg-blue-500"
          onClick={(e) => handleSubmit(e)}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default UserSignUp;
