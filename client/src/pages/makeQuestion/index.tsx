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
import { useNavigate } from "react-router-dom";
import FinishModal from "../tests";
import { Loader } from "@welcome-ui/loader";
import { useAddQuestionMutation } from "../../features/question/questionApiSlice";

type Errors = {
  title: string | undefined;
  content: string | undefined;
  tags: string | undefined;
};

const MakeQuestion = () => {
  const [tags, setTags] = useState<string[]>(["Javascript", "React"]);
  const [errors, setErrors] = useState<Errors>({ title: undefined, content: undefined, tags: undefined });
  const modal = useModalState({ animated: true });
  const [addQuestion, { isLoading, isError }] = useAddQuestionMutation();
  const editorRef = useRef<ReactQuill>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const content = editorRef.current?.getEditor().getContents();
      if (!titleRef.current || !content) return;
      const title = titleRef.current.value.trim();
      if (title.length == 0) {
        setErrors({ ...errors, title: "Tytuł nie może być pusty" });
        return;
      }
      if (title.length < 4) {
        setErrors({ ...errors, title: "Tytuł musi wynosić co najmniej 4 znaki" });
        return;
      }
      if (content.length() == 0) {
        setErrors({ ...errors, content: "Treść nie może być pusta" });
        return;
      }

      await addQuestion({ title, content, tags }).unwrap();

      modal.show();
    } catch (err) {}
  };

  // dodawanie nowego tagu
  const handleAddTag = () => {
    if (!tagRef.current) return;
    const newTag = tagRef.current.value.trim();
    if (newTag.length < 3 || newTag.length > 12) return;
    if (tags.includes(newTag) || tags.length == 5) return;
    setTags([...tags, newTag]);
  };

  const redirectToHome = () => navigate("/home");

  return (
    <Box minH="100vh" py="6rem" px="2rem" bg="very-light-green">
      {/* wrapper */}
      <Flex direction="column" maxW="1100px" mx="auto" gap=".75rem">
        {/* kontent */}
        <Text variant="h3" mb="0" children="Zadaj nowe pytanie ★" />
        <Flex
          direction="column"
          gap="1.75rem"
          bg="white"
          border="1px solid"
          borderColor="light-gray"
          borderRadius="5"
          p="1.5rem">
          {/* pytanie */}
          <Field
            error={errors.title && <Text variant="body4" mt=".25rem" children={errors.title} />}
            label="Pytanie *"
            hint="skonstruuj takie pytanie, aby inni łatwo do niego dotarli (min. 5 znaków)">
            <InputText ref={titleRef} size="md" minLength={5} maxLength={80} />
          </Field>

          {/* treść */}
          <Field
            error={errors.content && <Text variant="body4" mt=".25rem" children={errors.content} />}
            label="Treść *"
            hint="możesz umieszczać co chcesz, zdjęcia, kod, linki i wiele innych">
            <Editor ref={editorRef} style={{ editor: { height: "300px" } }} />
          </Field>

          {/* tagi */}
          <Field
            error={errors.tags && <Text variant="body4" mt=".25rem" children={errors.tags} />}
            label="Tagi"
            hint="tagi m.in pomogą innym znaleść twoje pytanie (max. 5 tagów)">
            <Flex gap=".5rem">
              <InputText size="md" minLength={3} maxLength={12} ref={tagRef} />
              <Button children="Dodaj" onClick={handleAddTag} />
            </Flex>
          </Field>

          {/* lista tagów */}
          <Flex wrap="wrap" gap=".5rem">
            {tags.map((tag, index) => {
              const handleRemoveTag = () => {
                const filteredTags = tags.filter((t) => t != tag);
                setTags(filteredTags);
              };

              const variant = Math.floor(Math.random() * 6) + 1;

              return (
                <Tooltip key={"tag" + index} content="Kliknij aby usunąć">
                  <Tag
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

        {/* przycisk do przesyłania pytania */}
        <Button children="Prześlij" w="175px" px="1rem" alignSelf="end" onClick={handleSubmit} />
        {/* <Button children={true && <Loader color="white" size="sm" />} w="175px" px="1rem" alignSelf="end" /> */}
      </Flex>

      {/* finish modal */}
      <FinishModal modal={modal} onClose={redirectToHome} />
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
