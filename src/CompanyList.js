import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import JoblyApi from "./api";

import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

/** Renders CompanyList component 
 *  Routes -> CompanyList 
 *  */

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState({});
  // console.log("rendering companies = ", companies);

  function search(userInput) {
    console.log('entered search in parent, userInput = ', userInput);
    setSearchTerm(userInput);
  }

  // TODO: need filter function from API to show companies

  useEffect(function fetchAllCompaniesOnRender() {
    // console.debug("effect beg all companies = ", companies);
    async function fetchAllCompanies() {
      console.log('searchTerm = ', searchTerm);
      const companies = await JoblyApi.getAllCompanies(searchTerm);
      // console.log("companies = ", companies);
      setCompanies(companies);
      setIsLoading(false);
    }
    fetchAllCompanies();
    // console.debug("effect end all companies = ", companies);
  }, [searchTerm]);

  if (isLoading) return <i>Loading...</i>

  let showCompanies = "no companies";

  if (companies){
    showCompanies = companies.map(c =>
      (
        <div key={c.handle}>
          <Link to={`/companies/${c.handle}`}>
           <CompanyCard company={c} />
          </Link>
        </div>
      )
    );
  }

  return (
    <div className="CompanyList">
      <SearchForm search={search} />
      {showCompanies}
    </div>
  );
}

export default CompanyList;