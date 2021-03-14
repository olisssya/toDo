import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  initTaskAC,
  addTaskAC,
  doneTaskAC,
  deleteTaskAC,
  undoAC,
  editAC,
  errorAC,
} from "../actionCreators";

const fetchTasks = async () => {
  const result = await fetch(process.env.REACT_APP_URL);
  try {
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchAddTask = async (title) => {
  const result = await fetch(process.env.REACT_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      title: title.current.value,
    }),
  });
  try {
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};
const fetchDoneTask = async (id) => {
  const response = await fetch(process.env.REACT_APP_DONE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ _id: id }),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchDeleteTask = async (id) => {
  const response = await fetch(process.env.REACT_APP_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ _id: id }),
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchTakeLastDeletedTask = async (title) => {
  const result = await fetch(process.env.REACT_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ title: title }),
  });
  try {
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchEditTask = async (action) => {
  const result = await fetch(process.env.REACT_APP_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ _id: action.id, title: action.title }),
  });
  try {
    const data = await result.json();
    const resultArr = { id: data, title: action.title };
    return resultArr;
  } catch (error) {
    throw error;
  }
};

function* initTaskWorker() {
  try {
    const task = yield call(fetchTasks);
    yield put(initTaskAC(task));
  } catch (error) {
    yield put(errorAC(error.message));
  }
}
function* doneTaskWorker(action) {
  const doneTask = yield call(fetchDoneTask, action.id);
  yield put(doneTaskAC(doneTask));
}

function* addTaskWorker(action) {
  try {
    const newTask = yield call(fetchAddTask, action.title);
    yield put(addTaskAC(newTask));
  } catch (error) {
    yield put(errorAC(error.message));
  }
}

function* deleteTaskWorker(action) {
  try {
    const deletedTask = yield call(fetchDeleteTask, action.id);
    yield put(deleteTaskAC(deletedTask));
  } catch (error) {
    yield put(errorAC(error.message));
  }
}
function* undoWorker(action) {
  try {
    const lastDeletedTask = yield call(fetchTakeLastDeletedTask, action.title);
    yield put(undoAC(lastDeletedTask));
  } catch (error) {
    yield put(errorAC(error.message));
  }
}

function* editWorker(action) {
  try {
    const editedTask = yield call(fetchEditTask, action);
    yield put(editAC(editedTask));
  } catch (error) {
    yield put(errorAC(error.message));
  }
}

function* watcher() {
  yield all([
    yield takeEvery("INIT_FETCH", initTaskWorker),
    yield takeEvery("ADD_FETCH", addTaskWorker),
    yield takeEvery("DONE_FETCH", doneTaskWorker),
    yield takeEvery("DELETE_FETCH", deleteTaskWorker),
    yield takeEvery("UNDO_FETCH", undoWorker),
    yield takeEvery("EDIT_FETCH", editWorker),
  ]);
}
export default watcher;
