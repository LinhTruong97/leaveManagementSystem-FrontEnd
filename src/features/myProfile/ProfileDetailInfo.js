import React from "react";
import {
  Typography,
  Stack,
  Box,
  Card,
  Divider,
  useMediaQuery,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ContactPhoneRoundedIcon from "@mui/icons-material/ContactPhoneRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import { toPascalCase } from "../../utils/stringFormat";
import { fDate } from "../../utils/timeFormat";
import UpdateIcon from "../../components/icon/UpdateIcon";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileDetailInfo({ user }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card sx={{ height: "100%", p: 2 }}>
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography
            variant="h5"
            sx={{
              letterSpacing: 1,
              color:
                theme.palette.mode === "light"
                  ? "primary.darker"
                  : "primary.light",
              fontWeight: 600,
            }}
          >
            CONTACT INFORMATION
          </Typography>
          <UpdateIcon
            sx={{
              fontSize: isSm ? 40 : 30,
              color:
                theme.palette.mode === "light"
                  ? "primary.main"
                  : "primary.light",
              mb: 1,
            }}
          />
        </Stack>
        <Stack spacing={2}>
          <Stack direction="row">
            <IconStyle>
              <EmailRoundedIcon />
            </IconStyle>
            <Typography variant="subtitle1" color="text.primary">
              {user.email}
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle>
              <ContactPhoneRoundedIcon />
            </IconStyle>
            <Typography variant="subtitle1" color="text.primary">
              {user.phone}
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle>
              <FmdGoodRoundedIcon />
            </IconStyle>
            <Typography variant="subtitle1" color="text.primary">
              {user.address}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider orientation="horizontal" sx={{ ml: 3, mr: 3 }} />
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            letterSpacing: 1,
            color:
              theme.palette.mode === "light"
                ? "primary.darker"
                : "primary.light",
            fontWeight: 600,
          }}
        >
          BASIC INFORMATION
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ width: "80px", textDecoration: "underline" }}
            >
              Full Name
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {user.fullName}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ width: "80px", textDecoration: "underline" }}
            >
              Gender
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {toPascalCase(user.gender)}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ width: "80px", textDecoration: "underline" }}
            >
              Birthday
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {fDate(user.birthday)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export default ProfileDetailInfo;
