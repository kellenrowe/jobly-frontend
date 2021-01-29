import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import JoblyApi from "./api";

import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

import "./cards.css";

/** Renders CompanyList component
 *
 *  State:
 *  - searchTerm is a string input by user
 *  - isLoading is Boolean true when loading
 *  - companies is the array of company objects from API request
 *
 *  Routes -> CompanyList -> { CompanyCard, SearchForm }
 *  */

function CompanyList() {
  const [searchTerm, setSearchTerm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState({});

  function updateSearch(userInput) {
    setSearchTerm({ name: userInput });
  }

  useEffect(
    function fetchAllCompaniesOnRender() {
      async function fetchAllCompanies() {
        const companies = await JoblyApi.getAllCompanies(searchTerm);
        setCompanies(companies);
        setIsLoading(false);
      }
      fetchAllCompanies();
    },
    [searchTerm]
  );

  if (isLoading) return <i>Loading...</i>;

  let showCompanies = "no companies";

  if (companies) {
    showCompanies = companies.map((c) => (
      <div
        key={c.handle}
        className="compCard col-10 col-sm-8 col-md-6 mx-auto mt-3 px-4 py-4">
        <Link to={`/companies/${c.handle}`}>
          <CompanyCard company={c} />
        </Link>
      </div>
    ));
  }

  return (
    <div className="CompanyList">
      <SearchForm updateSearch={updateSearch} inputName="name" />
      {showCompanies}
    </div>
  );
}

export default CompanyList;
