import { NavLink } from "react-router-dom";
import "./NavBar.css"

/** Renders NavBar component. 
 *  TODO: update docstring
 *  props:
 *  - user: object containing data for current user
 */
function NavBar({ user, signupUser, loginUser, logoutUser }){

//NOTE: logout should be logout function, not just update user to null

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Jobly</NavLink>
      {/* NOTE: in ternary once we have user data */}
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