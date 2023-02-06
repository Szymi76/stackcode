import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import moment from "moment";
import Comment from "../../../types/Comment";

/* 
    Wrapper dla wszystkich komentarzy
*/
export type WrapperProps = { children: React.ReactNode; commentsVisible: boolean };

export const Wrapper = ({ children, commentsVisible }: WrapperProps) => {
  return (
    <Stack
      py={commentsVisible ? ".5rem" : "0"}
      h="100%"
      maxH={commentsVisible ? "3000px" : "0px"}
      overflow="hidden"
      transitionDuration={100}>
      {children}
    </Stack>
  );
};

/* 
    Górna część wszystkich komentarzy
*/
export type HeaderProps = { toggleCommentsVisibility: () => void };

export const Header = ({ toggleCommentsVisibility }: HeaderProps) => {
  return (
    <Flex justify="center" align="center" mb="1rem">
      <Box w="45%" h="1px" bg="light-gray" />
      <Text
        color={{ _: "gray", hover: "green" }}
        cursor="pointer"
        whiteSpace="nowrap"
        mx="1.5rem"
        children="ukryj komentarze"
        onClick={toggleCommentsVisibility}
      />
      <Box w="45%" h="1px" bg="light-gray" />
    </Flex>
  );
};

/* 
    Pojedyńczy komentarz
*/
export type SingleProps = { comment: Comment };

export const Single = ({ comment }: SingleProps) => {
  const date = new Date(comment.createdAt);
  moment.locale("polish");
  const time = moment(date).fromNow();

  return (
    <Stack border="1px solid" borderColor="light-gray" borderRadius={5} py=".5rem" px="1rem">
      {/* góra */}
      <Flex justify="space-between">
        <Flex align="center" gap="1rem">
          <img src={comment.author.photoURL} height={40} width={40} style={{ borderRadius: "9999px" }} />
          <Text color="gray" fontWeight="500" children={comment.author.displayName} />
        </Flex>
        <Text color="gray" children={time} />
      </Flex>

      {/* kontent */}
      <Text children={comment.content} mt="0" />
    </Stack>
  );
};
