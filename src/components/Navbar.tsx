import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "../index.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
    <nav className="flex justify-start p-7 gap-2 md:text-xl lg:text-2xl bg-slate-600 p-4 ">
      <Link to="/" className="text-2xl hover:underline  ">
        BudgetPal
      </Link>

      <ul
        className={`sm:flex ml-auto gap-3  text-l cursor-pointer ${
          showMenu
            ? " h-screen w-full flex flex-col justify-center items-center gap-10 text-3xl"
            : "hidden"
        }`}
      >
        <li className="hover:underline hover:scale-90">
          <Link to="/form">Expenses</Link>
        </li>
        <li className="hover:underline hover:scale-90">
          <Link to="/form">Dashboard</Link>
        </li>
        <li className="hover:underline hover:scale-90">
          <Link to="/form">Add expense</Link>
        </li>
        <li className="hover:underline hover:scale-90">
          <Link to="/budget">Budget</Link>
        </li>
        <li className="hover:underline hover:scale-90">
          <Link to="/settings">Settings</Link>
        </li>
        <li className="hover:underline hover:scale-90">
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
      <GiHamburgerMenu
        className="sm:hidden text-3xl ml-auto cursor-pointer hover:scale-125"
        onClick={() => setShowMenu((prevState) => !prevState)}
      />
    </nav>
  );
}

export default Navbar;
