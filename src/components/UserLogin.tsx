import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { ErrorMessage } from "./ErrorMessage";

function UserLogin() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const googleProvider = new GoogleAuthProvider();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const GoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fbProvider = new FacebookAuthProvider();
  const FacebookLogin = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      emailRef.current?.value as string,
      passwordRef.current?.value as string,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMsg("Wrong password");
        }
      });
  };

  return (
    <div className="h-screen text-xl p-12 max-w-lg ml-auto mr-auto ">
      <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <h1 className="mb-4">Sign in</h1>
      <form action="" className="flex flex-col gap-3  ">
        <input
          type="email"
          name="email"
          id="email"
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
          required={true}
          ref={passwordRef}
          className="border-2 rounded-lg p-3 hover:bg-gray-100"
        />
        <button
          type="submit"
          className="border-2 rounded-full p-3 hover:bg-gray-100"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>
      <h1 className="mt-5">
        Don't have an account?
        <a
          href="/signup"
          className="underline ml-1 text-blue-700 hover:text-blue-900"
        >
          Sign up.
        </a>
      </h1>

      <div className="mt-6 mb-6 relative p-2 border-t border-gray-400">
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white pl-4 pr-4">
          OR
        </span>
      </div>
      <button
        className="border-2 rounded-full p-3 flex items-center gap-2 justify-center w-full hover:bg-gray-100"
        onClick={GoogleLogin}
      >
        <FcGoogle className="text-2xl" />
        Sign in with Google
      </button>
      <button
        className="border-2 rounded-full p-3 flex items-center gap-2 justify-center w-full mt-3 hover:bg-gray-100"
        onClick={FacebookLogin}
      >
        <AiFillFacebook className="text-2xl text-blue-600" />
        Sign in with Facebook
      </button>
    </div>
  );
}

export default UserLogin;
