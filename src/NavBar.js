import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css"

/** Renders NavBar component. 
 *  
 *  Props:
 *  - user: object containing data for current user
 *  - logoutUser: fn passed down by parent (App) to handle logging out user
 * 
 *  App -> { NavBar, Routes }
 */
function NavBar({ user, logoutUser }) {
  const history = useHistory();

  /** Handle click for logging out a user and redirect to Homepage */
  function handleClick() {
    logoutUser();
    history.push("/");
  }

  const navbar = Object.keys(user).length !== 0
    ? <div>
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      <NavLink to="/">
        <button onClick={handleClick}>Logout {user.firstName}</button>
      </NavLink>
    </div>
    : <div>
      <NavLink exact to="/">Jobly</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Sign Up</NavLink>
    </div>

  return (
    <nav className="NavBar">
      {navbar}
    </nav>
  );
}

export default NavBar;