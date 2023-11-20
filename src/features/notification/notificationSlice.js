import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
  pendingCount: 0,
  totalPages: 1,
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
    getRecentNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.notifications =
        action.payload.page === 1
          ? action.payload.notifications
          : [...state.notifications, ...action.payload.notifications];
      state.totalPages = action.payload.totalPages;
      state.pendingCount = action.payload.unreadCount;
    },
    resetStateSuccess(state) {
      return initialState;
    },
    markReadAllNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
      state.pendingCount = 0;
    },
    markReadNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.notifications = state.notifications.map((notification) =>
        notification.id === action.payload._id
          ? { ...notification, ...action.payload }
          : notification
      );
      state.pendingCount = state.pendingCount - 1;
    },
  },
});

export default slice.reducer;

export const getRecentNotification =
  ({ page }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/notifications?page=${page}`);
      dispatch(slice.actions.getRecentNotificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const resetNotificationState = () => (dispatch) => {
  dispatch(slice.actions.resetStateSuccess());
};

export const markReadAllNotifications = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put("/notifications/mark-read-all");
    dispatch(slice.actions.markReadAllNotificationsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
export const markReadNotification = (notificationId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(
      `/notifications/mark-read/${notificationId}`
    );
    dispatch(slice.actions.markReadNotificationSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
