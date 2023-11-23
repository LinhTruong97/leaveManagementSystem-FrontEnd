import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { fToNow } from "../utils/timeFormat";
import EmailIcon from "@mui/icons-material/Email";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

function NotificationItem({
  notification,
  handleMarkRead,
  forceRerender,
  setOpen,
}) {
  const theme = useTheme();
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    setIsRead(notification.isRead);
  }, [notification.isRead, forceRerender]);

  const markAsRead = async () => {
    await handleMarkRead(notification._id);
    setIsRead(true);
  };

  const navigate = useNavigate();

  const handleClickNoti = async (notification) => {
    if (notification.type === "leave_submit") {
      await markAsRead();
      navigate("/leave-management");
      setOpen(false);
    } else if (
      notification.type === "leave_approve" ||
      notification.type === "leave_reject"
    ) {
      await markAsRead();
      navigate("/my-leaves");
      markAsRead();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        bgcolor: isRead ? "default" : "action.selected",
        position: "relative",
      }}
      onClick={() => handleClickNoti(notification)}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: theme.palette.mode === "light" ? "GREY[500]" : "white",
          }}
        >
          <EmailIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notification.message}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
              gap: 1,
            }}
          >
            <AccessTimeOutlinedIcon />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
      {!isRead && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            height: "14px",
            width: "14px",
            color: "purple",
          }}
          onClick={() => markAsRead()}
        >
          <CircleIcon sx={{ width: "12px" }} />
        </Box>
      )}
    </ListItemButton>
  );
}

export default NotificationItem;
