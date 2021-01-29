import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./forms.css";

/** Renders SignupForm component
 *
 *  Props:
 *  - signupUser: fn passed from parent to update user data
 *
 *  State:
 *  - formData: input recieved from user
 *
 *  Routes -> SignupForm -> Alert
 *  */
function SignupForm({ signupUser }) {
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

  /** handle signup of new user */
  function handleSubmit(evt) {
    evt.preventDefault();
    signupUser(formData);
    setFormData(initialState);
    history.push("/companies");
  }

  return (
    <form
      className="SignupForm mx-auto col-10 col-sm-8 col-md-6 col-lg-4 mt-5"
      onSubmit={handleSubmit}
    >
      <div className="form-group formField mb-4">
        <input
          required
          id="signUpForm-username"
          name="username"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="signUpForm-username">
          Username
        </label>
      </div>
      <div className="form-group formField mb-4">
        <input
          required
          id="signUpForm-password"
          type="password"
          name="password"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="signUpForm-password">
          Password
        </label>
      </div>
      <div className="form-group formField mb-4">
        <input
          required
          id="signUpForm-firstName"
          name="firstName"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="signUpForm-firstName">
          First Name
        </label>
      </div>
      <div className="form-group formField mb-4">
        <input
          required
          id="signUpForm-lastName"
          name="lastName"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="signUpForm-lastName">
          Last Name
        </label>
      </div>
      <div className="form-group formField mb-4">
        <input
          required
          id="signUpForm-email"
          name="email"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="signUpForm-email">
          Email
        </label>
      </div>
      <div className="text-right">
        <button className="btn btn-primary">Sign Up!</button>
      </div>
    </form>
  );
}

export default SignupForm;
