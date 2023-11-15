import React, { useState, useEffect } from "react";
import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { onMessageListener, requestForToken } from "../firebase";

const Notification = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    requestForToken();
  }, []);

  onMessageListener()
    .then(() => {
      // Use the functional form of state update to ensure correct updates
      setNotificationCount((prevCount) => prevCount + 1);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div>
      {/* Bell icon with notification badge */}
      <IconButton color="inherit">
        <NotificationsIcon />
        {/* Notification badge with count */}
        {notificationCount > 0 && (
          <Badge badgeContent={notificationCount} color="error">
            {/* You can customize the Badge styling further */}
          </Badge>
        )}
      </IconButton>
    </div>
  );
};

export default Notification;
