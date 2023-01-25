import { useEffect, useRef, useState } from "react";
import { useAddQuestionMutation } from "../../features/question/questionApiSlice";
import { useModalState } from "@welcome-ui/modal";
import { useNavigate } from "react-router-dom";

// komponenty
import Editor from "../../components/Editor";
import ReactQuill from "react-quill";
import TagsList from "./TagsList";
import FinishModal from "./FinishModal";
import { Flex } from "@welcome-ui/flex";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { InputText } from "@welcome-ui/input-text";
import { Field } from "@welcome-ui/field";
import { Loader } from "@welcome-ui/loader";

type Errors = {
  title: string | undefined;
  content: string | undefined;
  tags: string | undefined;
};

const MakeQuestion = () => {
  const [tags, setTags] = useState<string[]>(["Javascript", "React"]);
  const [errors, setErrors] = useState<Errors>({ title: undefined, content: undefined, tags: undefined });
  const [questionID, setQuestionID] = useState<string | null>(null);
  const [addQuestion, { isLoading, isError, error }] = useAddQuestionMutation();
  const modal = useModalState({ animated: true });
  const navigate = useNavigate();

  document.title = "Zadaj nowe pytanie";

  // refy
  const editorRef = useRef<ReactQuill>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // dodawanie nowego pytania
  const handleSubmit = async () => {
    try {
      const content = editorRef.current?.getEditor().getContents();
      if (!titleRef.current || !content) return;
      const title = titleRef.current.value.trim();
      let newErrors = { ...errors };

      // walidacja
      if (title.length < 4) newErrors = { ...newErrors, title: "Pytanie musi wynosić co najmniej 4 znaki" };
      if (title.length == 0) newErrors = { ...newErrors, title: "Pytanie nie może być puste" };
      if (content && content.length() <= 1) newErrors = { ...newErrors, content: "Treść nie może być pusta" };

      const isValid = Object.values(newErrors).every((e) => e === undefined);

      if (!isValid) {
        setErrors(newErrors);
        if (newErrors.title) titleRef.current.focus();
        return;
      }

      const { question } = await addQuestion({ title, content, tags }).unwrap();
      setQuestionID(question._id);

      // sprawdzanie czy modal ma zostać wyświetlony
      const showModal = JSON.parse(localStorage.getItem("show-finish-modal") || "true");
      showModal ? modal.show() : navigate(`/pytanie/${question._id}`);
    } catch (err) {}
  };

  // błąd z informacją o duplikacji pytania
  useEffect(() => {
    // @ts-ignore
    if (error && error.status && error.status == 409)
      setErrors({ ...errors, title: "Pytanie z takim tytyłem już istnieje" });
  }, [error]);

  // dodawanie nowego tagu
  const handleAddTag = () => {
    if (!tagRef.current) return;
    const newTag = tagRef.current.value.trim();
    if (newTag.length < 3 || newTag.length > 12) return;
    if (tags.includes(newTag) || tags.length == 5) return;
    setTags([...tags, newTag]);
    tagRef.current.value = "";
  };

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
            <InputText
              ref={titleRef}
              size="md"
              minLength={5}
              maxLength={80}
              onChange={() => errors.title && setErrors({ ...errors, title: undefined })}
            />
          </Field>

          {/* treść */}
          <Field
            error={errors.content && <Text variant="body4" mt=".25rem" children={errors.content} />}
            label="Treść *"
            hint="możesz umieszczać co chcesz, zdjęcia, kod, linki i wiele innych">
            <Editor
              ref={editorRef}
              style={{ editor: { height: "300px" } }}
              onChange={() => errors.content && setErrors({ ...errors, content: undefined })}
            />
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
          <TagsList tags={tags} setTags={setTags} />
        </Flex>

        {/* przycisk do przesyłania pytania */}
        <Button w="175px" px="1rem" alignSelf="end" disabled={isLoading} onClick={handleSubmit}>
          {isLoading && <Loader color="white" size="xs" mr=".5rem" />}
          Prześlij
        </Button>
        {isError && <Text variant="body4" color="gray" alignSelf="end" mt="0" children="Coś poszło nie tak" />}
      </Flex>

      {/* finish modal */}
      {modal.visible && questionID && (
        <FinishModal modal={modal} questionID={questionID} onClose={() => navigate("/home")} />
      )}
    </Box>
  );
};

export default MakeQuestion;
