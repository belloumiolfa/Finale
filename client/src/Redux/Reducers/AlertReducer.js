//import type
import { AlertType } from "../Types/AlertType";

export function alert(state = {}, action) {
  switch (action.type) {
    case AlertType.SUCCESS:
      return action.payload;

    case AlertType.ERROR:
      return action.payload;

    case AlertType.CLEAR:
      return {};
    default:
      return state;
  }
}
