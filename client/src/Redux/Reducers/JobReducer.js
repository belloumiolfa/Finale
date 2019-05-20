//import types
import JobTypes from "../Types/JobTypes";
const initialState = {
  jobs: [],
  job: {},
  loading: false
};

export const job = (state = initialState, action) => {
  switch (action.type) {
    case JobTypes.JOB_LOADING:
      return {
        ...state,
        loading: true
      };
    case JobTypes.GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case JobTypes.GET_JOB:
      return {
        ...state,
        job: action.payload,
        loading: false
      };
    case JobTypes.ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case JobTypes.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload)
      };
    default:
      return state;
  }
};
