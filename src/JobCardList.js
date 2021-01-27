import JobCard from "./JobCard";


/** Renders JobCardList component 
 * 
 *  Prop:
 *  - jobs is an array of job objects of either
 *      [{ id, title, salary, equity }, ...]  from CompanyDetail or
 *      [{ id, title, salary, equity, companyHandle, companyName }, ...] from JobCardList
 *  - userJobs is an array of jobs that the user has applied to like
 *      [{ id, title, salary, equity }, ...]
 *  - updateJobs is a fn passed down by parent to update user's joblist
 * 
 *  Routes -> JobCardList 
 *  */

function JobCardList({ jobs, userJobs, updateJobs }) {
  console.debug("rendering JobCardList ", jobs);

  // Loop through each job in the jobs array and identify if job isApplied
  // to create JobCard for each job
  const showJobs = jobs.map(job => {
    let isApplied = userJobs.some(e => e.id === job.id);

    return (
      <div className="JobCardList-job">
        <JobCard job={job} isApplied={isApplied} updateJobs={updateJobs} />
      </div>
    );
  });

  return (
    <div className="JobCardList">
      {showJobs}
    </div>
  );
}

export default JobCardList;