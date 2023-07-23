import React from "react";
import { FaGoogle } from "react-icons/fa";

function UserLogin() {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("logged in");
  };

  return (
    <div className="h-screen text-xl p-12 max-w-lg ml-auto mr-auto">
      <h1 className="mb-4">Sign in</h1>
      <form action="" className="flex flex-col gap-3  ">
        <input
          type="email"
          name="username"
          id="username"
          placeholder="Email"
          required={true}
          className="border-2 rounded-lg p-3"
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          required={true}
          className="border-2 rounded-lg p-3"
        />
        <button
          type="submit"
          className="border-2 rounded-full p-3"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>

      <div className="mt-6 mb-6 relative p-2 border-t border-gray-400">
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-white pl-4 pr-4">
          OR
        </span>
      </div>
      <button className="border-2 rounded-full p-3 flex items-center gap-2 justify-center w-full">
        <FaGoogle />
        Sign in with Google
      </button>
    </div>
  );
}

export default UserLogin;
