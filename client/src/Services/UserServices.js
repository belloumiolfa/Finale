import axios from "axios";
const APT_url = "http://localhost:3001";

const UserServices = {
  SignUp,
  SignIn,
  updateUser,
  getUser,
  getCurrentUser,
  getUsers,
  getNewUsers,
  acceptUser,
  deleteUser,
  confirm,
  getUserByCategory,
  sendConfirmation,
  signOut
};

/******************************************************************* */
function SignUp(user) {
  let res = axios({
    method: "post",
    url: `${APT_url}/user/signup`,
    data: user
  });

  return res;
}
/******************************************************************* */
function SignIn(credentials) {
  return axios({
    method: "post",
    url: "http://localhost:3001/user/signin",
    data: {
      email: credentials.email,
      password: credentials.password
    }
  });
}
/***************************************************************** */
function getUsers() {
  return axios({
    method: "get",
    url: `${APT_url}/user/getusers`
  });
}
/***************************************************************** */
function updateUser(user) {
  return axios({
    method: "post",
    url: `${APT_url}/user/update`,
    data: user
  });
}
/***************************************************************** */
function getCurrentUser() {
  return axios({
    method: "get",
    url: `${APT_url}/user/getuser`
  });
}
/***************************************************************** */
function getNewUsers() {
  return axios({
    method: "get",
    url: `${APT_url}/user/confirmed`
  });
}
/***************************************************************** */
function acceptUser(id) {
  return axios({
    method: "post",
    url: `${APT_url}/user/acceptuser`,
    data: { id }
  });
}
/***************************************************************** */
function deleteUser(id) {
  return axios({
    method: "delete",
    url: `${APT_url}/user/deleteuser`,
    data: { id }
  });
}
/***************************************************************** */
function confirm(token) {
  return axios({
    method: "post",
    url: `${APT_url}/user/confirm`,
    data: { token }
  });
}
/***************************************************************** */

function getUser(id) {
  return axios({
    method: "post",
    url: `${APT_url}/user/getuser`,
    data: { id }
  });
}

/***************************************************************** */

function getUserByCategory(category) {
  return axios({
    method: "post",
    url: `${APT_url}/user/getUserByCategory`,
    data: { category }
  });
}

/***************************************************************** */

function sendConfirmation(id) {
  return axios({
    method: "post",
    url: `${APT_url}/user/nodemailer`,
    data: { id }
  });
}
/***************************************************************** */

function signOut() {
  return axios({
    method: "get",
    url: `${APT_url}/user/signout`
  });
}

/*************************************** exporting ************************************************** */
export default UserServices;
