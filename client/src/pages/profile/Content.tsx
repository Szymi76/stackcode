import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";

/*
  Wrapper dla całego komponentu profilu
*/

export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Box minH="100vh" pt="4rem" px="1rem" bg="very-light-green">
      <Stack py="2rem" spacing="md" maxW="1200px" mx="auto">
        {children}
      </Stack>
    </Box>
  );
};
