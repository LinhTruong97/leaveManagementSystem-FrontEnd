import { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Chip,
  IconButton,
  MenuItem,
  Popover,
  TableCell,
  TableRow,
} from "@mui/material";
import { toPascalCase } from "../../../../utils/stringFormat";
import { fDate } from "../../../../utils/timeFormat";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteLeave, getSingleLeave } from "../myLeaveSlice";
import { LEAVE_STATUS_COLOR } from "../../../../variables/constants";

export default function RequestTableRow({ request, handleOpenModal }) {
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

    dispatch(getSingleLeave(request._id));
    setOpenPopover(null);
  };
  const handleClickUpdate = () => {
    navigate(`/my-leaves/update-leave/${request._id}`);
  };
  const handleClickDelete = () => {
    dispatch(deleteLeave(request._id));
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell align="center">{fDate(request.fromDate)}</TableCell>

        <TableCell align="center">{fDate(request.toDate)}</TableCell>

        <TableCell align="center">{request.totalDays}</TableCell>

        <TableCell align="center">
          {toPascalCase(request.category.name)}
        </TableCell>

        <TableCell align="center">
          <Chip
            label={toPascalCase(request.status)}
            color={LEAVE_STATUS_COLOR(request)}
          />
        </TableCell>

        <TableCell align="left">
          <IconButton onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
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
        <MenuItem onClick={handleClickDelete} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
