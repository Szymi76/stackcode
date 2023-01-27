import React, { useEffect, useState } from "react";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import Question from "../../types/Question";
import { useGetQuestionsWithQueryMutation } from "../../features/question/questionApiSlice";
import { Stack } from "@welcome-ui/stack";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import sortQuestions from "../../utils/sortQuestions";
import Filters from "./Filters";
import QuestionRow from "./QuestionRow";

type SearchTypes = {
  query: string;
  tags: string[];
  dateASC: boolean;
  votesASC: boolean;
};

const initialState: SearchTypes = {
  query: "",
  tags: [],
  dateASC: false,
  votesASC: false,
};

const Search = () => {
  const [search, setSearch] = useState<SearchTypes>(initialState);
  const [result, setResult] = useState<Question[] | null>(null);

  const [fetchQuestions, { isLoading }] = useGetQuestionsWithQueryMutation();

  document.title = `Szukaj - ${search.query}`;

  useEffect(() => {
    if (search.query.trim().length == 0) return setResult(null);
    fetchQuestions({ query: search.query })
      .unwrap()
      .then((value) => setResult(sortQuestions(value.questions, search)));
  }, [search.query]);

  useEffect(() => {
    if (!result) return;

    setResult(sortQuestions(result, search));
  }, [search]);

  return (
    <Box minH="100vh" bg="very-light-green" pt="4rem">
      <Stack w="95%" maxW="1100px" mx="auto" pt="1rem">
        {/* wyszukiwanie i filtrowanie */}
        <Stack bg="white" border="1px solid" borderColor="light-gray" borderRadius={5} p="1rem">
          <Field label="Pytanie">
            <InputText
              placeholder="Szukaj pytania które cię interesuje ..."
              icon={<MagnifyingGlassIcon height={24} color="gray" />}
              value={search.query}
              onChange={(e) => setSearch({ ...search, query: e.target.value })}
            />
          </Field>
          <Filters search={search} setSearch={setSearch} />
        </Stack>

        {/* lista znalezionych pytań */}
        <Stack spacing="sm" mt="1rem">
          <Text variant="h3" children="Wyniki" borderBottom="1px solid" borderColor="light-gray" pb=".25rem" />
          {result && result.length > 0 && (
            <Flex justify="space-between" px="1rem">
              <Text variant="body2" m="0" color="gray" children="Tytuł" />
              <Text variant="body2" m="0" color="gray" children="Licz. głosów" />
            </Flex>
          )}
          {result && result.map((q, i) => <QuestionRow key={`q-${i}`} question={q} />)}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Search;
