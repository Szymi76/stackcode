import Question from "../../../types/Question";
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
export type HeaderProps = { question: Question | null };

export const Header = ({ question }: HeaderProps) => {
  // ile czasu temu pytanie zostało napisane
  const date = new Date(question?.createdAt || "");
  moment.locale("poland");
  const time = moment(date).fromNow();

  return (
    <Stack>
      {/* tytuł */}
      <Text variant="h3" m="0" mr="1rem" color="black" children={question?.title} />

      {/* tagi */}
      <Flex gap=".25rem">
        {question?.tags.map((tag, i) => (
          <Tag key={`tag-${i}`} variant="3" children={tag} size="sm" />
        ))}
      </Flex>

      {/* czas */}
      <Text variant="body2" mt="0" color="gray" children={time} />
    </Stack>
  );
};

/*
    Stopka dla kontentu pytania 
*/
export type FooterProps = { question: Question | null };

export const Footer = ({ question }: FooterProps) => {
  return (
    <Flex justify="space-between">
      <Text m="0" variant="body3" color="gray" children={`licz. wyśw. ${question?.views}`} />
      <Text m="0" variant="body3" color="gray" children={`Autor: ${question?.author.displayName}`} />
    </Flex>
  );
};
