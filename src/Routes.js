import { Switch, Redirect, Route } from "react-router-dom";

import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

/** Renders Routes component. 
 * 
 *  Props: 
 *  - updateUser: fn passed from parent to update user data
 *  - user: object with current user data
 * 
 *  App -> Routes -> { Homepage, CompanyList, CompanyDetail, JobList, 
 *                      LoginForm, SignupForm, ProfileForm }
*/
function Routes({ user, applyToJob }) {
  let profileInfo = {};

  // temp hack meant to generate user data for profileForm
  if (user) {
    Object.keys(user).forEach(key => { 
      if (key !== "jobs") return profileInfo[key] = user[key];
    });
    // console.log('profileInfo in routes = ', profileInfo)
  }

  // TODO: pass userJobs and updateJobs fn from App

  let userJobs = [];

  /** update jobs-applied-to for current user */
  function updateJobs(jobId){
    console.log("updateJobs called on ", jobId);
  }


return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetail userJobs={userJobs} updateJobs={updateJobs}/>
      </Route>
      <Route exact path="/jobs">
        <JobList userJobs={userJobs} updateJobs={updateJobs}/>
      </Route>
      <Route exact path="/login">
      //NOTE: app should have specific login function which we pass to login
        <LoginForm updateUser={updateUser}/>
      </Route>
      <Route exact path="/signup">
        <SignupForm updateUser={updateUser}/>
      </Route>
      <Route exact path="/profile">
        <ProfileForm updateUser={updateUser} user={profileInfo}/>
      </Route>
    {/* 404 handler */}
      <Redirect to="/" />
    </Switch>
);
}

export default Routes;