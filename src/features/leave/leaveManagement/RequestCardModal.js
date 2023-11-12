import { Box, Modal } from "@mui/material";
import React from "react";
import PendingRequestCard from "./PendingRequestCard";
import RequestCard from "./RequestCard";
import styled from "@emotion/styled";
import useAuth from "../../../hooks/useAuth";

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

function RequestCardModal({ request, open, onClose }) {
  const { user } = useAuth();
  console.log(request);
  console.log(user);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-request-leave"
      aria-describedby="modal-modal-request-leave"
    >
      <BoxCard>
        {request.status === "pending" &&
        request.requestedUser._id !== user._id ? (
          <PendingRequestCard request={request} />
        ) : (
          <RequestCard request={request} />
        )}
      </BoxCard>
    </Modal>
  );
}

export default RequestCardModal;
