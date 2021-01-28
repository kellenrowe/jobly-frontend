import './App.css';
import "bootstrap/dist/css/bootstrap.css";

import JoblyApi from "./api";

import { useState, useEffect } from "react";
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
  // NOTE: Question about number of states?
  const [user, setUser] = useState({});
  const [userInputs, setUserInputs] = useState({});
  // const [appliedJob, setAppliedJob] = useState({});
  const [token, setToken] = useState("");
  const [error, setError] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // const [isApplying, setIsApplying] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  JoblyApi.token = token;
  // console.log('App rendering: User = ', user);

  /** Sign up user by using provided userData */
  // currUser includes { username, password, firstName, lastName, email }
  function signupUser(userInputs) {
    setUserInputs(userInputs);
    setIsSigningUp(true);
  }

  /** Login user by using provided userData */
  // userData { username, password }
  function loginUser(userInputs) {
    setUserInputs(userInputs);
    setIsLoggingIn(true);
  }

  /** Login user by using provided userData */
  // userData { username, password }
  function updateUser(userInputs) {
    setUserInputs(userInputs);
    setIsUpdating(true);
  }

  /** Logout user by returning user to initialState */
  function logoutUser() {
    setUser({});
    setUserInputs({});
    setToken("")
    // setIsSuccess(false);
  }

  /** Adds job applied to user */
  function applyToJob(jobId) {
    //TODO: move to useEffect
    console.log("applied to ", jobId);
    // setAppliedJob(jobId);
      // setIsApplying(true);
  }

  /** get a token for login, register, or updated profile of user with userinnputs */
  useEffect(function fetchTokenOnRender() {
    // console.debug("effect beg token = ", token);
    async function fetchToken() {
      let resp;
      try {
        if (isSigningUp === true) {
          resp = await JoblyApi.signupUser(userInputs);
          // setIsSuccess(true);
        }
        if (isLoggingIn === true) {
          resp = await JoblyApi.loginUser(userInputs);
          // setIsSuccess(true);
        } 
      } catch (err) {
        setError(err);
      }
      setToken(resp);
      setIsSigningUp(false);
      setIsLoggingIn(false);
    }
    fetchToken();
  }, [userInputs]);

  /** get user information for current username */
  useEffect(function fetchUserOnRender() {
    // console.debug("effect beg user = ", user);
    async function fetchUser() {
      try {
        if (isUpdating === false) {
          const newUser = await JoblyApi.getUser(userInputs.username);
          setUser(newUser);
        }
      } catch (err) {
        setError(err);
      }
    }
    fetchUser();
  }, [token, isUpdating]);

  /** update user when profile form is submitted  */
  useEffect(function fetchUserOnProfileUpdate() {
    // console.debug("effect beg user = ", user);
    async function fetchUserProfileUpdate() {
      try {
        await JoblyApi.updateUser(userInputs);
      } catch (err){
        setError(err);
      }
      setIsUpdating(false);
    }
    fetchUserProfileUpdate();
  }, [userInputs]);

  /** apply to job if user clicks on "apply" button */
  // useEffect(function applyToJobOnClick() {
  //   // console.debug("effect beg user = ", user);
  //   async function applyToJob() {
  //     let resp;
  //     try {
  //       resp = await JoblyApi.applyToJob(user.username, appliedJob);
  //     } catch (err) {
  //       setError(err);
  //     }

  //   }
  //   fetchUpdatedUser();
  // }, [isApplying]);


  // TODO:
  if (error) console.log(error);

  //   // TODO:
  //   if (isSuccess) // DO something


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
