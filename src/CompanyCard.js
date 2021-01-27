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
    <div className="CompanyCard">
      <h2>{company.name}</h2>
      {/* TODO: update company logo */}
      <img src={company.logoUrl} alt="logo" />
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyCard;