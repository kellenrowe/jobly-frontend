import "./CompanyCard.css";

import logo1 from "./logos/logo1.png";
import logo2 from "./logos/logo2.png";
import logo3 from "./logos/logo3.png";
import logo4 from "./logos/logo4.png";

/** Renders CompanyCard
 * 
 *  Props:
 *  - company: object like
 *  { handle, name, description, numEmployees, logoUrl, jobs }
 * 
 *  CompanyList -> CompanyCard
 */
function CompanyCard({ company }) {
// console.log("rendering CompanyCard ", company);
  return (
    <div className="CompanyCard border border-danger col-10 col-sm-8 col-md-6 mx-auto mt-3">
      <p className="compName font-weight-bold mt-3 position-relative">{company.name}</p>
      {/* TODO: update company logo */}
      <img src={company.logoUrl} alt="logo" className="compLogo"/>
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyCard;