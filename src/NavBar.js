import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css"

/** Renders NavBar component. 
 *  TODO: update docstring
 *  props:
 *  - user: object containing data for current user
 */
function NavBar({ user, signupUser, loginUser, logoutUser }) {
  const history = useHistory();
  // console.log('user = ', user)
//NOTE: logout should be logout function, not just update user to null
  
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