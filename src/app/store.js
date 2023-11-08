import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/myProfile/userSlice";
import myLeaveReducer from "../features/leave/myLeaves/myLeaveSlice";
import employeeReducer from "../features/employee/employeeSlice";
import employeeLeaveReducer from "../features/leave/leaveManagement/employeeLeaveSlice";

const rootReducer = combineReducers({
  myProfile: userReducer,
  myLeave: myLeaveReducer,
  employee: employeeReducer,
  employeeLeave: employeeLeaveReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
