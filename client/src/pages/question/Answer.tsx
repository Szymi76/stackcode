import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Tag } from "@welcome-ui/tag";
import { Stack } from "@welcome-ui/stack";
import AnswerType from '../../types/Answer';

interface AnswerProps {
    answer: Answer;
}

const Answer = ({ answer }: AnswerProps) => {
    
  // @ts-ignore
  const html = new QuillDeltaToHtmlConverter(answer.content.ops, {}).convert();

  return (
    <Flex>
      {/* lewa kolumna */}
      <Stack w="5%" textAlign="center" spacing="md">
        {/* ZNACZEK WERYFIKACJI */}
        {/* TUTAJ */}
        {/* ZNACZEK WERYFIKACJI */}
        <ChevronUpIcon height={35} />
        <Text variant="h3" fontWeight="500" m="0" color="black" children={question?.votes.up.length} />
        <ChevronDownIcon height={35} />
      </Stack>

      {/* środek */}
      <Stack w="90%" p="1.5rem" bg="white" border="1px solid" borderColor="light-gray" borderRadius="5">
        {/* góra */}
        {/* <Stack>
          <Text variant="h3" m="0" color="black" children={question?.title} />
          <Flex gap=".25rem">
            {question?.tags.map((tag, i) => (
              <Tag key={`tag-${i}`} variant="3" children={tag} size="sm" />
            ))}
          </Flex>
        </Stack> */}

        {/* kontent */}
        <Box dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" />

        {/* dół */}
        <Flex justify="space-between">
          <Text m="0" variant="body3" color="gray" children={`Liczba wyśw. ${question?.views}`} />
          <Text m="0" variant="body3" color="gray" children={`Autor: ${question?.author.displayName}`} />
        </Flex>
      </Stack>

      {/* prawa kolumna */}
      <Stack w="5%" textAlign="center" spacing="md">
        <StarIcon height={35} />
        <LinkIcon height={35} />
        <FlagIcon height={35} />
      </Stack>
    </Flex>
  );
}

export default Answer;