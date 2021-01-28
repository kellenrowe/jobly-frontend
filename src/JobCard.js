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
    ? <button onClick={handleClick}>APPLY</button>
    : <button >APPLIED</button>
  );

  const showCompanyName = job.companyHandle
    ? job.companyName
    : null;

  return (
    <div className="JobCard">
      <h2>{job.title}</h2>
      {showCompanyName}
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      {showButton}
    </div>
  );
}

export default JobCard;