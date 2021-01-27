import { useState } from "react";

/** Renders SearchForm component
 *  Routes -> SearchForm
 *  */

function SearchForm({ search }) {
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
    console.log('formData = ', formData);
    search(formData);
    setFormData(initialState);
  }

  return (
    <form className="ProfileForm mx-auto" onSubmit={handleSubmit}>
      <div className="form-group">
        
        <input
          placeholder="Enter search term.."
          name="name"
          className="form-control"
          onChange={handleChange}
        />
        <button className="btn btn-lg btn-primary">Search</button>
      </div>
    </form>
  );
}

export default SearchForm;