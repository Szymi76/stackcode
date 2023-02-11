import Question from "../../types/Question";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Flex } from "@welcome-ui/flex";
import { Loader } from "@welcome-ui/loader";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { useNavigate } from "react-router-dom";

/*
  Wrapper dla listy pytań
*/

export type WrapperProps = { children: React.ReactNode; label: string; refetch: () => void };

export const Wrapper = ({ children, label, refetch }: WrapperProps) => {
  return (
    <Stack mt="2.5rem">
      {/* header */}
      <Flex align="center" justify="space-between">
        <Text variant="h3" my=".25rem" children={label} />
        <ArrowPathIcon className="move-down" height={30} onClick={refetch} />
      </Flex>
      {children}
    </Stack>
  );
};

/*
  Biały kontener z kontentem
*/

export type ContentProps = { children: React.ReactNode };

export const Content = ({ children }: ContentProps) => {
  return (
    <Stack bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem">
      {children}
    </Stack>
  );
};

/*
  Ładowanie pytań
*/

export const Loading = () => {
  return <Flex py="2rem" justify="center" children={<Loader color="green" />} />;
};

/*
  Wrapper dla pojedyńczego wiersza z pytaniem
*/

export type RowProps = { children: React.ReactNode; question: Question };

export const Row = ({ children, question }: RowProps) => {
  const navigate = useNavigate();

  return (
    <Flex align="center" justify="space-between" borderBottom="1px solid" borderColor="light-gray">
      {/* tytył */}
      <Text
        variant="h4"
        w="50%"
        my=".75rem"
        fontWeight="500"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        cursor="pointer"
        color={{ hover: "green" }}
        textDecoration={{ hover: "underline" }}
        transitionDuration={50}
        children={question.title}
        onClick={() => navigate(`/pytanie/${question._id}`)}
      />
      {children}
    </Flex>
  );
};

/*
  Napisz do pokazywania / ukrywania wszystkich pytań z listy
*/

export type ToggleProps = { isAllShowed: boolean; lengthOfQuestions: number | string; toggleIsAllShowed: () => void };

export const Toggle = ({ isAllShowed, lengthOfQuestions, toggleIsAllShowed }: ToggleProps) => {
  return (
    <Text
      textAlign="center"
      variant="body3"
      color="green"
      textDecoration="underline"
      children={isAllShowed ? "ukryj" : `pokaż wszystkie (${lengthOfQuestions})`}
      cursor="pointer"
      onClick={toggleIsAllShowed}
      m="0"
    />
  );
};
