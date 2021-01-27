import { useState } from "react";

/** Renders SearchForm component
 * 
 *  Prop:
 *  - updateSearch fn passed down by parent
 *  - inputName is a string of either "name" or "title" 
 *    (if searching by CompanyList or JobLIst, respectively)
 * 
 *  State: 
 *  - formData: input recieved from user
 * 
 *  { CompanyList, JobList } -> SearchForm
 *  */

function SearchForm({ updateSearch, inputName }) {
  const initialState = {};
  const [formData, setFormData] = useState(initialState);


  /** updates formData on change of input */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log('formData = ', formData);
    updateSearch(formData);
    setFormData(initialState);
  }

  return (
    <form className="ProfileForm mx-auto" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          placeholder="Enter search term.."
          name={inputName}
          className="form-control"
          onChange={handleChange}
        />
        <button className="btn btn-lg btn-primary">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;