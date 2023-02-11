import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";

/*
  Wrapper dla informacji użytkownika
*/

export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Stack>
      <Text variant="h2" my=".25rem" children="Profil" />
      {children}
    </Stack>
  );
};

/*
  Lista informacji o użytkowniku
*/

export type ListProps = { children: React.ReactNode };

export const List = ({ children }: ListProps) => {
  return (
    <Flex wrap="wrap" columnGap="3rem" bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem">
      {children}
    </Flex>
  );
};

/*
  Pojedyńcze pole z informacją 
*/

export type SingleProps = { children: React.ReactNode; label: string };

export const Single = ({ children, label }: SingleProps) => {
  return (
    <Box>
      <Text color="gray" children={label} />
      {children}
    </Box>
  );
};
