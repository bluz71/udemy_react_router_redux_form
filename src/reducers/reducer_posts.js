import { FETCH_POSTS } from "../actions/index";
import _ from "lodash";

// State will be an object, hence make the default state argument an empty
// object.
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    default:
      return state;
  }
}
