import React, {  useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {fetchEditAC} from "../../redux/actionCreators";
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

 function EditForm({el}) {
  const [eedit, setEedit] = useState(true);
  const dispatch = useDispatch();
  const title = useRef();
  const classes = useStyles();


  function formHandler (event) {
    event.preventDefault();
    dispatch(fetchEditAC(event.target.parentNode.id, title.current.value))
    setEedit(!eedit)
  }

  return (
   <>{eedit && 
    <form id={el._id} className={classes.root}>
      <Input autoFocus type="text" defaultValue={el.title} inputRef={title} placeholder="add task" />
      <Button onClick={formHandler} id={el._id}  color="primary" type="submit">
        Save
      </Button>
    </form>}
   </>
  );
}

export default EditForm