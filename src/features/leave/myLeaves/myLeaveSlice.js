import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../../app/apiService";
import { toast } from "react-toastify";
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const initialState = {
  isLoading: false,
  error: null,
  leaveBalance: null,
  totalUsedSum: 0,
  totalHadSum: 0,
  totalRemainingSum: 0,
  fullLeavesrequest: [],
  currentPageLeaveRequest: [],
  selectedRequest: null,
  totalPages: 1,
};

const slice = createSlice({
  name: "myLeave",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getMyLeaveBalanceSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.leaveBalance = action.payload.leaveBalance;
      state.totalUsedSum = action.payload.totalUsedSum;
      state.totalHadSum = action.payload.totalHadSum;
      state.totalRemainingSum = action.payload.totalRemainingSum;
    },
    getCurrentMyLeaveRequestListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { currentPageLeavesList, totalPages, count } = action.payload;
      state.currentPageLeaveRequest = currentPageLeavesList;
      state.totalRequests = count;
      state.totalPages = totalPages;
    },
    getFullMyLeaveRequestListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { fullLeavesList, pendingCount } = action.payload;
      state.fullLeavesrequest = fullLeavesList;
      state.myPendingCount = pendingCount;
    },
    createLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updateLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedRequest = null;
    },
    getSingleLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedRequest = action.payload;
    },
    deleteLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deletedLeaveRequestId = action.payload._id;
      state.currentPageLeaveRequest = state.currentPageLeaveRequest.filter(
        (request) => request._id !== deletedLeaveRequestId
      );
      state.selectedRequest = null;
    },
    clearSelectedLeaveSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedRequest = null;
    },
    resetStateSuccess(state) {
      return initialState;
    },
  },
});

export default slice.reducer;

export const getMyLeaveBalance = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("leaves/balance/me");
    dispatch(slice.actions.getMyLeaveBalanceSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getMyLeaveRequestList =
  ({ page, limit, filter }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {};
      if (page) {
        params.page = page;
      }
      if (limit) {
        params.limit = limit;
      }
      if (filter && filter.status !== "") {
        params.status = filter.status;
      }
      if (filter && filter.category !== "") {
        params.category = filter.category;
      }
      const response = await apiService.get("/leaves/me", { params });
      dispatch(
        slice.actions.getCurrentMyLeaveRequestListSuccess(response.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getFullMyLeaveRequestList = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/leaves/me");
    dispatch(slice.actions.getFullMyLeaveRequestListSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const createLeave =
  ({ categoryName, fromDate, toDate, type, reason }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      if (type !== "full") {
        toDate = fromDate;
      }
      const adjustedFromDate = dayjs(fromDate).startOf("day").add(1, "second");

      const adjustedToDate = dayjs(toDate).endOf("day");

      const response = await apiService.post("/leaves", {
        categoryName,
        fromDate: adjustedFromDate,
        toDate: adjustedToDate,
        type,
        reason,
      });
      dispatch(slice.actions.createLeaveSuccess(response.data));
      toast.success("Create Leave Successfully");
      dispatch(getMyLeaveBalance());
      dispatch(getMyLeaveRequestList({ page: 1, limit: 5 }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateLeave =
  ({ requestId, categoryName, fromDate, toDate, type, reason }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      if (type !== "full") {
        toDate = fromDate;
      }
      const response = await apiService.put(`/leaves/${requestId}`, {
        categoryName,
        fromDate,
        toDate,
        type,
        reason,
      });
      dispatch(slice.actions.updateLeaveSuccess(response.data));
      toast.success("Update Leave Successfully");
      dispatch(getMyLeaveBalance());
      dispatch(getMyLeaveRequestList({ page: 1, limit: 5 }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const getSingleLeave = (requestId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`leaves/${requestId}`);
    dispatch(slice.actions.getSingleLeaveSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const deleteLeave = (requestId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/leaves/${requestId}`);
    dispatch(slice.actions.deleteLeaveSuccess(response.data));
    toast.success("Delete successfully");
    dispatch(getMyLeaveBalance());
    dispatch(getMyLeaveRequestList({ page: 1, limit: 5 }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const clearSelectedLeave = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.clearSelectedLeaveSuccess());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const resetMyLeaveState = () => (dispatch) => {
  dispatch(slice.actions.resetStateSuccess());
};
