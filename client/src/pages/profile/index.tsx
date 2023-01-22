import React from "react";
import Info from "./Info";
import MarkedQuestions from "./MarkedQuestions";
import CreatedQuestions from "./CreatedQuestions";
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";

const Profile = () => {
  return (
    <Box minH="100vh" pt="4rem" px="1rem" bg="very-light-green">
      <Stack py="2rem" spacing="md" maxW="1200px" mx="auto">
        <Info />
        <MarkedQuestions />
        <CreatedQuestions />
      </Stack>
    </Box>
  );
};

export default Profile;
