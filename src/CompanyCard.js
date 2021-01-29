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
  let image = company.logoUrl ? (
    <img src={company.logoUrl} alt="logo" className="compLogo" />
  ) : null;

  return (
    <div className="CompanyCard">
      <p className="compName font-weight-bold mt-3 position-relative">
        {company.name}
      </p>
      {image}
      <p className="compDescription">{company.description}</p>
    </div>
  );
}

export default CompanyCard;
