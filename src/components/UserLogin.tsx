import React from "react";

function UserLogin() {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("logged in");
  };

  return (
    <div className="flex justify-center">
      <form action="">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required={true}
          className="border-2 rounded-lg block"
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          required={true}
          className="border-2 rounded-lg block"
        />
        <button
          type="submit"
          className="border-2 rounded-lg block"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
