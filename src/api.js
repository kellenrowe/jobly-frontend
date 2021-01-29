import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. 
   * 
   *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
   *  where jobs is [{ id, title, salary, equity }, ...]
   *  */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. 
   *  
   *  => { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
   *  */

  static async getAllCompanies(data) {
    let res;
    if (data.name) {
      res = await this.request(`companies/`, data);
    } else {
      res = await this.request(`companies/`);
    }
    return res.companies;
  }

  /** Get all jobs. 
   *  
   *  => { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
   *  */

  static async getAllJobs(data) {
    let res;


    if (data.title) {
      res = await this.request(`jobs/`, data);
    } else {
      res = await this.request(`jobs/`);
    }
    return res.jobs;
  }

  /** Sign up a user. 
   *  
   * userData includes { username, password, firstName, lastName, email }
   * 
   * Returns JWT token which can be used to authenticate further requests.
   * */

  static async signupUser(userData) {
    let res = await this.request(`auth/register/`, userData, "post");
    return res;
  }

  /** Login a user. 
   *  
   *  Sends userData { username, password }
   * 
   *  Returns JWT token: { token }
   * 
   * */

  static async loginUser(userData) {
    let res = await this.request(`auth/token/`, userData, "post");
    return res;
  }

  /** GET /[username] => { user }
   *
   * Returns { username, firstName, lastName, isAdmin, applications }
   *   where applications is [ id, ... ]
   *
   * Authorization required: admin or same user-as-:username
   **/

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** PATCH /[username] { userData } => { user }
   *
   * userData can include:
   *   { firstName, lastName, password, email }
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Authorization required: admin or same-user-as-:username
   **/

  static async updateUser(userData) {
    let res = await this.request(
      `users/${userData.username}`,
      userData,
      "patch"
    );
    return res;
  }

  /** POST /[username]/jobs/[id]  { state } => { application }
   *
   * Returns {"applied": jobId}
   *
   * Authorization required: admin or same-user-as-:username
   * */

  static async applyToJob(username, jobId) {
    let res = await this.request(
      `users/${username}/jobs/${jobId}`,
      { username, jobId },
      "post"
    );
    return res;
  }

}

// TODO: get rid of this later
// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;