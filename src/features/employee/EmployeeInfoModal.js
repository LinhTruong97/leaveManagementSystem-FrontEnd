import { Box, Button, Modal, Stack } from "@mui/material";
import React from "react";
import EmployeeInfoCard from "./EmployeeInfoCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useAuth from "../../hooks/useAuth";

const BoxCard = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: 700, md: "500px", lg: "500px" },
  backgroundColor: theme.palette.primary.lighter,
  borderRadius: 10,
  outline: "none",
  padding: 15,
}));

function EmployeeInfoModal({ onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { selectedEmployee } = useSelector((state) => state.employee);

  const handleClickUpdate = () => {
    navigate(`/employee-management/update-employee/${selectedEmployee._id}`);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-employee-info"
      aria-describedby="modal-modal-employee-info"
    >
      <BoxCard>
        <EmployeeInfoCard employee={selectedEmployee} />
        {user && user.role.name === "admin_office" && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "center", mt: 2 }}
          >
            <Button variant="outlined" onClick={handleClickUpdate}>
              Update
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Stack>
        )}
      </BoxCard>
    </Modal>
  );
}

export default EmployeeInfoModal;
