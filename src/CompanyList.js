import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import JoblyApi from "./api";

import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

/** Renders CompanyList component 
 *  Routes -> CompanyList 
 *  */

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState({});
  // TODO: Revisit companies - should be a state?

  function search(userInput) {
    setSearchTerm(userInput);
  }

  // TODO: need filter function from API to show companies

  useEffect(function fetchAllCompaniesOnRender() {
    console.debug("effect beg all companies = ", companies);
    async function fetchAllCompanies() {
      const result = await JoblyApi.getAllCompanies();
      console.log("result = ", result);
      setCompanies(result.companies);
      setIsLoading(false);
    }
    fetchAllCompanies();
    console.debug("effect end all companies = ", companies);
  }, []);

  if (isLoading) return <i>Loading...</i>
  
  const showCompanies = "no companies";

  if (companies){
    showCompanies = Object.values(companies).map(async function (c) {
      const result = await JoblyApi.getCompany(c.handle);
      let company = result.company;
      (
        <div>
          <Link to={`/companies/${company.name}`}>
            <CompanyCard company={company} />
          </Link>
        </div>
      )
    });
  }

  return (
    <div className="CompanyList">
      <SearchForm search={search} />
      {showCompanies}
    </div>
  );
}

export default CompanyList;