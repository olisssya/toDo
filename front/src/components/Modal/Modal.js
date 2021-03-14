import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { modalAC,fetchUndoAC } from "../../redux/actionCreators";

export default function SimpleSnackbar() {

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.tasks.modal);
  const lastDeletedTask = useSelector((state) => state.tasks.lastDeletedTask.task);

  const handleClose = () => {
    dispatch(modalAC())
  };
const undoNotes = () =>{
 
dispatch(fetchUndoAC(lastDeletedTask.title))
}
 

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={modal}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Task deleted"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={undoNotes}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
