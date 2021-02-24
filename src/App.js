import './App.css';
import "bootstrap/dist/css/bootstrap.css";

// NOTE: fix nav bold when active, homepage, buttons, color scheme

import JoblyApi from "./api";

import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Routes from "./Routes";

/** Renders Jobly App
 *  
 *  state:
 *  - user: object like -
 *      { username, 
 *        firstName, 
 *        lastName, 
 *        isAdmin, 
 *        applications
 *      } 
 *    where applications is array of job ids like:
 *      [ id, etc. ]
 *  - userInputs: object like 
 *      if signing up, { username, password, firstName, lastName, email}
 *      if logging in, { username, password }
 *      if updating user, { firstName, lastName, email, password } 
 *  - token: string of JWT token for user
 *  - error: array of error messages
 *  - isSigningUp: Boolean, true if user is signing up
 *  - isLoggingIn: Boolean, true if user is logging in
 *  - isUpdating: Boolean, true if user is updating
 * 
 *  App -> { NavBar, Routes }
 */
function App() {

  const [user, setUser] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [appliedJob, setAppliedJob] = useState({});
  const [token, setToken] = useState("");
  // const [error, setError] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  JoblyApi.token = token;

  /** Sign up user by using provided userData like
   *  { username, password, firstName, lastName, email } 
   *  */
  function signupUser(userInputs) {
    setUserInputs(userInputs);
    setIsSigningUp(true);
  }

  /** Login user by using provided userData like 
   *  { username, password }
   * */
  function loginUser(userInputs) {
    setUserInputs(userInputs);
    setIsLoggingIn(true);
  }

  /** TODO: Update user by using provided userData like
   *  { firstName, lastName, password, email }
   *  */
  function updateUser(userInputs) {
    // setUserInputs(userInputs);
    // setIsUpdating(true);
  }

  /** Logout user by returning user to initialState */
  function logoutUser() {
    setUser(null);
    setUserInputs({});
    setToken("");
    setIsLoggingIn(false);
    // setIsSuccess(false);
  }

  /** TODO: Adds job applied to user */
  function applyToJob(jobId) {
    console.log("applied to ", jobId);
    setAppliedJob(jobId);
    setIsApplying(true);
  }

  /** Get a token for login, register, or updated profile of user with userinnputs */
  useEffect(function fetchTokenOnRender() {
    async function fetchToken() {
      try {
        if (isSigningUp === true) {
          let resp = await JoblyApi.signupUser(userInputs);
          let newToken = resp.token;
          setToken(newToken);
          // setIsSuccess(true);
        }
        if (isLoggingIn === true) {
          let resp = await JoblyApi.loginUser(userInputs);
          let newToken = resp.token;
          setToken(newToken);
          // setIsSuccess(true);
        }
      } catch (err) {
        console.log(err);
      }
      setIsSigningUp(false);
    }
    fetchToken();
  }, [userInputs, isLoggingIn, isSigningUp]);

/** get user information for current username */
  useEffect(function fetchUserWhenUser() {
    async function fetchUser() {
      try {
        if (token.length !== 0) {
          const newUser = await JoblyApi.getUser(userInputs.username);
          setUser(newUser.user);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [token, userInputs.username]);

 /** apply to job if user clicks on "apply" button */
  useEffect(function applyToJobOnClick() {
    async function applyToJobInDatabase() {
      console.log('applying in db')
      try {
        await JoblyApi.applyToJob(user.username, appliedJob);
      } catch (err) {
        console.error("error", err);
      }
    }
    if (isApplying) {
      applyToJobInDatabase()
      // fetchUpdatedUser();
      setIsApplying(false);
    }
  }, [isApplying, appliedJob, user?.username]);


/** refresh user info after clicking apply */
  useEffect(function fetchUserWhenUserApplies() {
    async function fetchUserAfterApply() {
      console.log('applied job has changed :>> ');
      try {
        if (token.length !== 0) {
          console.log('getting user')
          const updatedUser = await JoblyApi.getUser(user?.username);
          setUser(updatedUser.user);
        }
      } catch (err) {
        console.error("error 2", err);
      }
    }
    fetchUserAfterApply();
    setAppliedJob(null);
  }, [appliedJob, token.length, user?.username]);

  /** update user when profile form is submitted  */
  // useEffect(function fetchUserOnProfileUpdate() {
  //   async function fetchUserProfileUpdate() {
  //     try {
  //       await JoblyApi.updateUser(userInputs);
  //     } catch (err){
  //       console.log(err);
  //     }
  //     setIsUpdating(false);
  //   }
  //   fetchUserProfileUpdate();
  // }, [userInputs]);


  // TODO: Show error messages to user
  // if (error) console.log("error = ", error);

  // TODO: Incorporate a message for successful login or register of user
  // if (isSuccess)

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user}
          logoutUser={logoutUser}
        />
        <Routes
          user={user}
          signupUser={signupUser}
          loginUser={loginUser}
          updateUser={updateUser}
          applyToJob={applyToJob}
          loggedIn={isLoggingIn}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;



// unkempt-quartz.surge.sh/ -> current URL

// re-deploy instructions:

//  REACT_APP_BASE_URL=https://my-jobly-app.herokuapp.com npm run build
//  cp build/index.html build/200.html

// - cd into build/
//  surge . jobly.kellen-rowe.com
