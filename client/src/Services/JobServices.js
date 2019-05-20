import axios from "axios";
const APT_url = "http://localhost:3001";

const JobServices = {
  addJob,
  getCurrentUserJob,
  getUserJobs,
  publiateJob,
  finishJob,
  deleteJob,
  verifSavedJob,
  getJobById,
  searchJob,
  getPubliatedJobs
};
/******************************************************************* */
function addJob(job) {
  return axios({
    method: "post",
    url: `${APT_url}/job`,
    data: job
  });
}
/******************************************************************* */
function getCurrentUserJob() {
  return axios({
    method: "get",
    url: `${APT_url}/job/`
  });
}
/******************************************************************* */
function getUserJobs(id) {
  return axios({
    method: "get",
    url: `${APT_url}/job/user/${id}`
  });
}
/******************************************************************* */
function getPubliatedJobs() {
  return axios({
    method: "get",
    url: `${APT_url}/job/publiated`
  });
}
/***************************************************************** */

function publiateJob(id) {
  return axios({
    method: "get",
    url: `${APT_url}/job/publiate/${id}`
  });
}
/***************************************************************** */

function finishJob(id) {
  return axios({
    method: "get",
    url: `${APT_url}/job/finish/${id}`
  });
}
/***************************************************************** */

function deleteJob(id) {
  return axios({
    method: "delete",
    url: `${APT_url}/job/${id}`
  });
}
/***************************************************************** */

function verifSavedJob(id) {
  return axios({
    method: "get",
    url: `${APT_url}/job/${id}`
  });
}
/******************************************************************* */
function getJobById(id) {
  return axios({
    method: "get",
    url: `${APT_url}/job/${id}`
  });
}
/***************************************************************** */

function searchJob(filter) {
  return axios({
    method: "post",
    url: `${APT_url}/job/search`,
    data: filter
  });
}
/*************************************** exporting ************************************************** */
export default JobServices;
