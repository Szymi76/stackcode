import { useNavigate } from "react-router-dom";
import { useModalState } from "@welcome-ui/modal";
import { useToast } from "@welcome-ui/toast";
import copyToClipboard from "../../../../utils/copyToClipboard";

// komponenty
import Question from "../../../../types/Question";
import DeleteQuestionModal from "../../DeleteQuestionModal";
import { ChatBubbleBottomCenterTextIcon, LinkIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Text } from "@welcome-ui/text";
import { Box } from "@welcome-ui/box";
import * as List from "../../List";

/*
  Pojedyńczy wiersz ze storzonym pytaniem
*/

export type SingleProps = { question: Question; index: number; refetch: () => void };

export const Single = ({ question, index, refetch }: SingleProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const deleteModal = useModalState();

  const clipboardObject = { toast, text: "Skopiowano link", toCopy: `${location.origin}/pytanie/${question._id}` };
  const handleCopy = () => copyToClipboard(clipboardObject);
  const handleRedirect = () => navigate(`/edytuj-pytanie/${question._id}`);

  return (
    <List.Row question={question}>
      <Flex gap=".5rem">
        {/* kopiowanie linku */}
        <LinkIcon className="move-down" height={30} onClick={handleCopy} />

        {/* liczba odpowiedzi */}
        <Box position="relative" mr=".25rem">
          <ChatBubbleBottomCenterTextIcon className="move-down" height={30} color="#3b82f6" />
          <Text position="absolute" right={-8} top={5} variant="body4" children={question.answers.length} />
        </Box>

        {/* edit */}
        <PencilSquareIcon className="heroicon" color="#15803d" onClick={handleRedirect} />

        {/* usuń */}
        <TrashIcon className="heroicon" color="#ef4444" onClick={() => deleteModal.show()} />
      </Flex>

      {deleteModal.visible && <DeleteQuestionModal modal={deleteModal} question={question} onClose={refetch} />}
    </List.Row>
  );
};

/*
  Wszystkie stworzone pytania
*/

export type AllProps = { questions: Question[] | undefined; refetch: () => void };

export const All = ({ questions, refetch }: AllProps) => {
  return (
    <Stack>
      {questions?.map((question, index) => {
        return <Single key={"marked-" + index} index={index} question={question} refetch={refetch} />;
      })}
    </Stack>
  );
};
