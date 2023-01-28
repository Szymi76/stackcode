import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import React from "react";
import { Link } from "react-router-dom";

const TABS = ["Twoja nazwa", "Awatar", "Hasło", "Weryfikacja emailu", "Usuń konto"] as const;

interface SettingsWrapperProps {
  children: React.ReactNode;
  title: typeof TABS[number];
}

const SettingsWrapper = ({ children, title }: SettingsWrapperProps) => {
  return (
    <Box pt="5rem" minH="100vh" bg="very-light-green">
      <Stack w="95%" maxW="1100px" mx="auto">
        {/* tytuł */}
        <Text variant="h3" children={title} />

        {/* tabs */}
        <Flex overflowX="auto">
          {TABS.map((tab, i) => {
            return (
              <Link
                key={title + i}
                style={{ textDecoration: "none" }}
                to={`/ustawienia/${tab.toLowerCase().replaceAll(" ", "-")}`}>
                <Text
                  fontSize="lg"
                  whiteSpace="nowrap"
                  m="0"
                  py=".25rem"
                  px="1.25rem"
                  fontWeight="500"
                  borderBottom="2px solid"
                  borderColor={title == tab ? "green" : "light-gray"}
                  color={title == tab ? "green" : "gray"}
                  children={tab}
                />
              </Link>
            );
          })}
        </Flex>

        {/* kontener */}
        <Stack bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem" mt="1rem">
          {children}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SettingsWrapper;
