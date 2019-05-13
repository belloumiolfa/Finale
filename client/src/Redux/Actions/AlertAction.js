//import type
import { AlertType } from "../Types/AlertType";

/**
 * success alert action
 * relatated with AlertReducer that update the erroe msg
 */

const success = message => dispatch => {
  return dispatch({
    type: AlertType.SUCCESS,
    payload: message
  });
};

/**
 * error alert
 * relatated with AlertReducer that update the error msg
 */
const error = message => dispatch => {
  return dispatch({
    type: AlertType.ERROR,
    payload: message
  });
};

/**
 * clear action
 * relatated with AlertReducer that clear the error state
 */
const clear = () => dispatch => {
  return dispatch({ type: AlertType.CLEAR });
};
const AlertActions = { success, error, clear };
export default AlertActions;
