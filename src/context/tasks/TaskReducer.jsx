import { GET_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK } from "@/context/types"

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      }
    default:
      return state;
  }
}
