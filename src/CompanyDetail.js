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
 *  - applyToJob is a fn passed down by parent to update user's joblist
 * 
 *  State:
 *  - isLoading: Boolean value w/ default of true
 *  - isError: Boolean value w/ default of false
 *  - company: object like
 *    { handle, name, description, numEmployees, logoUrl, jobs }
 *
 *  Routes -> CompanyDetail -> JobCardList
 *  */

function CompanyDetail({ userJobs, applyToJob }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [company, setCompany] = useState({});
  const { handle } = useParams();

  // console.log('handle = ', handle);

  useEffect(function fetchCompanyOnRender() {
    async function fetchCompany() {
      let resp;
      try {
        resp = await JoblyApi.getCompany(handle);
        // console.log("resp = ", resp);
      } catch (err){
        // console.log("err", err);
        setIsError(true);
        // console.log("made it to error");
      } 
      setCompany(resp);
      setIsLoading(false);
    }
    fetchCompany();
  }, [handle]);

  if (isError) return <Redirect to="/companies" />;

  if (isLoading) return <i>Loading...</i>;

  const showJobs = company
    ? <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <JobCardList
        jobs={company.jobs}
        userJobs={userJobs}
        applyToJob={applyToJob}
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
