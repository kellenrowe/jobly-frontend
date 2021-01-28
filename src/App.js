import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import JoblyApi from "./api";

import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";

/** Renders Jobly App
 * TODO: update docstring
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
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});
  const [username, setUsername] = useState({});
  // console.log('App rendering: User = ', user);

  /** Register user by using provided userData */
  // userData includes { username, password, firstName, lastName, email }
  function signupUser(userData){
    setUsername(userData.username);
    setToken(JoblyApi.registerUser(userData));
  }
  
  /** Login user by using provided userData */
  // userData { username, password }
  function loginUser(userData){
    setUsername(userData.username);
    setToken(JoblyApi.loginUser(userData));
  }

   /** Login user by using provided userData */
  // userData { username, password }
  function updateUser(userData){
    
  }
  
  /** Logout user by returning user to initialState */
  function logoutUser(){
    setUser({});
    setToken("");
  }
  
  /** Adds job applied to user */
  function applyToJob(jobId){
    JoblyApi.applyToJob(username, jobId);
  }
  
  // TODO: for login AND TODO: register
  useEffect(function fetchTODO:OnRender() {
    // console.debug("effect beg user = ", user);
    async function TODO:() {
      const user = await JoblyApi.loginUser(userData);
      setUser(user);
    }
    fetchUser();
  }, [TODO:]);

  useEffect(function fetchUserOnRender() {
    // console.debug("effect beg user = ", user);
    async function fetchUser() {
      const user = await JoblyApi.getUser(username);
      setUser(user);
    }
    fetchUser();
  }, [token]);
  
  JoblyApi.token = token; 

  // function updateUser(newUser) {
  //   setUser(newUser);
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} 
          signupUser={signupUser} 
          loginUser={loginUser} 
          logoutUser={logoutUser} 
        />
        <Routes 
          user={user}
          signupUser={signupUser} 
          loginUser={loginUser} 
          updateUser={updateUser}
          applyToJob={applyToJob}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
