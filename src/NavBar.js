import { NavLink } from "react-router-dom";

/** Renders NavBar component. */

function NavBar(){

  return (
    <nav>
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      <NavLink to="/">
        <button>Logout</button>
      </NavLink>
    </nav>
  );
}

export default NavBar;