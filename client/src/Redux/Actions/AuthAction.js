import axios from "axios";
//import types
import AuthTypes from "../Types/AuthTypes";

//import actions
import AlertActions from "./AlertAction";

//import services
import UserServices from "../../Services/UserServices";
/********************************************************************************************** */
// sign up action
export const SignUpAction = (userData, history) => dispatch => {
  UserServices.SignUp(userData)
    .then(res => {
      console.log(res);
      history.push("/home/wait");
    })
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};
/********************************************************************************************** */
export const AcceptAction = user => dispatch => {
  UserServices.acceptUser(user)
    .then(res => {
      //send confirmation email
      UserServices.sendConfirmation(res.data.user).then(res => {
        dispatch({
          type: AuthTypes.ACCEPT,
          payload: true
        });
      });
    })
    .catch(err => console.log(err));
};
/********************************************************************************************** */

export const RefuseUser = user => dispatch => {
  //send sorry email

  UserServices.deleteUser(user).then(res => {
    dispatch({
      type: AuthTypes.ACCEPT,
      payload: false
    });
    dispatch({
      type: AuthTypes.REFUSE,
      payload: true
    });
  });
};
/********************************************************************************************** */

export const ConfirmAction = token => dispatch => {
  UserServices.confirm(token)
    .then(res => {
      console.log(res);
      //get user

      //sign in directely
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
