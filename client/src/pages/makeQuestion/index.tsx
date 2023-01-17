import { useRef, useState } from "react";
import Editor from "../../components/Editor";
import ReactQuill from "react-quill";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { InputText } from "@welcome-ui/input-text";
import { Field } from "@welcome-ui/field";
import { Tag } from "@welcome-ui/tag";
import { Tooltip } from "@welcome-ui/tooltip";
import { useModalState } from "@welcome-ui/modal";
import FinishModal from "./FinishModal";

const MakeQuestion = () => {
  const [tags, setTags] = useState<string[]>(["Javascript", "React"]);
  const modal = useModalState();
  const editorRef = useRef<ReactQuill>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const isWantToSeeModal = Boolean(localStorage.getItem("want-to-see-finish-modal"));

  const handleSubmit = () => {
    modal.show();
  };

  // dodawanie nowego tagu
  const handleAddTag = () => {
    if (!tagRef.current) return;
    const newTag = tagRef.current.value.trim();
    if (newTag.length < 3 || newTag.length > 12) return;
    if (tags.includes(newTag) || tags.length == 5) return;
    setTags([...tags, newTag]);
  };

  return (
    <Box minH="100vh" py="6rem" px="2rem" bg="very-light-green">
      <Flex direction="column" maxW="1100px" mx="auto" gap=".75rem">
        <Text variant="h3" mb="0" children="Zadaj nowe pytanie ★" />
        <Flex
          direction="column"
          gap="1.75rem"
          bg="white"
          border="1px solid"
          borderColor="light-gray"
          borderRadius="5"
          p="1.5rem">
          <Field label="Pytanie *" hint="skonstruuj takie pytanie, aby inni łatwo do niego dotarli (min. 5 znaków)">
            <InputText size="md" minLength={5} maxLength={80} />
          </Field>
          <Field label="Treść *" hint="możesz umieszczać co chcesz, zdjęcia, kod, linki i wiele innych">
            <Editor ref={editorRef} style={{ editor: { height: "300px" } }} />
          </Field>
          <Field label="Tagi" hint="tagi m.in pomogą innym znaleść twoje pytanie (max. 5 tagów)">
            <Flex gap=".5rem">
              <InputText size="md" minLength={3} maxLength={12} ref={tagRef} />
              <Button children="Dodaj" onClick={handleAddTag} />
            </Flex>
          </Field>
          <Flex wrap="wrap" gap=".5rem">
            {tags.map((tag, index) => {
              const handleRemoveTag = () => {
                const filteredTags = tags.filter((t) => t != tag);
                setTags(filteredTags);
              };

              const variant = Math.floor(Math.random() * 6) + 1;

              return (
                <Tooltip content="Kliknij aby usunąć">
                  <Tag
                    key={"tag" + index}
                    // @ts-ignore
                    variant={`${variant}`}
                    cursor="pointer"
                    children={tag}
                    onClick={handleRemoveTag}
                  />
                </Tooltip>
              );
            })}
          </Flex>
        </Flex>
        <Button children="Zadaj pytanie" w="175px" px="1rem" alignSelf="end" onClick={handleSubmit} />
      </Flex>
      <FinishModal modal={modal} />
    </Box>
  );
};

export default MakeQuestion;

{
  /* <Editor
        ref={editorRef}
        style={{ editor: { maxWidth: "900px", height: "300px" }, toolbar: { maxWidth: "900px" } }}
      /> */
}
//   console.log(editorRef.current?.getEditor().getContents())
