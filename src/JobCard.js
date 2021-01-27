
/** Renders JobCard component
 * 
 *  Prop:
 *  - isApplied is a Boolean value
 *      true, if user has applied to the job
 *      false, otherwise
 *  - job is an object of either 
 *      { id, title, salary, equity } from CompanyDetail or
 *      { id, title, salary, equity, companyHandle, companyName } from JobList
 *  - updateJobs is a fn passed down by parent to update user's joblist
 *  
 */

function JobCard({ job, isApplied, updateJobs }) {
  console.debug("rendering JobCard ", job);

  function handleClick(evt) {
    updateJobs(job.id);
  }

  const showButton = ((!isApplied)
    ? <button onClick={handleClick}>APPLY</button>
    : <button >APPLIED</button>
  );

  return (
    <div className="JobCard">
      <h2>{job.title}</h2>
      {(job.companyHandle) ? <h3>{job.companyName}</h3> : null}
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      {showButton}
    </div>
  );

}

export default JobCard;