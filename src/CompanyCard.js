import "./CompanyCard.css";

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