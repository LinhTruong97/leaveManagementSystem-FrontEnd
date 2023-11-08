import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import MyProfilePage from "../pages/MyProfile/MyProfilePage";
import EmploymentManagementPage from "../pages/EmploymentManagement/EmploymentManagementPage";
import MyLeavesPage from "../pages/MyLeaves/MyLeavesPage";
import HomePage from "../pages/HomePage";
import AuthRequire from "./AuthRequire";
import LeaveManagementPage from "../pages/LeaveManagement/LeaveManagementPage";
import UpdateMyProfilePage from "../pages/MyProfile/UpdateMyProfilePage";
import ApplyLeavePage from "../pages/MyLeaves/ApplyLeavePage";
import UpdateLeavePage from "../pages/MyLeaves/UpdateLeavePage";
import AddEmployeePage from "../pages/EmploymentManagement/AddEmployeePage";
import UpdateEmployeePage from "../pages/EmploymentManagement/UpdateEmployeePage";
import RoleAuth from "./RoleAuth";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        {/* MY PROFILE */}
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route
          path="/my-profile/update-profile"
          element={<UpdateMyProfilePage />}
        />
        {/* EMPLOYEE MANAGEMENT */}
        <Route
          path="/employee-management"
          element={
            <RoleAuth requiredRoles={["manager", "admin_office"]}>
              <EmploymentManagementPage />
            </RoleAuth>
          }
        />
        <Route
          path="/employee-management/add-employee"
          element={
            <RoleAuth requiredRoles={["admin_office"]}>
              <AddEmployeePage />
            </RoleAuth>
          }
        />

        <Route
          path="/employee-management/update-employee/:employeeId"
          element={
            <RoleAuth requiredRoles={["admin_office"]}>
              <UpdateEmployeePage />
            </RoleAuth>
          }
        />

        {/* MY LEAVES */}
        <Route path="/my-leaves" element={<MyLeavesPage />} />
        <Route path="/my-leaves/apply-leave" element={<ApplyLeavePage />} />
        <Route
          path="/my-leaves/update-leave/:requestId"
          element={<UpdateLeavePage />}
        />
        {/* LEAVE MANAGEMENT */}
        <Route
          path="/leave-management"
          element={
            <RoleAuth requiredRoles={["manager", "admin_office"]}>
              <LeaveManagementPage />
            </RoleAuth>
          }
        />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
