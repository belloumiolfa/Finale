import axios from "axios";
const APT_url = "http://localhost:3001";

const JobServices = { addJob };
/******************************************************************* */
function addJob(job) {
  return axios({
    method: "post",
    url: `${APT_url}/job`,
    data: job
  });
}
/******************************************************************* */

/*************************************** exporting ************************************************** */
export default JobServices;
