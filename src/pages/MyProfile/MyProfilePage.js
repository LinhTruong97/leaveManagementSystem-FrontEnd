import { Box, Container, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../features/myProfile/userSlice";
import LoadingScreen from "../../components/LoadingScreen";
import Breadcrumbs from "../../components/navigation/Breadcrumbs";
import ProfileAvatar from "../../features/myProfile/ProfileAvatar";
import ProfileDetailInfo from "../../features/myProfile/ProfileDetailInfo";

function MyProfilePage() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.myProfile);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {user && (
            <Box sx={{ mr: 2, mt: 2 }}>
              <Breadcrumbs />
              <Stack direction="row" justifyContent="flex-end"></Stack>
              <Grid container spacing={4}>
                <Grid item xs={5} sx={{ height: 500 }}>
                  <ProfileAvatar user={user} />
                </Grid>
                <Grid item xs={7} sx={{ height: 500 }}>
                  <ProfileDetailInfo user={user} height="500" />
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default MyProfilePage;
