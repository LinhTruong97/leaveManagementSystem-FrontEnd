import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getDay, getMonth } from "../../../utils/timeFormat";
import { Box, CardHeader, Chip } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { toPascalCase } from "../../../utils/stringFormat";
import { LEAVE_STATUS_COLOR } from "../../../variables/constants";

const RequestDetailCard = ({ request }) => {
  return (
    <Card sx={{ m: 3, width: "400px", boxShadow: "none" }}>
      <CardHeader
        sx={{
          textAlign: "center",
          "& .MuiTypography-root": {
            fontSize: 30,
            fontWeight: 600,
            color: "primary.dark",
          },
          p: 0,
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
                fontSize: 20,
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 5,
            mb: 2,
          }}
        >
          <Box>
            <Typography sx={{ textAlign: "center" }}>
              {getMonth(request.fromDate).toUpperCase()}
            </Typography>
            <Box
              sx={{
                border: "1px solid #919EAB",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                width: 50,
                height: 50,
                alignItems: "center",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {getDay(request.fromDate)}
            </Box>
          </Box>
          <Box>
            <EastIcon sx={{ fontSize: "40px", mt: 3 }} />
            <Typography sx={{ textAlign: "center" }}>
              {request.totalDays > 1
                ? `${request.totalDays} days`
                : `${request.totalDays} day`}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ textAlign: "center" }}>
              {getMonth(request.toDate).toUpperCase()}
            </Typography>
            <Box
              sx={{
                border: "1px solid #919EAB",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                width: 50,
                height: 50,
                alignItems: "center",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {getDay(request.toDate)}
            </Box>
          </Box>
        </Box>

        <Box sx={{ border: "1px solid #919EAB", borderRadius: "5px", p: 3 }}>
          <Typography>{request.reason}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequestDetailCard;
