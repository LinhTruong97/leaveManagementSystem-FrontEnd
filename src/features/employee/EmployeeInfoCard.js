import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { toPascalCase } from "../../utils/stringFormat";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HomeIcon from "@mui/icons-material/Home";

import { EMPLOYEE_STATUS_COLOR } from "../../variables/constants";

function EmployeeInfoCard({ employee }) {
  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ m: 2 }}
      >
        <Avatar
          alt={employee.fullName}
          src={employee.avatarUrl}
          sx={{
            width: 100,
            height: 100,
            mr: "2rem",
          }}
        />
        <Stack>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
          >
            {employee.userName}
          </Typography>
          <Typography sx={{ textAlign: "center", mb: 1 }}>
            {toPascalCase(employee.role.name)}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Chip
              label={toPascalCase(employee.status)}
              color={EMPLOYEE_STATUS_COLOR(employee)}
            />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ m: 1 }}>
        <BadgeIcon />
        <Typography>{employee.fullName}</Typography>
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack direction="row" spacing={2} sx={{ m: 1 }}>
        <EmailIcon />
        <Typography>{employee.email}</Typography>
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack direction="row" spacing={2} sx={{ m: 1 }}>
        <PhoneIphoneIcon />
        <Typography>{employee.phone}</Typography>
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack direction="row" spacing={2} sx={{ m: 1 }}>
        <HomeIcon />
        <Typography>{employee.address}</Typography>
      </Stack>
    </Card>
  );
}

export default EmployeeInfoCard;
