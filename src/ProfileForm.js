import { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <form className="ProfileForm mx-auto col-6" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username"><b>Username</b></label>
        <p>{user.username}</p>

        <label htmlFor="firstName">First Name</label>
        <input
          value={user.firstName}
          name="firstName"
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          value={user.lastName}
          name="lastName"
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          value={user.email}
          name="email"
          className="form-control"
          onChange={handleChange}
        />
        <label htmlFor="password">Confirm password to save changes:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </form>
  );
}

export default ProfileForm;