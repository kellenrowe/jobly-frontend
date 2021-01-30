import "./Homepage.css";

/** Renders Homepage component 
 *  Routes -> Homepage 
 *  */
function Homepage({ user }) {
  let greeting = user
    ? <h3>Welcome back {user.firstName}!</h3>
    : <h3>Welcome!</h3>
  return (
    <div className="Homepage">
      <div className="col-12 text-center">
        <h1 className="font-weight-bold"><b>Jobly</b></h1>
        <p>All the jobs in one, convenient place.</p>
        {greeting}
      </div>
    </div>
  );
}

export default Homepage;