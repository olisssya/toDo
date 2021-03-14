import {
  INIT_TASK,
  ADD_TASK,
  DONE_TASK,
  DELETE_TASK,
  MODAL,
  UNDO,
  EDIT,
  ERROR
} from "./actionTypes";

// REDUX
export const initTaskAC = (payload) => {
  return {
    type: INIT_TASK,
    payload,
  };
};
export const errorAC = (payload) => {
  return {
    type: ERROR,
    payload,
  };
};
export const addTaskAC = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};

export const doneTaskAC = (payload) => {
  return {
    type: DONE_TASK,
    payload,
  };
};
export const deleteTaskAC = (payload) => {
  return {
    type: DELETE_TASK,
    payload,
  };
};

export const modalAC = () => {
  return { type: MODAL };
};

export const undoAC = (payload) => {
  return {
    type: UNDO,
    payload,
  };
};
export const editAC = (payload) => {
  return {
    type: EDIT,
    payload,
  };
};
// Redux Thunk
// export const fetchInitTaskAC = () => {
//   return (dispatch) => {
//     fetch(process.env.REACT_APP_URL)
//       .then((response) => response.json())
//       .then((data) => dispatch(initTaskAC(data)));
//   };
// };

// export const fetchAddTaskAC = (title) => {
//   return (dispatch) => {
//     fetch(process.env.REACT_APP_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "Application/json",
//       },
//       body: JSON.stringify({
//         title: title.current.value,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => dispatch(addTaskAC(data)));
//   };
// };

// export const fetchDoneTaskAC = (id) =>{
//     return (dispatch) => {
//     fetch(process.env.REACT_APP_DONE_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "Application/json",
//         },
//         body: JSON.stringify({ _id: id }),
//       }).then((res) => res.json())
//     }

// }

// REDUX SAGA
export const fetchInitTaskAC = () => {
  return {
    type: "INIT_FETCH",
  };
};

export const fetchAddTaskAC = (title) => {
  return {
    type: "ADD_FETCH",
    title,
  };
};

export const fetchDoneTaskAC = (id) => {
  return {
    type: "DONE_FETCH",
    id,
  };
};

export const fetchDeleteTaskAC = (id) => {
  return {
    type: "DELETE_FETCH",
    id,
  };
};

export const fetchUndoAC = (title) => {
  return {
    type: "UNDO_FETCH",
    title,
  };
};
export const fetchEditAC = (id, title) => {

  return {
    type: "EDIT_FETCH",
    id,
    title
  };
};
