export const LEAVE_STATUS_OPTIONS = ["pending", "approved", "rejected"];

export const LEAVE_STATUS_COLOR = (request) =>
  request.status === "pending"
    ? "pending"
    : request.status === "approved"
    ? "success"
    : "error";

export const LEAVE_CATEGORY_OPTIONS = [
  "annual_leave",
  "sick_leave",
  "unpaid_leave",
];

//EMPLOYEE ROLE
export const EMPLOYEE_ROLE = {
  ADMIN_OFFICE: "admin_office",
  MANAGER: "manager",
  EMPLOYEE: "employee",
};
export const EMPLOYEE_ROLE_OPTIONS = [
  EMPLOYEE_ROLE.ADMIN_OFFICE,
  EMPLOYEE_ROLE.MANAGER,
  EMPLOYEE_ROLE.EMPLOYEE,
];

//EMPLOYEE STATUS
export const EMPLOYEE_STATUS_OPTIONS = ["pending", "active", "terminated"];

export const EMPLOYEE_STATUS_COLOR = (employee) =>
  employee.status === "pending"
    ? "pending"
    : employee.status === "active"
    ? "success"
    : "error";

// TIMEZONE DEFAULT
export const DEFAULT_TIMEZONE = "Asia/Bangkok";
