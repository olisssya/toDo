import React, {  useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {fetchAddTaskAC} from "../../redux/actionCreators";
import Input from '@material-ui/core/Input';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

 function Form() {
  const dispatch = useDispatch();
  const title = useRef();
  const classes = useStyles();


  function formHandler (event) {
    event.preventDefault();
    dispatch(fetchAddTaskAC(title))
    title.current.value = ''
  }

  return (
    <>
    <form onSubmit={formHandler} className={classes.root}>
      <Input autoFocus type="text" inputRef={title} placeholder="add task" />
      <Button color="primary" type="submit">
        Add task!
      </Button>
    </form>
    </>
  );
}

export default Form