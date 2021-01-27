import { useState } from "react";
import { useHistory } from "react-router-dom";

/** Renders LoginForm component
 *  Routes -> LoginForm
 *  */

function LoginForm({ updateUser }) {
  const initialState = {};
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

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
    history.push("/companies");
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