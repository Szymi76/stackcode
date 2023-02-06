import Answer from "../../../types/Answer";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import moment from "moment";

/*
    Wrapper dla całego pytania (góra, środek, dół)
*/
export type WrapperProps = { children: React.ReactNode };

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Stack
      w="95%"
      mx="auto"
      position="relative"
      p="1.5rem"
      bg="white"
      border="1px solid"
      borderColor="light-gray"
      borderRadius="5">
      {children}
    </Stack>
  );
};

/*
    Góra dla kontentu pytania 
*/
export type HeaderProps = { answer: Answer | null };

export const Header = ({ answer }: HeaderProps) => {
  // ile czasu temu pytanie zostało napisane
  const date = new Date(answer?.createdAt || "");
  moment.locale("poland");
  const time = moment(date).fromNow();

  return (
    <Stack>
      {/* czas */}
      <Text variant="body2" mt="0" color="gray" children={time} />
    </Stack>
  );
};

/*
    Stopka dla kontentu pytania 
*/
export type FooterProps = { answer: Answer | null };

export const Footer = ({ answer }: FooterProps) => {
  return (
    <Flex justify="space-between">
      <Text m="0" variant="body3" color="gray" children={`licz. wyśw. ${answer?.views}`} />
      <Text m="0" variant="body3" color="gray" children={`Autor: ${answer?.author.displayName}`} />
    </Flex>
  );
};
