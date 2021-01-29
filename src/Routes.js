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
 *  - user: object with current user data
 *  - signupUser: fn passed from parent (App) to sign up user data
 *  - loginUser: fn passed from parent (App) to login user data
 *  - updateUser: fn passed from parent (App) to update user data
 *  - applyToJob: fn passed from parent (App) to apply to a job
 * 
 *  App -> Routes -> { Homepage, CompanyList, CompanyDetail, JobList, 
 *                      LoginForm, SignupForm, ProfileForm }
*/
function Routes({ user, signupUser, loginUser, updateUser, applyToJob }) {

  // Grab job ids that user has applied to 
  const userJobs = user
    ? user.applications
    : [];

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        <CompanyList />
      </Route>
      <Route exact path="/companies/:handle">
        {/* TODO: add ternary security here */}
        <CompanyDetail userJobs={userJobs} applyToJob={applyToJob} />
      </Route>
      <Route exact path="/jobs">
        <JobList userJobs={userJobs} applyToJob={applyToJob} />
      </Route>
      <Route exact path="/login">
        <LoginForm loginUser={loginUser} />
      </Route>
      <Route exact path="/signup">
        <SignupForm signupUser={signupUser} />
      </Route>
      <Route exact path="/profile">
        <ProfileForm updateUser={updateUser} user={user} />
      </Route>
      {/* 404 handler */}
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;