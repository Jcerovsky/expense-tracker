function UserLogin() {
  return (
    <div className="flex justify-center align-center">
      <form action="">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-2 rounded-lg block"
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          className="border-2 rounded-lg block"
        />
        <button className="border-2 rounded-lg block">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
