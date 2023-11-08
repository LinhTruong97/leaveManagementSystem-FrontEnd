import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  updatedProfile: null,
};

const slice = createSlice({
  name: "myProfile",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },
  },
});

export default slice.reducer;

export const getCurrentUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(slice.actions.getCurrentUserSuccess(response.data));
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const updateUserProfile =
  ({ userId, userName, gender, birthday, phone, address, avatarUrl }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { userName, gender, birthday, phone, address, avatarUrl };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
      dispatch(getCurrentUser());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
