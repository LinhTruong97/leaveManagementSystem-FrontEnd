import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  Chip,
  IconButton,
  MenuItem,
  Popover,
  TableCell,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toPascalCase } from "../../../utils/stringFormat";
import {
  deleteEmployee,
  getSingleEmployee,
  reactivateEmployee,
  terminateEmployee,
} from "../employeeSlice";
import { EMPLOYEE_STATUS_COLOR } from "../../../variables/constants";
import useAuth from "../../../hooks/useAuth";

export default function EmployeeTableRow({ employee, handleOpenModal, no }) {
  const { user } = useAuth();
  const [openPopover, setOpenPopover] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenPopover(null);
  };
  const handleClickView = () => {
    handleOpenModal();
    dispatch(getSingleEmployee(employee._id));
    setOpenPopover(null);
  };
  const handleClickUpdate = () => {
    navigate(`/employee-management/update-employee/${employee._id}`);
  };
  const handleClickTerminate = () => {
    dispatch(terminateEmployee(employee._id));
  };
  const handleClickReactivate = () => {
    dispatch(reactivateEmployee(employee._id));
  };
  const handleClickDelete = () => {
    dispatch(deleteEmployee(employee._id));
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center">{no}</TableCell>

        <TableCell align="center">{employee.fullName}</TableCell>

        <TableCell align="center">{toPascalCase(employee.role.name)}</TableCell>

        <TableCell align="center">{employee.email}</TableCell>

        <TableCell align="center">
          <Chip
            label={toPascalCase(employee.status)}
            color={EMPLOYEE_STATUS_COLOR(employee)}
          />
        </TableCell>

        <TableCell align="right">
          {user && user.role.name === "admin_office" ? (
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <Button onClick={handleClickView} variant="outlined">
              View
            </Button>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleClickView}>View</MenuItem>
        <MenuItem onClick={handleClickUpdate}>Update</MenuItem>
        <MenuItem onClick={handleClickTerminate}>Terminate</MenuItem>
        <MenuItem onClick={handleClickReactivate}>Reactivate</MenuItem>
        <MenuItem onClick={handleClickDelete} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
