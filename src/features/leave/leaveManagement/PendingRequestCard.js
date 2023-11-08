import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";

import { getDay, getMonth } from "../../../utils/timeFormat";
import ApproveIcon from "../../../components/icon/ApproveIcon";
import RejectIcon from "../../../components/icon/RejectIcon";
import styled from "@emotion/styled";
import { toPascalCase } from "../../../utils/stringFormat";
import { useDispatch } from "react-redux";
import { approveLeave, rejectLeave } from "./employeeLeaveSlice";

const DateBox = styled(Box)(() => ({
  border: "1px solid #919EAB",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  width: 40,
  height: 40,
  alignItems: "center",
  fontSize: 15,
  fontWeight: 700,
}));

function PendingRequestCard({ request }) {
  const dispatch = useDispatch();

  const handleClickApprove = () => {
    dispatch(approveLeave(request._id));
  };

  const handleClickReject = () => {
    dispatch(rejectLeave(request._id));
  };

  return (
    <Card sx={{ width: "250px", m: 2 }}>
      <CardHeader
        title={toPascalCase(request.category.name)}
        sx={{
          "& .MuiTypography-root": {
            fontSize: 20,
            fontWeight: 600,
          },
          textAlign: "center",
          padding: 0,
          paddingTop: 2,
        }}
      />
      <CardContent>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Avatar
            alt={request.requestedUser.fullName}
            src={request.requestedUser.avatarUrl}
            sx={{
              width: 50,
              height: 50,
              mr: "1rem",
            }}
          />
          <Stack>
            <Typography
              variant="h7"
              sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
            >
              {request.requestedUser.fullName}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={4}
          alignItems="flex-start"
          sx={{
            my: 2,
          }}
        >
          <Stack>
            <Typography sx={{ textAlign: "center" }} variant="subtitle2">
              {getMonth(request.fromDate).toUpperCase()}
            </Typography>
            <DateBox>{getDay(request.fromDate)}</DateBox>
          </Stack>
          <Box>
            <EastIcon sx={{ fontSize: "40px", mt: 3 }} />
            <Typography sx={{ textAlign: "center" }}>
              {request.totalDays > 1
                ? `${request.totalDays} days`
                : `${request.totalDays} day`}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ textAlign: "center" }} variant="subtitle2">
              {getMonth(request.toDate).toUpperCase()}
            </Typography>
            <DateBox>{getDay(request.toDate)}</DateBox>
          </Box>
        </Stack>
        <Box sx={{ border: "1px solid #919EAB", borderRadius: "5px", p: 3 }}>
          <Typography>{request.reason}</Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{ width: "50%", mt: 1, mx: "auto" }}
        >
          <ApproveIcon
            sx={{ fontSize: "30px" }}
            handleClickApprove={handleClickApprove}
          />
          <RejectIcon
            sx={{ fontSize: "30px" }}
            handleClickReject={handleClickReject}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PendingRequestCard;
