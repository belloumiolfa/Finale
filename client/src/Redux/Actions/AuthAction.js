import jwt_decode from "jwt-decode";

//import types
import AuthTypes from "../Types/AuthTypes";
import UserTypes from "../Types/UserTypes";

//import actions
import AlertActions from "./AlertAction";

//import services
import UserServices from "../../Services/UserServices";
import SetAuthToken from "../../Services/SetAuthToken";
/********************************************************************************************** */
// sign up action
export const SignUpAction = (userData, history) => dispatch => {
  UserServices.SignUp(userData)
    .then(res => {
      history.push("/home/wait");
    })
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};

/********************************************************************************************** */
// accept action
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
//refuse action
export const RefuseUser = user => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
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
  }
};
/********************************************************************************************** */
//confirm action
export const ConfirmAction = (token, history) => dispatch => {
  UserServices.confirm(token)
    .then(res => {
      //get user
      const user = res.data.user;
      dispatch({
        type: AuthTypes.CONFIRM,
        payload: true
      });
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/********************************************************************************************** */
//sign in action
export const SignInAction = (userData, history) => dispatch => {
  console.log("confiirm");

  UserServices.SignIn(userData)
    .then(res => {
      if (res.data.user.category === "admin") {
        // Save to localStorage
        const token = res.data.user.token;
        // Set token to ls
        localStorage.setItem("jwtToken", token);

        // Set token to Auth header
        SetAuthToken(token);

        // Decode token to get user data
        const decoded = jwt_decode(token);

        // Set current user
        dispatch({
          type: UserTypes.SIGN_IN,
          payload: decoded.user
        });
        history.push("/admin/dashboard");
      } else {
        if (res.data.user.confirmed) {
          // Save to localStorage
          const token = res.data.user.token;
          // Set token to ls
          localStorage.setItem("jwtToken", token);

          // Set token to Auth header
          SetAuthToken(token);

          // Decode token to get user data
          const decoded = jwt_decode(token);
          // Set current user
          dispatch({
            type: UserTypes.SIGN_IN,
            payload: decoded.user
          });
          history.push("/user/profile");
        } else {
          history.push("/home/wait");
        }
      }
    })
    .catch(err => dispatch(AlertActions.error(err)));
};
/********************************************************************************************** */
// Sign user out
export const SignOutAction = () => dispatch => {
  UserServices.signOut()
    .then(res => {
      // Remove token from localStorage
      localStorage.removeItem("jwtToken");
      console.log(localStorage.getItem("jwtToken"));

      // Remove auth header for future requests
      SetAuthToken(false);
      // Set current user to {} which will set isAuthenticated to false
      dispatch({
        type: UserTypes.SIGN_IN,
        payload: {}
      });
    })
    .catch(e => dispatch(AlertActions.error(e)));
};
