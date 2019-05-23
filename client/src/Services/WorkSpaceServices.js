import axios from "axios";
const APT_url = "http://localhost:3001";

const WorkSpaceServices = { createWorkSpace, getWorkSpaceByJob };

/******************************************************************* */
function createWorkSpace(job, workSpace) {
  return axios({
    method: "post",
    url: `${APT_url}/workspace/${job}`,
    data: workSpace
  });
}
/******************************************************************* */
function getWorkSpaceByJob(job) {
  return axios({
    method: "get",
    url: `${APT_url}/workspace/getbyjob/${job}`
  });
}
/*************************************** exporting ************************************************** */
export default WorkSpaceServices;
