import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  recentNotifications: [],
  pendingNotifications: [],
  pendingCount: 0,
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getPendingNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.pendingNotifications = action.payload.notifications;
      state.pendingCount = action.payload.unreadCount;
    },
    getRecentNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.recentNotifications = action.payload;
    },
  },
});

export default slice.reducer;

export const getPendingNotification = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/notifications/unread");
    dispatch(slice.actions.getPendingNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getRecentNotification = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/notifications");
    console.log(response.data);
    dispatch(slice.actions.getRecentNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
