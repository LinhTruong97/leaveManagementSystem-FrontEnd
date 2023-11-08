import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { toPascalCase } from "../../utils/stringFormat";

function ProfileAvatar({ user }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CardContent>
        <Avatar
          alt={user.fullName}
          src={user.avatarUrl}
          sx={{
            width: 250,
            height: 250,
            m: "2rem auto 2rem auto",
          }}
        />
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 2 }}
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
