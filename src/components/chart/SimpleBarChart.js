import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function SimpleBarChart({ data, fieldLabel, width, height, barColor }) {
  const xLabels = data.map((item) => item.label);
  const seriesData = data.map((item) => item.data);

  return (
    <BarChart
      width={width}
      height={height}
      series={[
        { data: seriesData, label: fieldLabel, type: "bar", color: barColor },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}

export default SimpleBarChart;
