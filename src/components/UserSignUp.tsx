import React, { useRef, useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function UserSignUp() {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const auth = getAuth();

    e.preventDefault();

    if (
      (passwordRef.current?.value as string) !==
      (confirmPasswordRef.current?.value as string)
    ) {
      setErrorMsg("Passwords do not match");
    }

    createUserWithEmailAndPassword(
      auth,
      emailRef.current?.value as string,
      passwordRef.current?.value as string,
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMsg("email in use");
        }
      });
  };

  return (
    <>
      {errorMsg && (
        <button
          className=" flex m-auto mt-10  bg-red-600 p-4 rounded-2xl"
          onClick={() => setErrorMsg("")}
        >
          {errorMsg}
        </button>
      )}

      <form
        action=""
        className="flex flex-col gap-3 h-screen text-xl p-12 max-w-lg ml-auto mr-auto"
      >
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          ref={usernameRef}
          required={true}
          className="border-2 rounded-lg p-3"
        />
        <input
          type="email"
          name="email"
          id="username"
          placeholder="Email"
          ref={emailRef}
          required={true}
          className="border-2 rounded-lg p-3"
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
          required={true}
          className="border-2 rounded-lg p-3"
        />
        <input
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          ref={confirmPasswordRef}
          required={true}
          className="border-2 rounded-lg p-3"
        />
        <button
          type="submit"
          className="border-2 rounded-full p-3 bg-blue-600"
          onClick={(e) => handleSubmit(e)}
        >
          Sign up
        </button>
      </form>
    </>
  );
}

export default UserSignUp;
