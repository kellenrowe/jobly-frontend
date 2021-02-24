import JobCard from "./JobCard";
import "./cards.css";

/** Renders JobCardList component 
 * 
 *  Prop:
 *  - jobs is an array of job objects of either
 *      [{ id, title, salary, equity }, ...]  from CompanyDetail or
 *      [{ id, title, salary, equity, companyHandle, companyName }, ...] 
 *          from JobCardList
 *  - userJobs is an array of job ids that the user has applied to like
 *      [ id, ...]
 *  - updateJobs is a fn passed down by parent to update user's joblist
 * 
 *  { CompanyDetail, JobList } -> JobCardList -> JobCard
 *  */

function JobCardList({ jobs, userJobs, applyToJob }) {
  console.log('userJobs :>> ', userJobs);
  // Loop through each job in the jobs array and identify if job isApplied
  // to create JobCard for each job
  const showJobs = jobs.map(job => {
    let isApplied = false;
    if (userJobs.length !== 0) {
      isApplied = userJobs.includes(job.id);
    }

    return (
      <div className="jobCard col-10 col-sm-8 col-md-6 mx-auto mt-3 px-3 py-3" key={job.id}>
        <JobCard job={job} isApplied={isApplied} applyToJob={applyToJob} />
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