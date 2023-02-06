import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";
import { Left, Right, LeftProps, RightProps } from "./Side";

/* 
    Trzy kropki do pokazania / ukrycia menu z akcjami
*/
type TriggerProps = { showDropdown: boolean; setShowDropdown: React.Dispatch<React.SetStateAction<boolean>> };

export const Trigger = ({ showDropdown, setShowDropdown }: TriggerProps) => {
  return (
    <Box display={{ _: "block", md: "none" }} bg="white" position="absolute" top="1rem" right=".5rem">
      <EllipsisVerticalIcon
        className="heroicon"
        color={showDropdown ? "#3aafa9" : "gray"}
        onClick={() => setShowDropdown(!showDropdown)}
      />
    </Box>
  );
};

/* 
    Menu z akcjami dotyczącymi pytania
*/
type ActionsProps = LeftProps & RightProps;

export const Actions = ({ toast, modal, answer, handleToggleVote }: ActionsProps) => {
  return (
    <Stack
      display={{ _: "flex", md: "none" }}
      position="absolute"
      top="3.5rem"
      right=".75rem"
      bg="white"
      border="1px solid"
      borderColor="light-gray"
      borderRadius={5}
      py=".5rem">
      <Right modal={modal} toast={toast} answer={answer} />
      <Box borderBottom="1px solid" borderColor="light-gray" />
      <Left handleToggleVote={handleToggleVote} answer={answer} />
    </Stack>
  );
};
