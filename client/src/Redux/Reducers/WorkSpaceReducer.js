//import types
import WorkSpaceTypes from "../Types/WorkSpaceTypes";

const initialState = {
  space: null,
  admin: null,
  workers: [],
  loading: false
};

export function space(state = initialState, action) {
  switch (action.type) {
    case WorkSpaceTypes.CREATE_SPACE:
      return {
        ...state,
        loading: false,
        space: action.payload
      };
    case WorkSpaceTypes.DELET_SPACE:
      return {
        ...state,
        space: null,
        admin: null,
        workers: [],
        loading: false
      };
    case WorkSpaceTypes.ACCEPT:
      return {
        ...state,
        loading: false,
        workers: [action.payload, ...state.workers]
      };
    case WorkSpaceTypes.GET_WORKERS:
      return {
        ...state,
        loading: false,
        workers: action.payload
      };
    default:
      return state;
  }
}
