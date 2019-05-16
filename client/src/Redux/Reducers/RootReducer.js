import { combineReducers } from "redux";

import { authentification } from "./AuthReducer";
import { alert } from "./AlertReducer";
import { profile } from "./ProfileReducer";
import { job } from "./JobReducer";
//import { filterSearchJobs } from "./FilterReducer";

const rootReducer = combineReducers({
  Authentification: authentification,
  Alert: alert,
  Profile: profile,
  Job: job
});

export default rootReducer;
