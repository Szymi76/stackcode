import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  LinkIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Box } from "@welcome-ui/box";
import { Flex } from "@welcome-ui/flex";
import { Stack } from "@welcome-ui/stack";
import { Tag } from "@welcome-ui/tag";
import { Text } from "@welcome-ui/text";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import React from "react";
import { question } from "./question";

// Lewa i prawa kolumna
const SideColumn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack px=".5rem" alignItems="center" spacing="md">
      {children}
    </Stack>
  );
};

// Środek z główną zawartością
const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      w="95%"
      mx="auto"
      position="relative"
      p="1.5rem"
      bg="white"
      border="1px solid"
      borderColor="light-gray"
      borderRadius="5">
      {children}
    </Stack>
  );
};

// Lewa kolumna
const LeftSideActions = () => {
  return (
    <SideColumn>
      {/* głosuj za */}
      <ChevronUpIcon
        className="heroicon"
        title="Głosuj za"
        // color={voted("up") ? "#3aafa9" : "black"}
        // onClick={() => handleToggleVote("up")}
      />

      {/* bilans głosów */}
      <Text
        m="0"
        variant="h3"
        fontWeight="500"
        children={question && question?.votes.up.length - question?.votes.down.length}
      />

      {/* głosuj przeciw */}
      <ChevronDownIcon
        className="heroicon"
        title="Głosuj przeciw"
        // color={voted("down") ? "#3aafa9" : "black"}
        // onClick={() => handleToggleVote("down")}
      />
    </SideColumn>
  );
};

const RightSideActions = () => {
  return (
    <SideColumn>
      {/* dodawanie do zaznaczonych */}
      <StarIcon
        className="heroicon"
        // color={marked ? "#f5bf42" : "none"}
        title="Dodaj do zaznaczonych"
        // fill={marked ? "#f5bf42" : "none"}
        // onClick={handleToggleMarked}
      />

      {/* link */}
      <LinkIcon
        className="heroicon"
        title="Kopiuj link"
        // onClick={() => copyToClipboard({ toast, text: "Skopiowano link", toCopy: location.href })}
      />

      {/* zgłaszanie pytania */}
      <FlagIcon
        className="heroicon"
        title="Zgłoś pytanie"
        // onClick={() => modal.show()}
      />
    </SideColumn>
  );
};

const ContentHeader = () => {
  return (
    <Stack>
      {/* tytuł */}
      <Text variant="h3" m="0" mr="1rem" color="black" children={question?.title} />

      {/* tagi */}
      <Flex gap=".25rem">
        {question?.tags.map((tag, i) => (
          <Tag key={`tag-${i}`} variant="3" children={tag} size="sm" />
        ))}
      </Flex>

      {/* czas */}
      <Text variant="body2" mt="0" color="gray" children={"10 min temu"} />
    </Stack>
  );
};

const ContentFooter = () => {
  return (
    <Flex justify="space-between">
      <Text m="0" variant="body3" color="gray" children={`licz. wyśw. ${question?.views}`} />
      <Text m="0" variant="body3" color="gray" children={`Autor: ${question?.author.displayName}`} />
    </Flex>
  );
};

const TopLeftThreeDots = () => {
  return (
    <Box display={{ _: "block", md: "none" }} bg="white" position="absolute" top="1rem" right=".5rem">
      <EllipsisVerticalIcon
        className="heroicon"
        // color={showRightSide ? "#3aafa9" : "gray"}
        // onClick={() => setShowRightSide(!showRightSide)}
      />
    </Box>
  );
};

const MobileDropdownActions = () => {
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
      <RightSideActions />
      <Box borderBottom="1px solid" borderColor="light-gray" />
      <LeftSideActions />
    </Stack>
  );
};

const Comp = () => {
  const html = new QuillDeltaToHtmlConverter(question.content.ops, {}).convert();

  return (
    <Box pt="5rem" minH="100vh" bg="very-light-green">
      <Flex maxW="1200px" mx="auto">
        {/* Lewa kolumna */}
        <Flex display={{ _: "none", md: "flex" }} justify="center">
          <LeftSideActions />
        </Flex>

        {/* Kontent */}
        <Content>
          {/* góra */}
          <ContentHeader />

          {/* środek */}
          <Box className="quill-result" dangerouslySetInnerHTML={{ __html: html }} pb=".5rem" overflowX="auto" />

          {/* dół */}
          <ContentFooter />

          {/* menu - trzy kropki prawy górny róg */}
          <TopLeftThreeDots />

          {/* rozwijane menu pod 3-ma kropkami */}
          <MobileDropdownActions />
        </Content>
        {/* Prawa kolumna */}
        <Flex display={{ _: "none", md: "flex" }} justify="center">
          <RightSideActions />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Comp;
