import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { fToNow } from "../utils/timeFormat";
import EmailIcon from "@mui/icons-material/Email";
function NotificationItem({ notification }) {
  const theme = useTheme();
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.isRead && {
          bgcolor: "action.selected",
        }),
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
    </ListItemButton>
  );
}

export default NotificationItem;
