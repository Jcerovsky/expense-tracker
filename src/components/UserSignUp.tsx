import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function UserSignUp() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");
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
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("Account with this email already exists");
        }
      });
  };

  return (
    <>
      {errorMsg && (
        <div className="flex justify-center">
          <div className=" mt-10 bg-red-600 p-6 rounded-md relative inline-block text-center">
            {errorMsg}
            <button
              className="absolute top-1 right-1 p-1 bg-red-300 rounded-2xl w-5 h-5 flex justify-center items-center text-sm"
              onClick={() => setErrorMsg("")}
            >
              <span>X</span>
            </button>
          </div>
        </div>
      )}

      <form
        action=""
        className="flex flex-col gap-4 h-screen text-xl p-12 max-w-lg ml-auto mr-auto"
      >
        <h1 className="text-center text-4xl">Sign up</h1>
        <p className="text-sm">
          Already a member?{" "}
          <a href="/signin" className="underline text-blue-700">
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
    </>
  );
}

export default UserSignUp;
