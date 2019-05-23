//import types
import WorkSpaceTypes from "../Types/WorkSpaceTypes";
//import actions
import AlertActions from "../Actions/AlertAction";
//import services
import WorkSpaceServices from "../../Services/WorkSpaceServices";
/******************************************************************************************************** */

//create work space action
//publiate job action job action
export const CreateWorkSpaceAction = (job, workSpace, history) => dispatch => {
  dispatch(AlertActions.clear());
  WorkSpaceServices.createWorkSpace(job, workSpace)
    .then(res => {
      dispatch({
        type: WorkSpaceTypes.CREATE_SPACE,
        payload: res.data
      });
      console.log(res.data._id);

      history.push(`/user/workSpace/${res.data._id}`);
    })
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};
