//import types
import ProfileTypes from "../Types/ProfileTypes";
import AlertTypes from "../Types/AlertType";

//import actions
import AlertActions from "./AlertAction";

//import services
import ProfileServices from "../../Services/ProfileServices";
import UserServices from "../../Services/UserServices";
import UserType from "Redux/Types/UserTypes";
/******************************************************************************************************** */

// Get current profile
export const CurrentProfileAction = () => dispatch => {
  dispatch(setProfileLoading());
  ProfileServices.getCurrentProfile()
    .then(res => {
      dispatch({
        type: ProfileTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/******************************************************************************************************** */
// Create Profile
export const createProfileAction = profileData => dispatch => {
  ProfileServices.createProfile(profileData)
    .then(res => {
      dispatch({
        type: ProfileTypes.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch(AlertActions.error(err.response.data));
    });
};
/******************************************************************************************************** */
//update user information
export const updateUserAction = (userData, history) => dispatch => {
  UserServices.updateUser(userData)
    .then(res => {
      dispatch({
        type: UserType.SIGN_IN,
        payload: res.data.user
      });
    })
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/******************************************************************************************************** */
// Profile loading
export const setProfileLoading = () => {
  return {
    type: ProfileTypes.PROFILE_LOADING
  };
};
/******************************************************************************************************** */

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: ProfileTypes.CLEAR_CURRENT_PROFILE
  };
};
/******************************************************************************************************** */
// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    ProfileServices.deleteAccount()
      .then(res =>
        dispatch({
          type: UserType.SIGN_IN,
          payload: {}
        })
      )
      .catch(err => dispatch(AlertActions.error(err.response.data)));
  }
};
/******************************************************************************************************** */
// Add experience
export const addExperience = (expData, history) => dispatch => {
  ProfileServices.addExperience(expData)
    .then(res => history.push("/user/profile"))
    .catch(err => {
      console.log(err);

      dispatch(AlertActions.error(err.response.data));
    });
};
/******************************************************************************************************** */
// Add experience
export const addEducation = (eduData, history) => dispatch => {
  ProfileServices.addEducation(eduData)
    .then(res => history.push("/user/profile"))
    .catch(err => {
      dispatch(AlertActions.error(err.response.data));
    });
};
/**************************************************************************************************** */

// Delete Experience
export const deleteExperience = id => dispatch => {
  ProfileServices.deleteExperience(id)
    .then(res =>
      dispatch({
        type: ProfileTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};
/**************************************************************************************************** */

// Delete Education
export const deleteEducation = id => dispatch => {
  ProfileServices.deleteEducation(id)
    .then(res =>
      dispatch({
        type: ProfileTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => dispatch(AlertActions.error(err.response.data)));
};
/**************************************************************************************************** */

// Get all profiles
export const getProfilesAction = category => dispatch => {
  dispatch(setProfileLoading());
  ProfileServices.getAllProfiles(category)
    .then(res => {
      dispatch({
        type: ProfileTypes.GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => dispatch(AlertActions.error(err)));
};
