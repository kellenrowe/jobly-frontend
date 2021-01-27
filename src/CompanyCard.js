

/** renders company card
 * 
 */
function CompanyCard({ company }) {
console.log("rendering CompanyCard ", company);
  return (
    <div className="CompanyCard">
      <h2>{company.title}</h2>
      <img src="" alt="logo" ></img>
      <p>{company.description}</p>
    </div>
  );

}

export default CompanyCard;