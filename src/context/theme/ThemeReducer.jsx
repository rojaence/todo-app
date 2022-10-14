import { SELECT_THEME } from "@/context/types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SELECT_THEME:
      return {
        ...state,
        darkMode: payload,
      };
    default:
      return state;
  }
};


