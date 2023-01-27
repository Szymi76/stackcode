import React from "react";
import { Flex } from "@welcome-ui/flex";
import { Tag } from "@welcome-ui/tag";
import { Tooltip } from "@welcome-ui/tooltip";

interface TagsListProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsList = ({ tags, setTags }: TagsListProps) => {
  return (
    <Flex wrap="wrap" gap=".5rem">
      {tags.map((tag, index) => {
        // usuwanie klikniętego tagu
        const handleRemoveTag = () => {
          const filteredTags = tags.filter((t) => t != tag);
          setTags(filteredTags);
        };

        return (
          <Tooltip key={"tag" + index} content="Kliknij aby usunąć">
            <Tag
              // @ts-ignore
              variant="3"
              cursor="pointer"
              children={tag}
              onClick={handleRemoveTag}
            />
          </Tooltip>
        );
      })}
    </Flex>
  );
};

export default TagsList;
