//import types
import JobTypes from "../Types/JobTypes";

//import services
import JobServices from "../../Services/JobServices";

//import action
import AlertActions from "./AlertAction";

/***************************************************************************************** */
//add new job action

export const AddJobAction = jobData => dispatch => {
  dispatch(AlertActions.clear());
  JobServices.addJob(jobData)
    .then(res => {
      dispatch({
        type: JobTypes.ADD_JOB,
        payload: res.data
      });
    })
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};
