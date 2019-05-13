//import types
import UserTypes from "../Types/UserTypes";
import AuthTypes from "../Types/AuthTypes";

//import services
import isEmpty from "../../Services/IsEmpty";

const initialState = {
  isAuthenticated: false,
  accepted: false,
  refused: false,
  confirmed: false,
  user: {}
};

export function authentification(state = initialState, action) {
  switch (action.type) {
    case UserTypes.SIGN_IN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        accepted: !isEmpty(action.payload),
        confirmed: !isEmpty(action.payload),
        user: action.payload
      };

    case AuthTypes.ACCEPT:
      return {
        ...state,
        accepted: action.payload
      };
    case AuthTypes.REFUSE:
      return {
        ...state,
        refused: true
      };

    case AuthTypes.CONFIRM:
      return {
        ...state,
        user: action.payload,
        confirmed: true
      };

    default:
      return state;
  }
}
