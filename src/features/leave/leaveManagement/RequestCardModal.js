import { Box, Modal } from "@mui/material";
import React from "react";
import PendingRequestCard from "./PendingRequestCard";
import RequestCard from "./RequestCard";
import styled from "@emotion/styled";

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

function RequestCardModal({ request, open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxCard>
        {request.status === "pending" ? (
          <PendingRequestCard request={request} />
        ) : (
          <RequestCard request={request} />
        )}
      </BoxCard>
    </Modal>
  );
}

export default RequestCardModal;
