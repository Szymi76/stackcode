import moment from "moment";
import CommentType from "../../types/Comment";

// komponenty
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const date = new Date(comment.createdAt);
  moment.locale("pl");
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

export default Comment;
