import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toPascalCase } from "../../utils/stringFormat";

function ProfileAvatar({ user }) {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  const widthHeightAvatar = isXl ? 250 : 200;

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CardContent>
        <Avatar
          alt={user.fullName}
          src={user.avatarUrl}
          sx={{
            width: widthHeightAvatar,
            height: widthHeightAvatar,
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", my: 2 }}
        >
          {user.userName}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {toPascalCase(user.role.name)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfileAvatar;
