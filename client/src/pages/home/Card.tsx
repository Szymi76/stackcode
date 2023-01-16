import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface CardTypes {
  number: number;
  text: string;
}

const Card = ({ number, text }: CardTypes) => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      bg="light-green"
      border="1px solid"
      borderColor="dark-green"
      p="1rem">
      <Text variant="h2" color="black" fontWeight="500" children={`0${number}`} />
      <Text children={text} maxW="11rem" fontWeight="500" fontSize="1.1em" mt="0" mb="2rem" />
      <Box bg="dark-green" borderRadius="9999px" w="2rem" h="2rem" p=".25rem">
        <ChevronRightIcon color="white" />
      </Box>
    </Flex>
  );
};

export default Card;
