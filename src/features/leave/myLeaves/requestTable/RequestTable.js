import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import RequestTableHead from "./RequestTableHead";
import RequestTableRow from "./RequestTableRow";
import RequestTableNoData from "./RequestTableNoData";

function RequestTable({ requests, handleOpenModal }) {
  return (
    <TableContainer sx={{ overflow: "unset" }}>
      <Table sx={{ minWidth: 800 }}>
        <RequestTableHead
          headLabel={[
            { id: "fromDate", label: "From Date" },
            { id: "toDate", label: "To Date" },
            { id: "totalDays", label: "Total Days" },
            { id: "category", label: "Category" },
            { id: "status", label: "Status" },
            { id: "action" },
          ]}
        />
        <TableBody>
          {requests.map((request) => (
            <RequestTableRow
              key={request._id}
              request={request}
              handleOpenModal={handleOpenModal}
            />
          ))}

          {requests.length === 0 && <RequestTableNoData />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RequestTable;
