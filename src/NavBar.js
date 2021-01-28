import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";

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

  const navbar =
    Object.keys(user).length !== 0 ? (
      <div className="container">
        <NavLink exact to="/" className="navbar-brand font-weight-bold">
          Jobly
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <NavLink to="/companies" className="nav-link">
                Companies
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/jobs" className="nav-link">
                Jobs
              </NavLink>
            </li>
            <li class="nav-item dropdown">
              <NavLink exact to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/" onClick={handleClick} className="nav-link font-weight-normal">
                {" "}
                Logout {user.firstName}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="container">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );

  return (
    <nav className="NavBar navbar navbar-expand-lg navbar-light bg-light">
      {navbar}
    </nav>
  );
}

export default NavBar;
