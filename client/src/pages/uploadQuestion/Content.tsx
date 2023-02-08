import React from "react";
import * as WU from "@welcome-ui/field";
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { Text } from "@welcome-ui/text";

/*
  Wrapper dla całego komponentu
*/

export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Box minH="100vh" py="6rem" px="1rem" bg="very-light-green">
      {/* wrapper */}
      <Flex direction="column" maxW="1100px" mx="auto" gap=".75rem">
        {children}
      </Flex>
    </Box>
  );
};

/*
  Wrapper dla pól tekstowych
*/

export type FormProps = { children: React.ReactNode };

export const Form = ({ children }: FormProps) => {
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

/*
  Wrapper dla pola tekstowego 
*/

export type FieldProps = WU.FieldProps & { errorsField: string | undefined };

export const Field = (props: FieldProps) => {
  return (
    <WU.Field {...props} error={props.errorsField && <Text variant="body4" mt=".25rem" children={props.errorsField} />}>
      {props.children}
    </WU.Field>
  );
};
