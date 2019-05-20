//import types
import JobTypes from "../Types/JobTypes";

//import services
import JobServices from "../../Services/JobServices";

//import action
import AlertActions from "./AlertAction";
import ProfileServices from "Services/ProfileServices";

/***************************************************************************************** */
//publiate job action job action
export const AddJobAction = (jobData, history) => dispatch => {
  dispatch(AlertActions.clear());
  JobServices.addJob(jobData)
    .then(res => {
      dispatch({
        type: JobTypes.ADD_JOB,
        payload: res.data
      });
      history.push("/user/job-list");
    })
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};
/***************************************************************************************** */
//get current user jobs action
export const GetUserJobsAction = () => dispatch => {
  dispatch(setJobLoading);
  JobServices.getCurrentUserJob()
    .then(res => {
      dispatch({
        type: JobTypes.GET_JOBS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: JobTypes.GET_JOBS,
        payload: {}
      });
      dispatch(AlertActions.error(err.response.data));
    });
};
/***************************************************************************************** */
//get current user jobs action
export const GetPubliatedJobsAction = () => dispatch => {
  dispatch(setJobLoading);
  JobServices.getPubliatedJobs()
    .then(res => {
      dispatch({
        type: JobTypes.GET_JOBS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: JobTypes.GET_JOBS,
        payload: {}
      });
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */
//publiate job action
export const PubliateJobAction = job => dispatch => {
  dispatch(setJobLoading);
  JobServices.publiateJob(job)
    .then(res => {
      GetUserJobsAction();

      dispatch(AlertActions.success("Publiated"));
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */
//finish job action
export const FinishJobAction = job => dispatch => {
  dispatch(setJobLoading);
  JobServices.finishJob(job)
    .then(res => {
      GetUserJobsAction();

      dispatch(AlertActions.success("Finished"));
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */
//finish job action
export const DeleteJobAction = (job, history) => dispatch => {
  dispatch(setJobLoading);
  JobServices.deleteJob(job)
    .then(res => {
      dispatch({
        type: JobTypes.DELETE_JOB,
        payload: job
      });
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */
// save Job
export const SaveJobAction = (job, save) => dispatch => {
  ProfileServices.saveJob(job, save)
    .then(res => {
      GetUserJobsAction();
      dispatch(AlertActions.success("Saved"));
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */
// remove Job
export const RemoveJobAction = job => dispatch => {
  ProfileServices.removeJob(job)
    .then(res => {
      GetUserJobsAction();
      dispatch(AlertActions.success("Removed"));
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */
// Set loading state
export const setJobLoading = () => {
  return {
    type: JobTypes.JOB_LOADING
  };
};

// Clear errors
export const clearErrors = dispatch => {
  dispatch(AlertActions.clear());
};

/************************************************************************************************* */
//Search action
export const SearchAction = filter => dispatch => {
  dispatch(setJobLoading);
  JobServices.searchJob(filter)
    .then(res => {
      dispatch({
        type: JobTypes.GET_JOBS,
        payload: res.data
      });
    })
    .catch(e => {
      dispatch({
        type: JobTypes.GET_JOBS,
        payload: {}
      });
    });
};
