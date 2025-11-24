import {
  MdDashboard,
  MdWork,
  MdArticle,
  MdImage,
  MdBusiness,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function ListMenu({ horizontal = false }) {
  const menuClass = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition
    ${isActive ? "bg-purple-100 text-purple-600 font-semibold" : "text-purple-500 hover:bg-purple-50 hover:text-purple-600"}`;

  const wrapperClass = horizontal
    ? "flex space-x-4"
    : "flex flex-col space-y-3";

  return (
    <ul className={wrapperClass}>
      <li>
        <NavLink to="/" className={menuClass}>
          <MdDashboard className="text-blue-400 text-lg" />
          {!horizontal && <span>Dashboard</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/job" className={menuClass}>
          <MdWork className="text-purple-400 text-lg" />
          {!horizontal && <span>Jobs</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className={menuClass}>
          <MdArticle className="text-green-400 text-lg" />
          {!horizontal && <span>Blog</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/slider" className={menuClass}>
          <MdImage className="text-yellow-400 text-lg" />
          {!horizontal && <span>Sliders</span>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/company" className={menuClass}>
          <MdBusiness className="text-pink-400 text-lg" />
          {!horizontal && <span>Companies</span>}
        </NavLink>
      </li>
    </ul>
  );
}
