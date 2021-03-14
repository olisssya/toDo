import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import EditForm from "../EditForm/EditForm";

import {
  fetchDoneTaskAC,
  fetchDeleteTaskAC,
  modalAC,
  fetchEditAC
} from "../../redux/actionCreators";

function Note({ el }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const titleHandler = (event) => {
    dispatch(fetchDoneTaskAC(event.target.id));
  };
  const deleteHandler = (event) => {
    dispatch(fetchDeleteTaskAC(event.target.parentNode.id));
    dispatch(modalAC());
  };

  const editHandler = () => {
    setEdit(!edit)
  };

  return (
    <div id={el._id}>
      <span
        style={
          el.isDone
            ? {
                cursor: "pointer",
                opacity: ".5",
                textDecoration: "line-through",
              }
            : { cursor: "pointer", textDecoration: "none" }
        }
        id={el._id}
        onClick={titleHandler}
      >
        {el.title}
      </span>
      <Button id={el._id} onClick={deleteHandler} color="secondary">
        Delete
      </Button>
      <Button id={el._id} onClick={editHandler}>
        Edit
      </Button>
      {edit && <EditForm el = {el} />}
    </div>
  );
}
export default Note;
