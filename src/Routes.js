import { Switch, Redirect, Route } from "react-router-dom";


import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

/** Renders Routes component. */
function Routes({ updateUser, user }) {
  let profileInfo = {};

  if (user) {
    Object.keys(user).map(key => { 
      if (key !== "jobs") {
        return profileInfo[key] = user[key];
      }
    });
    console.log('profileInfo in routes = ', profileInfo)
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
        <CompanyDetail />
      </Route>
      <Route exact path="/jobs">
        <JobList />
      </Route>
      <Route exact path="/login">
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