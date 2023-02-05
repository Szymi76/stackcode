import { Box } from "@welcome-ui/box";
import { Field } from "@welcome-ui/field";
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";
import React from "react";

export const QuestionActionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box minH="100vh" py="6rem" px="1rem" bg="very-light-green">
      {/* wrapper */}
      <Flex direction="column" maxW="1100px" mx="auto" gap=".75rem">
        {children}
      </Flex>
    </Box>
  );
};

export const QuestionFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      direction="column"
      gap="1.75rem"
      bg="white"
      border="1px solid"
      borderColor="light-gray"
      borderRadius="5"
      p="1.5rem">
      {children}
    </Flex>
  );
};
