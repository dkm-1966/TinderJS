import { FC } from "react";
import { Link } from "react-router";
import { routes } from "../router/routes";

const Header: FC = () => {
  return (
    <header className="fixed w-full shadow-md flex justify-between items-center p-8 z-10 bg-blue-200">
      <Link to={routes.MAIN}>TinderJS</Link>
      <nav>
        <ul className="flex gap-4">
          <li className="text-pink-500 hover:text-pink-400 duration-200">
            <Link to={routes.USER_PROFILE}>Profile</Link>
          </li>
          <li className="text-pink-500 hover:text-pink-400 duration-200">
            <Link to={routes.FEEDS}>LoveFinder</Link>
          </li>
          <li className="text-pink-500 hover:text-pink-400 duration-200">
            <Link to={routes.MATCHES}>MyCouples</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
