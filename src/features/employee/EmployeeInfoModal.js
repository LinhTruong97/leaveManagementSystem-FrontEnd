import { Box, Button, Modal, Stack } from "@mui/material";
import React from "react";
import EmployeeInfoCard from "./EmployeeInfoCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useAuth from "../../hooks/useAuth";

const BoxCard = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 1000, lg: "500px" },
  backgroundColor: "#fff",
  borderRadius: 10,
  outline: "none",
  padding: 40,
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxCard>
        <EmployeeInfoCard employee={selectedEmployee} />
        {user && user.role.name === "admin_office" && (
          <Stack spacing={2} sx={{ justifyContent: "center", mt: 3 }}>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Button variant="outlined" onClick={handleClickUpdate}>
                Update
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            </Stack>
          </Stack>
        )}
      </BoxCard>
    </Modal>
  );
}

export default EmployeeInfoModal;
