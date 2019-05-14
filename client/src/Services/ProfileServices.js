import axios from "axios";
const APT_url = "http://localhost:3001";

const ProfileServices = {
  getCurrentProfile,
  createProfile,
  deleteAccount,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation
};
/******************************************************************* */
function getCurrentProfile() {
  return axios({
    method: "get",
    url: `${APT_url}/profile`
  });
}
/******************************************************************* */
function createProfile(profile) {
  return axios({
    method: "post",
    url: `${APT_url}/profile`,
    data: profile
  });
}
/******************************************************************* */
function deleteAccount() {
  return axios({
    method: "delete",
    url: `${APT_url}/profile`
  });
}
/******************************************************************* */
function addExperience(newExp) {
  return axios({
    method: "post",
    url: `${APT_url}/profile/experience`,
    data: newExp
  });
}
/******************************************************************* */
function addEducation(edu) {
  return axios({
    method: "post",
    url: `${APT_url}/profile/education`,
    data: edu
  });
}
/******************************************************************* */
function deleteEducation(id) {
  return axios({
    method: "delete",
    url: `${APT_url}/profile/education/${id}`
  });
}
/******************************************************************* */
function deleteExperience(id) {
  return axios({
    method: "delete",
    url: `${APT_url}/profile/experience/${id}`
  });
}
/*************************************** exporting ************************************************** */
export default ProfileServices;
