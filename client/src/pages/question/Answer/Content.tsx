import Answer from "../../../types/Answers";
import moment from "moment";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { ModalStateReturn } from "@welcome-ui/modal";

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
      px="1.5rem"
      py=".5rem"
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
export type FooterProps = { answer: Answer; commentModal: ModalStateReturn };

export const Footer = ({ answer, commentModal }: FooterProps) => {
  // ile czasu temu pytanie zostało napisane
  const date = new Date(answer?.createdAt || "");
  moment.locale("poland");
  const time = moment(date).fromNow();

  return (
    <Stack>
      <Text
        variant="body2"
        fontWeight="500"
        color={{ hover: "green" }}
        cursor="pointer"
        children="Dodaj komentarz ★"
        w="min-content"
        whiteSpace="nowrap"
        onClick={() => commentModal.show()}
        mb="0"
      />
      <Flex wrap="wrap" align="center" justify="space-between">
        {/* wyświetlenia i data */}
        <Flex gap=".5rem">
          <Text m="0" color="gray" children={`licz. wyśw. ${answer.views} • ${time}`} />
        </Flex>

        {/* przez kogo i czy był edytowany */}
        <Flex align="center" m="0" color="gray">
          {/* {answer.updatedAt != answer.createdAt && <PencilSquareIcon height={15} />} */} {/* DO NAPRAWY  */}
          <Text m="0" children={`Autor: ${answer?.author.displayName}`} />
        </Flex>
      </Flex>
    </Stack>
  );
};
