import { State, Action } from "./Store";

const Reducer = (state: State, action: Action) => {
  switch (action?.type) {
    case "SET_UNIT":
      return {
        ...state,
        unit: action.payload,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default Reducer;
