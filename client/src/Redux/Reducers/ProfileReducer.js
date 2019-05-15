//import types
import ProfileTypes from "../Types/ProfileTypes";

const initialState = {
  profile: null,
  account: {},
  profiles: null,
  loading: false
};

export function profile(state = initialState, action) {
  switch (action.type) {
    case ProfileTypes.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case ProfileTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case ProfileTypes.GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        loading: false
      };
    case ProfileTypes.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case ProfileTypes.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
