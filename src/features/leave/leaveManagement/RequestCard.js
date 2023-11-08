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
import styled from "@emotion/styled";
import { toPascalCase } from "../../../utils/stringFormat";

const DateBox = styled(Box)(() => ({
  border: "1px solid #000",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  width: 40,
  height: 40,
  alignItems: "center",
  fontSize: 15,
  fontWeight: 700,
}));

function RequestCard({ request }) {
  return (
    <Card sx={{ width: "300px", m: 2 }}>
      <CardHeader
        title={toPascalCase(request.category.name)}
        sx={{ fontSize: 10, textAlign: "center" }}
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
        <Box sx={{ border: "1px solid #000", borderRadius: "5px", p: 3 }}>
          <Typography>{request.reason}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RequestCard;
