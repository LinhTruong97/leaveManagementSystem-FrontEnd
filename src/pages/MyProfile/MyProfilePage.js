import { Box, Container, Grid } from "@mui/material";
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
            <Box sx={{ my: 2 }}>
              <Breadcrumbs />
              <Grid container spacing={2}>
                <Grid item xs={12} xl={5}>
                  <ProfileAvatar user={user} />
                </Grid>
                <Grid item xs={12} xl={7}>
                  <ProfileDetailInfo user={user} />
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
