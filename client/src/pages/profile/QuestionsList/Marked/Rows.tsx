import { useToggleMarkekQuestionMutation } from "../../../../features/question/questionApiSlice";
import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { useToast } from "@welcome-ui/toast";
import copyToClipboard from "../../../../utils/copyToClipboard";

// kopmonenty
import Question from "../../../../types/Question";
import { LinkIcon, StarIcon } from "@heroicons/react/24/outline";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import * as List from "../../List";

/*
  Pojedyńczy wiersz z zaznaczonym pytaniem
*/

export type SingleProps = { question: Question; index: number };

export const Single = ({ question, index }: SingleProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isMarked, setIsMarked] = useState(question.markedBy.includes(user!.id));
  const [toggleMarkedAsync] = useToggleMarkekQuestionMutation();
  const toast = useToast();

  // zaznaczanie pytania
  const handleToggleMarked = async () => {
    await toggleMarkedAsync({ questionID: question._id }).unwrap();
    setIsMarked(!isMarked);
  };

  const clipboardObject = { toast, text: "Skopiowano link", toCopy: `${location.origin}/pytanie/${question._id}` };
  const handleCopy = () => copyToClipboard(clipboardObject);

  return (
    <List.Row question={question}>
      <Flex gap=".5rem">
        {/* link do kopiowania */}
        <LinkIcon className="heroicon" onClick={handleCopy} />

        {/* gwiazdka do (od)zaznaczania pytania */}
        <StarIcon
          className="heroicon"
          color={isMarked ? "#f5bf42" : "none"}
          fill={isMarked ? "#f5bf42" : "none"}
          onClick={handleToggleMarked}
        />
      </Flex>
    </List.Row>
  );
};

/*
  Wszystkie zaznaczone pytania
*/

export type AllProps = { questions: Question[] | undefined };

export const All = ({ questions }: AllProps) => {
  return (
    <Stack>
      {questions?.map((question, index) => {
        return <Single key={"marked-" + index} index={index} question={question} />;
      })}
    </Stack>
  );
};
