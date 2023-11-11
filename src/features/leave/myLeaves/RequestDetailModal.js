import { Box, Button, Modal, Stack } from "@mui/material";
import React from "react";
import RequestDetailCard from "./RequestDetailCard";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLeave } from "./myLeaveSlice";

const BoxCard = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: 700, md: "500px", lg: "500px" },
  backgroundColor: theme.palette.primary.lighter,
  borderRadius: 10,
  outline: "none",
  padding: 20,
}));

function RequestDetailModal({ onClose }) {
  const navigate = useNavigate();
  const { selectedRequest } = useSelector((state) => state.myLeave);
  const dispatch = useDispatch();

  const handleClickUpdate = () => {
    navigate(`/my-leaves/update-leave/${selectedRequest._id}`);
  };
  const handleClickDelete = () => {
    dispatch(deleteLeave(selectedRequest._id));
    onClose();
  };
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-request-leave"
      aria-describedby="modal-modal-request-leave"
    >
      <BoxCard>
        <RequestDetailCard request={selectedRequest} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "center", mt: 2, mx: 2 }}
        >
          <Stack direction={{ xs: "row" }} spacing={2}>
            <Button variant="contained" onClick={handleClickUpdate}>
              Update
            </Button>
            <Button variant="contained" onClick={handleClickDelete}>
              Delete
            </Button>
          </Stack>

          <Stack direction={{ xs: "row" }} justifyContent="center">
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Stack>
        </Stack>
      </BoxCard>
    </Modal>
  );
}

export default RequestDetailModal;
