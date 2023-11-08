import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import TotalCard from "../../components/card/TotalCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleBarChart from "../../components/chart/SimpleBarChart";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "@emotion/react";

function ManagementView() {
  const theme = useTheme();
  const { user } = useAuth();
  const { totalEmployees } = useSelector((state) => state.employee);
  const { totalPendingCount, leaveByMonth, totalApprovedLeave } = useSelector(
    (state) => state.employeeLeave
  );
  const navigate = useNavigate();
  const handleClickEmployee = () => {
    navigate("/employee-management");
  };
  const handleClickLeave = () => {
    navigate("/leave-management");
  };

  return (
    <Grid container sx={{ mx: 2, my: 5 }}>
      <Stack direction="row" justifyContent="space-between" spacing={8}>
        <Grid xs={4}>
          <TotalCard
            title={
              user.role.name === "manager"
                ? "Total Incharge Employees"
                : "Total Employees"
            }
            number={totalEmployees}
            sx={{
              width: "300px",
              p: 2,
              textAlign: "center",
              color: "primary.darker",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            children={
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleClickEmployee}
              >
                Details
              </Button>
            }
          />
        </Grid>
        <Grid xs={4}>
          <TotalCard
            title="Total Pending Request"
            number={totalPendingCount}
            sx={{
              width: "300px",
              p: 2,
              textAlign: "center",
              color: "primary.darker",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            children={
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleClickLeave}
              >
                Details
              </Button>
            }
          />
        </Grid>
        <Grid xs={4}>
          <TotalCard
            title="Total Approved Leaves"
            number={totalApprovedLeave}
            sx={{
              width: "300px",
              p: 2,
              textAlign: "center",
              color: "primary.darker",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
            children={
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleClickLeave}
              >
                Details
              </Button>
            }
          />
        </Grid>
      </Stack>

      <Grid
        xs={12}
        sx={{
          mt: 8,
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <SimpleBarChart
          data={leaveByMonth}
          fieldLabel="Total Leaves Taken"
          width="700"
          height="300"
          barColor={theme.palette.primary.main}
        />
      </Grid>
    </Grid>
  );
}

export default ManagementView;
