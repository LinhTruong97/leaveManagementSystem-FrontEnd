import { Box, Button, Modal, Stack } from "@mui/material";
import React from "react";
import RequestDetailCard from "./RequestDetailCard";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLeave } from "./myLeaveSlice";

const BoxCard = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 1000 },
  backgroundColor: "#fff",
  borderRadius: 10,
  outline: "none",
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
          direction="row"
          spacing={2}
          sx={{ justifyContent: "center", m: 3 }}
        >
          <Button variant="contained" onClick={handleClickUpdate}>
            Update
          </Button>
          <Button variant="contained" onClick={handleClickDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </BoxCard>
    </Modal>
  );
}

export default RequestDetailModal;
