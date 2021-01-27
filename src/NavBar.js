import { NavLink } from "react-router-dom";
import "./NavBar.css"

/** Renders NavBar component. */

function NavBar({user }){

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Jobly</NavLink>
      {/* NOTE: in ternary */}
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      <NavLink to="/">
        <button >Logout</button>
      </NavLink>
    </nav>
  );
}

export default NavBar;