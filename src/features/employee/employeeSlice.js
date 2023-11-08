import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  currentPageEmployeeList: [],
  totalPages: 1,
  selectedEmployee: null,
  selectedReportToEmployee: null,
  reportToEmployeeList: [],
};

const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getEmployeeListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { employeeList, totalPages, count } = action.payload;
      state.currentPageEmployeeList = employeeList;
      state.totalEmployees = count;
      state.totalPages = totalPages;
    },
    getSingleEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedEmployee = action.payload.selectedEmployee;
      state.selectedReportToEmployee = action.payload.selectedReportToEmployee;
    },
    getReportToEmployeeListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.reportToEmployeeList = action.payload;
    },
    createEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    clearSelectedEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedEmployee = null;
      state.selectedReportToEmployee = null;
    },
    updateEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedEmployee = null;
      state.selectedReportToEmployee = null;
    },
    terminateEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedEmployee = null;
      state.selectedReportToEmployee = null;
    },
    reactivateEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedEmployee = null;
      state.selectedReportToEmployee = null;
    },
    deleteEmployeeSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const deletedEmployee = action.payload._id;
      state.currentPageEmployeeList = state.currentPageEmployeeList.filter(
        (employee) => employee._id !== deletedEmployee
      );
      state.selectedEmployee = null;
      state.selectedReportToEmployee = null;
    },
  },
});

export default slice.reducer;

export const getEmployeeList =
  ({ page = 1, limit = 10, filter }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filter && filter.fullName !== "") {
        params.fullName = filter.fullName;
      }
      if (filter && filter.status !== "") {
        params.status = filter.status;
      }
      if (filter && filter.role !== "") {
        params.role = filter.role;
      }

      const response = await apiService.get("/employees", { params });
      dispatch(slice.actions.getEmployeeListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getSingleEmployee = (employeeId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`employees/${employeeId}`);
    dispatch(slice.actions.getSingleEmployeeSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
export const getReportToEmployeeList = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("employees/report-to");
    dispatch(slice.actions.getReportToEmployeeListSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createEmployee =
  ({ fullName, email, role, reportTo, birthday }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/employees", {
        fullName,
        email,
        role,
        reportTo: reportTo._id,
        birthday,
      });
      dispatch(slice.actions.createEmployeeSuccess(response.data));
      toast.success("Create Employee Successfully");
      dispatch(getEmployeeList({ page: 1, limit: 10 }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const clearSelectedEmployee = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    dispatch(slice.actions.clearSelectedEmployeeSuccess());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateEmployee =
  ({
    employeeId,
    userName,
    fullName,
    email,
    role,
    reportTo,
    gender,
    phone,
    address,
    birthday,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/employees/update/${employeeId}`, {
        userName,
        fullName,
        email,
        role,
        reportTo: reportTo?._id,
        gender,
        phone,
        address,
        birthday,
      });
      dispatch(slice.actions.updateEmployeeSuccess(response.data));
      toast.success("Update Employee Successfully");
      dispatch(getEmployeeList({ page: 1, limit: 10 }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const terminateEmployee = (employeeId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/employees/terminate/${employeeId}`);
    dispatch(slice.actions.terminateEmployeeSuccess(response.data));
    toast.success("Terminate employee successfully");
    dispatch(getEmployeeList({ page: 1, limit: 10 }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const reactivateEmployee = (employeeId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(
      `/employees/reactivate/${employeeId}`
    );
    dispatch(slice.actions.reactivateEmployeeSuccess(response.data));
    toast.success("Reactivate employee successfully");
    dispatch(getEmployeeList({ page: 1, limit: 10 }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/employees/delete/${employeeId}`);
    dispatch(slice.actions.deleteEmployeeSuccess(response.data));
    toast.success("Delete employee successfully");
    dispatch(getEmployeeList({ page: 1, limit: 10 }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
