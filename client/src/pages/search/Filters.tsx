import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Field } from "@welcome-ui/field";
import { Flex } from "@welcome-ui/flex";
import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import { Stack } from "@welcome-ui/stack";
import { Tag } from "@welcome-ui/tag";
import { Text } from "@welcome-ui/text";
import React, { useRef, useState } from "react";

const DATE_OPTIONS = [
  { label: "Od najnowszych", value: "Od najnowszych" },
  { label: "Od najstarszych", value: "Od najstarszych" },
];

const VOTES_OPTIONS = [
  { label: "Rosnąca", value: "Rosnąca" },
  { label: "Malejąca", value: "Malejąca" },
];

type SearchTypes = {
  query: string;
  tags: string[];
  dateASC: boolean;
  votesASC: boolean;
};

interface FiltersProps {
  search: SearchTypes;
  setSearch: React.Dispatch<React.SetStateAction<SearchTypes>>;
}

const Filters = ({ search, setSearch }: FiltersProps) => {
  const [tag, setTag] = useState("");
  const [dateASC, setDateASC] = useState("Od najnowszych");
  const [votesASC, setVotesASC] = useState("Malejąca");

  const handleAddTag = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e?.key != "Enter" && e !== undefined) || tag.length < 3 || search.tags.length == 3) return;
    setSearch({ ...search, tags: [...search.tags, tag] });
  };

  const handleRemoveTag = (index: number) => {
    setSearch({ ...search, tags: search.tags.filter((t, i) => i != index) });
  };

  const handleDateChange = (e: any) => {
    setDateASC(e.toString());
    setSearch({ ...search, dateASC: e.toString() != "Od najnowszych" });
  };

  const handleVotesChange = (e: any) => {
    setVotesASC(e.toString());
    setSearch({ ...search, votesASC: e.toString() != "Malejąca" });
  };

  return (
    <Flex gap="1rem" wrap="wrap">
      {/* filtrowanie za pomocą tagów */}
      <Stack spacing="sm">
        <Field label="Tag">
          <Flex gap=".25rem">
            <InputText
              size="sm"
              placeholder="np. Java"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
            {tag.length > 0 && <Button size="sm" children="Dodaj" onClick={() => handleAddTag()} />}
          </Flex>
        </Field>
        <Flex gap=".25rem">
          {search.tags.map((tag, i) => (
            <Tag key={`tag-${i}`} size="sm" variant="3">
              <Text fontSize="sm" children={tag} />
              <XMarkIcon cursor="pointer" height={17} onClick={() => handleRemoveTag(i)} />
            </Tag>
          ))}
        </Flex>
      </Stack>
      {/* sortowanie po dacie */}
      <Field label="Data utworzenia pytania">
        <Select size="sm" options={DATE_OPTIONS} value={dateASC} onChange={handleDateChange} />
      </Field>

      {/* sortowanie do głosach */}
      <Field label="Liczba głosów">
        <Select size="sm" options={VOTES_OPTIONS} value={votesASC} onChange={handleVotesChange} />
      </Field>
    </Flex>
  );
};

export default Filters;
