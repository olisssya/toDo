import {
  INIT_TASK,
  ADD_TASK,
  DELETE_TASK,
  DONE_TASK,
  MODAL,
  UNDO,
  EDIT,
  ERROR
} from "../actionTypes";
import { insert } from "../../utils/Functions";

const initialState = {
  title: "tasks",
  tasks: [],
  lastDeletedTask: { task: null, index: null },
  modal: false,
  error:{status:false, message:null}
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      console.log(action.payload);
      return {...state, error:{status:!state.error.status, message: action.payload}}
    case INIT_TASK:
      return { ...state, tasks: action.payload };

    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case DONE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((el) => {
            if (el._id == action.payload._id) {
              el.isDone = !el.isDone;
              return { ...el };
            }
            return { ...el };
          }),
        ],
      };

    case DELETE_TASK:
      const deleteIndex = state.tasks.findIndex(
        (el) => el._id == action.payload._id
      );
      return {
        ...state,
        lastDeletedTask: { task: state.tasks[deleteIndex], index: deleteIndex },
        tasks: [...state.tasks.filter((el) => el._id !== action.payload._id)],
      };
    case MODAL:
      return { ...state, modal: !state.modal };


    case UNDO:
      return {
        ...state,
        tasks: insert(state.tasks, state.lastDeletedTask.index, action.payload),
        lastDeletedTask:[],
        modal: !state.modal

      };

    case EDIT:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((el) => {
            if (el._id == action.payload.id) {
              el.title =  action.payload.title
              return { ...el };
            }
            return { ...el };
          }),
        ],
      };

    default:
      return state;
  }
};

export default taskReducer;
