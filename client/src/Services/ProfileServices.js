import axios from "axios";
const APT_url = "http://localhost:3001";

const ProfileServices = {
  getCurrentProfile,
  createProfile,
  deleteAccount,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  getAllProfiles,
  getProfileById,
  saveJob,
  removeJob,
  getProfileByUserId
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
/******************************************************************* */
function getAllProfiles(category) {
  return axios({
    method: "get",
    url: `${APT_url}/profile/all/${category}`
  });
}
/******************************************************************* */
function getProfileById(id) {
  return axios({
    method: "get",
    url: `${APT_url}/profile/${id}`
  });
}
/******************************************************************* */
function getProfileByUserId(id) {
  return axios({
    method: "get",
    url: `${APT_url}/profile/user/${id}`
  });
}
/******************************************************************* */
function saveJob(id) {
  return axios({
    method: "post",
    url: `${APT_url}/profile/savejob/${id}`
  });
}
/******************************************************************* */
function removeJob(id) {
  return axios({
    method: "delete",
    url: `${APT_url}/profile/savejob/${id}`
  });
}
/*************************************** exporting ************************************************** */
export default ProfileServices;
