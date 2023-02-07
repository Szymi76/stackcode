import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Box } from "@welcome-ui/box";
import { Stack } from "@welcome-ui/stack";
import { forwardRef, RefObject, useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Left, Right, LeftProps, RightProps } from "./Side";

/* 
    Trzy kropki do pokazania / ukrycia menu z akcjami
*/
type TriggerProps = { showDropdown: boolean; setShowDropdown: React.Dispatch<React.SetStateAction<boolean>> };

export const Trigger = forwardRef<HTMLDivElement, TriggerProps>(({ showDropdown, setShowDropdown }, ref) => (
  <Box ref={ref} display={{ _: "block", md: "none" }} bg="white" position="absolute" top="1rem" right=".5rem">
    <EllipsisVerticalIcon
      className="heroicon"
      color={showDropdown ? "#3aafa9" : "gray"}
      onClick={() => setShowDropdown(!showDropdown)}
    />
  </Box>
));

/* 
    Menu z akcjami dotyczącymi pytania
*/
type ActionsProps = LeftProps &
  RightProps & {
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    triggerRef: RefObject<HTMLDivElement>;
  };

export const Actions = ({
  toast,
  modal,
  question,
  handleToggleMarked,
  handleToggleVote,
  setShowDropdown,
  triggerRef,
}: ActionsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowDropdown(false), triggerRef);

  return (
    <Stack
      ref={ref}
      display={{ _: "flex", md: "none" }}
      position="absolute"
      top="3.5rem"
      right=".75rem"
      bg="white"
      border="1px solid"
      borderColor="light-gray"
      borderRadius={5}
      py=".5rem">
      <Right handleToggleMarked={handleToggleMarked} modal={modal} toast={toast} question={question} />
      <Box borderBottom="1px solid" borderColor="light-gray" />
      <Left handleToggleVote={handleToggleVote} question={question} />
    </Stack>
  );
};
