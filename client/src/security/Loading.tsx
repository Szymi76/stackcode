import React from "react";
import { Loader } from "@welcome-ui/loader";
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";

const Loading = () => {
  return (
    <Flex wrap="wrap" bg="very-light-green" h="100vh" justify="center" align="center" gap="1rem">
      <Text variant="h3" children="Czekanie aż twoje połączenie będzie bezpieczne" />
      <Loader color="green" size="md" />
    </Flex>
  );
};

export default Loading;
