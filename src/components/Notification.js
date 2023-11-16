import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { onMessageListener } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingNotification,
  getRecentNotification,
} from "../features/notification/notificationSlice";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const dispatch = useDispatch();
  const { pendingCount, recentNotifications } = useSelector(
    (state) => state.notification
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getRecentNotification());
    dispatch(getPendingNotification());
  }, [dispatch]);

  const messageListener = async () => {
    try {
      await onMessageListener();
      dispatch(getPendingNotification());
    } catch (err) {
      console.log("Failed to listen for messages:", err);
    }
  };
  messageListener();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {};

  return (
    <div>
      <IconButton color="inherit" sx={{ mr: 3 }} onClick={handleOpen}>
        <NotificationsIcon />
        {pendingCount > 0 && (
          <Badge badgeContent={pendingCount} color="error" />
        )}
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
            px: 2.5,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Recent Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {pendingCount} unread messages
            </Typography>
          </Box>

          {pendingCount > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />

        <List disablePadding>
          {recentNotifications &&
            recentNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
        </List>
      </Popover>
    </div>
  );
};

export default Notification;
