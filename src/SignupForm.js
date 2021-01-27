import { useState } from "react";

/** Renders SignupForm component
 *  Routes -> SignupForm
 *  */

function SignupForm({ updateUser }) {
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
    updateUser(formData);
    setFormData(initialState);
  }

  return (
    <form className="SignupForm mx-auto" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          className="form-control"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          className="form-control"
          onChange={handleChange}
        />

      </div>
      <div>
        <button>Sign Up!</button>
      </div>
    </form>
  );
}

export default SignupForm;
