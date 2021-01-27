import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "./api";
/** Renders CompanyDetail component
 *
 *  Props:
 *  - company: object like -
 *  { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *  - userJobs is an array of jobs that the user has applied to like
 *      [{ id, title, salary, equity }, ...]
 *  - updateJobs is a fn passed down by parent to update user's joblist
 *
 *  Routes -> CompanyDetail
 *  */

import JobCardList from "./JobCardList";

function CompanyDetail({ userJobs, updateJobs }) {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  console.log('handle = ', handle);

  useEffect(function fetchCompanyOnRender() {
    async function fetchCompany() {
      try {
        const resp = await JoblyApi.getCompany(handle);
        setCompany(resp);
        setIsLoading(false);
      } catch(err) {
        <Redirect to="/companies" />
      }
    }
    fetchCompany();
  }, [handle]);

  if (isLoading) return <i>Loading...</i>;

  const showJobs = company
    ? <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <JobCardList
        jobs={company.jobs}
        userJobs={userJobs}
        updateJobs={updateJobs}
      />
    </div>
    : `No jobs for this company`;

  return (
    <div className="CompanyDetail">
      {showJobs}
    </div>
  );
}

export default CompanyDetail;
