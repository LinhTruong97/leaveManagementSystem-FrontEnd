import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Popover,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecentNotification,
  markReadAllNotifications,
  markReadNotification,
} from "../features/notification/notificationSlice";
import NotificationItem from "./NotificationItem";
import { onMessageListener } from "../firebase";

const Notification = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [forceRerender, setForceRerender] = useState(false);

  const { pendingCount, notifications, totalPages } = useSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const setupMessageListener = async () => {
      try {
        await onMessageListener();
        dispatch(getRecentNotification({ page: 1 }));
      } catch (err) {
        console.log("Failed to listen for messages:", err);
      }
    };

    setupMessageListener();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRecentNotification({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPage(1);
    dispatch(getRecentNotification({ page: 1 }));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markReadAllNotifications());
    setForceRerender(true);
  };

  const handleMarkRead = (notificationId) => {
    dispatch(markReadNotification(notificationId));
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
        sx={{ overflowY: "auto" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            px: 2.5,
            minWidth: "300px",
          }}
        >
          <Typography variant="h6">All Notifications</Typography>
          {pendingCount > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton
                color={theme.palette.mode === "light" ? "primary" : "white"}
                onClick={handleMarkAllAsRead}
              >
                <DoneAllIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />

        <List disablePadding>
          {notifications.length !== 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                handleMarkRead={handleMarkRead}
                forceRerender={forceRerender}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: "center", pt: 1 }} variant="subtitle1">
              No notification
            </Typography>
          )}
        </List>
        <Divider sx={{ borderStyle: "dashed" }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 1,
          }}
        >
          {currentPage < totalPages && (
            <Button onClick={handleLoadMore}>
              <Typography
                variant="subtitle2"
                color={theme.palette.mode === "light" ? "primary" : "white"}
              >
                Load More
              </Typography>
            </Button>
          )}
        </Box>
      </Popover>
    </div>
  );
};

export default Notification;
