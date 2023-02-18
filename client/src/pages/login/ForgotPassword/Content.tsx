import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { Link } from "react-router-dom";

export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Box w="100%" minH="100vh" bg="very-light-green">
      <Stack mx="auto" py="5rem" maxW="1100px" w="95%">
        <Text variant="h3" m="0" children="Resetowanie hasła" />
        <Stack bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem">
          {children}
        </Stack>
        <Link to={"/zaloguj-sie"} className={"link"} children="Wróc do logowania" />
      </Stack>
    </Box>
  );
};
