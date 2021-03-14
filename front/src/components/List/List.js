import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitTaskAC} from "../../redux/actionCreators";
import Note from '../Note/Note'


function List(props) {
  
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
 
  useEffect(() => {
    dispatch(fetchInitTaskAC());
  }, [dispatch]);

  

  return (
    <>
      {tasks && tasks.length > 0 ? (
        tasks.map((el) => (
   <Note el={el} key={el._id}/>
        ))
      ) : (
        <p>No one task</p>
      )}
    </>
  );
}

export default List;
