import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

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
    <nav className="flex justify-start p-6 gap-2 text-2xl bg-slate-600 p-4">
      <Link to="/">BudgetPal</Link>

      <ul
        className={`sm:flex ml-auto ${
          showMenu ? "flex flex-col mt-10" : "hidden"
        }`}
      >
        <li>
          <Link to="/form">Add expense</Link>
        </li>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
      </ul>
      <GiHamburgerMenu
        className="sm:hidden text-3xl ml-auto"
        onClick={() => setShowMenu((prevState) => !prevState)}
      />
    </nav>
  );
}

export default Navbar;
