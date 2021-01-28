import { useEffect, useState } from "react";

import JoblyApi from "./api";

import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

/** Renders JobList component 
 * 
 *  Prop:
 *  - userJobs is an array of jobs that the user has applied to like
 *      [{ id, title, salary, equity }, ...]
 *  - applyToJob is a fn passed down by parent to update user's joblist
 * 
 *  State: 
 *  - searchTerm is a string input by user
 *  - isLoading is Boolean true when loading
 *  - jobs is the array of job objects from API request
 * 
 *  Routes -> JobList -> { SearchForm, JobCardList }
 *  */

function JobList({ userJobs, applyToJob }) {
  const [searchTerm, setSearchTerm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState({});
  // console.log("rendering jobs = ", jobs);

  function updateSearch(userInput) {
    // console.log('entered search in parent, userInput = ', userInput);
    setSearchTerm({ title: userInput });
  }

  useEffect(function fetchAllJobsOnRender() {
    // console.debug("effect beg all jobs = ", jobs);
    async function fetchAllJobs() {
      // console.log('searchTerm = ', searchTerm);
      const jobs = await JoblyApi.getAllJobs(searchTerm);
      // console.log("jobs = ", jobs);
      setJobs(jobs);
      setIsLoading(false);
    }
    fetchAllJobs();
  }, [searchTerm]);

  if (isLoading) return <i>Loading...</i>

  const showJobs = jobs
    ? <JobCardList 
      jobs={jobs}
      userJobs={userJobs}
      applyToJob={applyToJob}
      /> 
    : "no jobs";

  return (
    <div className="JobList">
      <SearchForm updateSearch={updateSearch} inputName="title"/>
      {showJobs}
    </div>
  );
}

export default JobList;