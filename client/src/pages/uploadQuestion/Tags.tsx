import React from "react";
import { Flex } from "@welcome-ui/flex";
import { Tag } from "@welcome-ui/tag";
import { Text } from "@welcome-ui/text";
import { XMarkIcon } from "@heroicons/react/24/outline";

/*
  Pojedyńczy tag w liście
*/

export type SingleProps = { tag: string; onCLick: () => void };

export const Single = ({ tag, onCLick }: SingleProps) => {
  return (
    <Tag variant="3">
      <Text fontSize="sm" children={tag} />
      <XMarkIcon cursor="pointer" height={17} onClick={onCLick} />
    </Tag>
  );
};

/*
  Lista tagów
*/

type ListProps = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

export const List = ({ tags, setTags }: ListProps) => {
  // usuwanie taga z listy na podstawie indexu
  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((t, i) => i != index);
    setTags(newTags);
  };

  return (
    <Flex wrap="wrap" gap=".5rem">
      {tags.map((tag, index) => {
        return <Single key={`tag_${index}`} onCLick={() => handleRemoveTag(index)} tag={tag} />;
      })}
    </Flex>
  );
};
