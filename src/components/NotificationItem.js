import {
  Avatar,
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

function NotificationItem({ notification, handleMarkRead, forceRerender }) {
  const theme = useTheme();
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    setIsRead(notification.isRead);
  }, [notification.isRead, forceRerender]);

  const markAsRead = async () => {
    await handleMarkRead(notification._id);
    setIsRead(true);
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        bgcolor: isRead ? "default" : "action.selected",
      }}
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
        <ListItemButton
          onClick={markAsRead}
          sx={{
            height: "12px",
            width: "12px",
            color: "red",
          }}
        >
          <CircleIcon sx={{ width: "12px" }} />
        </ListItemButton>
      )}
    </ListItemButton>
  );
}

export default NotificationItem;
