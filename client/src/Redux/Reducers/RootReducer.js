import { combineReducers } from "redux";

import { authentification } from "./AuthReducer";
import { alert } from "./AlertReducer";
//import { filterSearchJobs } from "./FilterReducer";

const rootReducer = combineReducers({
  Authentification: authentification,
  Alert: alert
});

export default rootReducer;
