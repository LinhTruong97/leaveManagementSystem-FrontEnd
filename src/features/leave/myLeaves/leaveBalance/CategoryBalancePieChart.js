import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Card, Typography } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { fData } from "../../../../utils/numberFormat";
import { toPascalCase } from "../../../../utils/stringFormat";
import { useTheme } from "@emotion/react";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 16,
  fontWeight: 600,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function CategoryBalancePieChart({ item, title }) {
  const theme = useTheme();
  const totalRemaining = item.leaveCategory.totalDays - item.totalUsed;
  return (
    <Card
      sx={{
        width: 300,
        height: 300,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mt: 2 }}>
        {toPascalCase(item.leaveCategory.name)}
      </Typography>
      <PieChart
        series={[
          {
            data: [
              {
                label: fData(item.totalUsed) + " Used",
                value: item.totalUsed,
                color: theme.palette.pending.dark,
              },
              {
                label:
                  item.leaveCategory.totalDays <= 0
                    ? " Unlimited "
                    : fData(totalRemaining) + " Remaining",
                value:
                  item.leaveCategory.totalDays === 0 && totalRemaining === 0
                    ? 50
                    : totalRemaining,
                color: theme.palette.primary.light,
              },
            ],
            innerRadius: 50,
            outerRadius: 80,
          },
        ]}
        margin={{ top: 100, bottom: 200, left: 100, right: 100 }}
        tooltip={{ hidden: true }}
        slotProps={{
          legend: {
            padding: 200,
            position: { vertical: "top", horizontal: "middle" },
          },
        }}
      >
        <PieCenterLabel>
          {item.leaveCategory.totalDays
            ? "Total " + item.leaveCategory.totalDays
            : "Unlimited"}
        </PieCenterLabel>
      </PieChart>
    </Card>
  );
}

export default CategoryBalancePieChart;