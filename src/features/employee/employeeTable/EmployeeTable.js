import { Table, TableBody, TableContainer } from "@mui/material";
import React from "react";
import EmployeeTableHead from "./EmployeeTableHead";
import EmployeeTableRow from "./EmployeeTableRow";
import EmployeeTableNoData from "./EmployeeTableNoData";

function EmployeeTable({ employeeList, handleOpenModal, startNo }) {
  return (
    <TableContainer>
      <Table>
        <EmployeeTableHead
          headLabel={[
            { id: "no", label: "#" },
            { id: "fullName", label: "Full Name" },
            { id: "role", label: "Role" },
            { id: "email", label: "Email" },
            { id: "status", label: "Status" },
            { id: "action" },
          ]}
        />
        <TableBody>
          {employeeList.map((employee, index) => (
            <EmployeeTableRow
              key={employee._id}
              employee={employee}
              handleOpenModal={handleOpenModal}
              no={index + startNo}
            />
          ))}

          {employeeList.length === 0 && <EmployeeTableNoData />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
