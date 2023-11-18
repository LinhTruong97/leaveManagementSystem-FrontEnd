import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  pendingRequest: [],
  totalPendingCount: 0,
  employeeRequest: [],
  leaveByMonth: [],
  todayLeave: [],
  countTodayLeaveRequest: 0,
};

const slice = createSlice({
  name: "employeeLeave",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getPendingLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.pendingRequest = action.payload.pendingLeave;
      state.totalPendingCount = action.payload.totalPendingCount;
    },
    getEmployeeLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.employeeRequest = action.payload;
    },
    approveLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    rejectLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getLeaveByMonthSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalApprovedLeave = action.payload.totalApprovedLeave;
      state.leaveByMonth = action.payload.totalLeaveByMonth;
    },
    resetStateSuccess(state) {
      return initialState;
    },
  },
});

export default slice.reducer;

export const getPendingLeave = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("leaves/pending");
    dispatch(slice.actions.getPendingLeaveSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getEmployeeLeave = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("leaves");
    dispatch(slice.actions.getEmployeeLeaveSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const approveLeave = (requestId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/leaves/approve/${requestId}`);
    dispatch(slice.actions.approveLeaveSuccess(response.data));
    toast.success("Approve successfully");
    dispatch(getPendingLeave());
    dispatch(getEmployeeLeave());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const rejectLeave = (requestId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/leaves/reject/${requestId}`);
    dispatch(slice.actions.rejectLeaveSuccess(response.data));
    toast.success("Reject successfully");
    dispatch(getPendingLeave());
    dispatch(getEmployeeLeave());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getLeaveByMonth = (year) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/leaves/leave-by-month/${year}`);
    dispatch(slice.actions.getLeaveByMonthSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const resetEmployeeLeaveState = () => (dispatch) => {
  dispatch(slice.actions.resetStateSuccess());
};
