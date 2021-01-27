import './App.css';
import "bootstrap/dist/css/bootstrap.css";

// TODO: import functions from api.js
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";

/** Renders Jobly App
 * 
 *  state:
 *  - user: object like -
 *  { username, 
 *    firstName, 
 *    lastName, 
 *    isAdmin, 
 *    jobs
 *  } 
 *  where jobs is array of job objects like:
 *  { id, title, companyHandle, companyName, state }
 * 
 *  App -> { NavBar, Routes }
 */
function App() {
  // TODO: state: user
  const [user, setUser] = useState()
  console.log('App rendering: User = ', user);

  function updateUser(newUser) {
    setUser(newUser);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user}/>
        <Routes updateUser={updateUser} user={user}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
