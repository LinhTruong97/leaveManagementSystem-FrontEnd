import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getDay, getMonth } from "../../../utils/timeFormat";
import { Box, CardHeader, Chip, Stack } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { toPascalCase } from "../../../utils/stringFormat";
import { LEAVE_STATUS_COLOR } from "../../../variables/constants";
import styled from "@emotion/styled";

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

const RequestDetailCard = ({ request }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        sx={{
          textAlign: "center",
          "& .MuiTypography-root": {
            fontSize: 20,
            fontWeight: 600,
            color: "primary.dark",
          },
          padding: 0,
          paddingTop: 2,
        }}
        title={toPascalCase(request.category.name)}
      />
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Chip
            label={toPascalCase(request.status)}
            color={LEAVE_STATUS_COLOR(request)}
            size="large"
            sx={{
              "&.MuiChip-root ": {
                fontSize: 18,
              },
            }}
          />
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={{ xs: 2, sm: 4 }}
          alignItems="flex-start"
          my={{ xs: 0, sm: 2 }}
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
      </CardContent>
    </Card>
  );
};

export default RequestDetailCard;
