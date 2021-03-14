import { combineReducers } from 'redux'
import taskReduser from './taskReducer'

const rootReducer = combineReducers({
   tasks: taskReduser
  })
  
export default rootReducer