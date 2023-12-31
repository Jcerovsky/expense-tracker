import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "../index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Loading from "./Loading";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth > 639 && setShowMenu(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="flex justify-start p-7 gap-2 md:text-xl lg:text-2xl bg-gradient-to-r from-teal-300 to-blue-500 p-4 sticky top-0 ">
      {user && user.photoURL && (
        <img
          src={user.photoURL || ""}
          className={`w-10 h-10 rounded-full ${showMenu ? "hidden" : ""}`}
          alt="user photo"
        />
      )}
      <Link
        to="/"
        className={`text-2xl self-center ${showMenu ? "hidden" : ""} `}
      >
        BudgetPal
      </Link>

      <ul
        className={`sm:flex ml-auto gap-3  text-l cursor-pointer  ${
          showMenu ? "gap-10 text-3xl mt-10" : "hidden"
        }`}
        onClick={() => setShowMenu(false)}
      >
        {user ? (
          <>
            <li className="hover:scale-90  rounded-lg p-1">
              <Link to="/">Expenses</Link>
            </li>
            <li className="hover:scale-90  rounded-lg p-1">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:scale-90  rounded-lg p-1">
              <Link to="/form">Add</Link>
            </li>

            <li
              className="hover:scale-90 rounded-lg p-1"
              onClick={async () => {
                await auth.signOut();
              }}
            >
              <Link to="/login">Sign Out</Link>
            </li>
          </>
        ) : (
          <li className="hover:scale-90">
            <Link to="/login">{loading ? <Loading /> : "Sign In"}</Link>
          </li>
        )}
      </ul>
      <GiHamburgerMenu
        className={`sm:hidden text-3xl ml-auto cursor-pointer hover:scale-105  ${
          showMenu ? "" : "self-center"
        }`}
        onClick={() => setShowMenu((prevState) => !prevState)}
      />
    </nav>
  );
}

export default Navbar;
