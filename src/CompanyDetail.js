import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";

/** Renders CompanyDetail component for company using handle
 *
 *  Props:
 *  - company: object like -
 *  { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *  - userJobs is an array of jobs that the user has applied to like
 *      [{ id, title, salary, equity }, ...]
 *  - updateJobs is a fn passed down by parent to update user's joblist
 * 
 *  State:
 *  - isLoading: Boolean value w/ default of true
 *  - company: object like
 *    { handle, name, description, numEmployees, logoUrl, jobs }
 *
 *  Routes -> CompanyDetail -> JobCardList
 *  */

function CompanyDetail({ userJobs, updateJobs }) {
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  // console.log('handle = ', handle);

  useEffect(function fetchCompanyOnRender() {
    async function fetchCompany() {
      try {
        const resp = await JoblyApi.getCompany(handle);
        setCompany(resp);
        setIsLoading(false);
      } catch (err) {
        // NOTE: why isn't this working?
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
// NOTE: bad param isnt handled ALSO handle no key for child
  return (
    <div className="CompanyDetail">
      {showJobs}
    </div>
  );
}

export default CompanyDetail;
