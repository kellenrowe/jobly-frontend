import "./JobCard.css";

/** Renders JobCard component
 * 
 *  Props:
 *  - job is an object of either (depending on which parent calls)
 *      { id, title, salary, equity } from grandparent CompanyDetail or
 *      { id, title, salary, equity, companyHandle, companyName } from 
 *        grandparent JobList
 *  - isApplied is a Boolean value
 *      true, if user has applied to the job
 *      false, otherwise
 *  - applyToJob is a fn passed down by parent to update user's joblist
 * 
 *  JobCardList -> JobCard 
 */

function JobCard({ job, isApplied, applyToJob }) {
  
  /** updates user's list of applied jobs */
  function handleClick(evt) {
    applyToJob(job.id);
  }

  const showButton = ((!isApplied)
    ? <button className="btn btn-danger mb-3 ml-3" onClick={handleClick}>APPLY</button>
    : <button className="btn btn-danger disabled mb-3 ml-3">APPLIED</button>
  );

  const showCompanyName = job.companyHandle
    ? <p className="ml-3 mb-4">
      {job.companyName}
      </p>
    : null;

  return (
    <div className="JobCard mx-auto mt-3">
      <h5 className="jobTitle ml-3 my-0 font-weight-bold">{job.title}</h5>
      {showCompanyName}
      <p className="ml-3 mb-0"><small>Salary: {job.salary}</small></p>
      <p className="ml-3 mb-0"><small>Equity: {job.equity}</small></p>
      <div className="text-right">
      {showButton}

      </div>
    </div>
  );
}

export default JobCard;