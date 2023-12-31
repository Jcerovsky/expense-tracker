import React, { useRef, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { ErrorMessage } from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FirebaseError } from "firebase/app";

function UserLogin() {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const GoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        context && context.setUserId(result.user.uid);
        navigate("/");
      })
      .catch((err) => {
        context?.setErrorMessage(err);
      });
  };

  const fbProvider = new FacebookAuthProvider();
  const FacebookLogin = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        context && context.setUserId(result.user.uid);
      })
      .catch((err) => {
        context?.setErrorMessage(err);
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    context?.setErrorMessage("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        emailRef.current?.value as string,
        passwordRef.current?.value as string,
      );
      if (context) {
        context.setUserId(result.user.uid);
        navigate("/");
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.message === "Firebase: Error (auth/wrong-password).") {
          context?.setErrorMessage("Wrong password");
        }
      }
    }
  };

  return (
    <div className="h-screen text-xl p-12 max-w-lg ml-auto mr-auto ">
      <ErrorMessage
        errorMessage={context?.errorMessage}
        setErrorMessage={context?.setErrorMessage}
      />
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
        onClick={async () => {
          await FacebookLogin();
          await navigate("/");
        }}
      >
        <AiFillFacebook className="text-2xl text-blue-600" />
        Sign in with Facebook
      </button>
    </div>
  );
}

export default UserLogin;
