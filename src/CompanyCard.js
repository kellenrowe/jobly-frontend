

/** renders company card
 * 
 */
function CompanyCard({ company }) {
// console.log("rendering CompanyCard ", company);
  return (
    <div className="CompanyCard">
      <h2>{company.name}</h2>
      {/* TODO: update company logo */}
      <img src={company.logoUrl} alt="logo" ></img>
      <p>{company.description}</p>
    </div>
  );

}

export default CompanyCard;