import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./forms.css";

/** Renders LoginForm component
 *
 *  Props:
 *  - loginUser: fn passed from parent to update user data
 *
 *  State:
 *  - formData: input recieved from user
 *
 *  Routes -> LoginForm -> Alert
 *
 * */

function LoginForm({ loginUser }) {
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

  /** handles submission of form for user login */
  function handleSubmit(evt) {
    evt.preventDefault();
    loginUser(formData);
    setFormData(initialState);
    console.log('1')
    history.push("/companies");
    console.log('2')
  }

  return (
    <form
      className="LoginForm mx-auto col-10 col-sm-8 col-md-6 col-lg-4 mt-5"
      onSubmit={handleSubmit}
    >
      <div className="form-group formField mb-4">
        <input
          required
          name="username"
          className="formInput"
          onChange={handleChange}
        />
        <label htmlFor="username" className="formLabel">
          Username
        </label>
      </div>
      <div className="form-group formField mb-4">
        <input
          required
          type="password"
          name="password"
          className="formInput"
          onChange={handleChange}
        />
        <label htmlFor="password" className="formLabel">
          Password
        </label>
      </div>
      <div className="text-right">
        <button className="btn btn-primary">Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;
