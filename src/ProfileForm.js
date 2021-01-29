import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Form.css";

/** Renders ProfileForm component
 *
 *  Props:
 *  - updateUser: fn passed down from parent to update user data
 *  - user: object with current user data
 *
 *  State:
 *  - formData: input recieved from user
 *
 *  Routes -> ProfileForm -> Alert
 *
 * */
function ProfileForm({ updateUser, user }) {
  const initialState = user;
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  // console.log('profile form user = ', user);

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
    history.push("/");
  }

  return (
    <form
      className="ProfileForm mx-auto col-10 col-sm-8 col-md-6 mt-5"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="username">
          <b>Username: </b>{user.username}
        </label>
      </div>
      <div className="form-group formField mt-4">
        <input
          required
          id="profileForm-firstName"
          value={user.firstName}
          name="firstName"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="profileForm-firstName">First Name</label>
      </div>
      <div className="form-group formField mt-4">
        <input
          required
          id="profileForm-lastName"
          value={user.lastName}
          name="lastName"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="profileForm-lastName">Last Name</label>
      </div>
      <div className="form-group formField mt-4">
        <input
          required
          id="profileForm-email"
          value={user.email}
          name="email"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="profileForm-email">Email</label>
      </div>
      <div className="form-group formField mt-4">
        <input
          required
          id="profileForm-password"
          type="password"
          name="password"
          className="formInput"
          onChange={handleChange}
        />
        <label className="formLabel" htmlFor="profileForm-password">
          Confirm password to save changes:
        </label>
      </div>
      <div className="text-right">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </form>
  );
}

export default ProfileForm;
