import { useState } from "react";

/** Renders LoginForm component
 *  Routes -> LoginForm
 *  */

function LoginForm({ updateUser }) {
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
    <form className="LoginForm mx-auto" onSubmit={handleSubmit}>
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

      </div>
      <div>
        <button>Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;