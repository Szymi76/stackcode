import { useEffect, useRef, useState } from "react";
import { useAddQuestionMutation } from "../../features/question/questionApiSlice";
import { useModalState } from "@welcome-ui/modal";
import { useNavigate } from "react-router-dom";
import { validateNewTag, validateNewQuestion, initialErrorsObject, Errors } from "./validate";

// komponenty
import Editor from "../../components/Editor";
import ReactQuill from "react-quill";
import FinishModal from "./FinishModal";
import AsyncButton from "../../components/AsyncButton";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { InputText } from "@welcome-ui/input-text";
import * as Content from "./Content";
import * as Tags from "./Tags";

const UploadQuestion = () => {
  const [tags, setTags] = useState<string[]>(["Javascript", "React"]);
  const [errors, setErrors] = useState(initialErrorsObject);
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
      //@ts-ignore
      const content: string = editorRef.current?.value;
      if (!titleRef.current || !content) return;
      const title = titleRef.current.value.trim();

      // walidacja
      const { errors: newErrors, isValid } = validateNewQuestion(title, content, tags);

      // jeśli walidacja się nie udała to nie odbywa się przsyłanie pytania
      if (!isValid) {
        setErrors(newErrors);
        if (newErrors.title) titleRef.current.focus();
        return;
      }

      // przesyłanie pytania
      const { question } = await addQuestion({ title, content, tags }).unwrap();
      setQuestionID(question._id);

      // sprawdzanie czy modal ma zostać wyświetlony
      const showModal = JSON.parse(localStorage.getItem("show-finish-modal") || "true");
      showModal ? modal.show() : navigate(`/pytanie/${question._id}`);
    } catch (err) {}
  };

  // dodawanie nowego tagu
  const handleAddTag = () => {
    if (!tagRef.current) return;
    const newTag = tagRef.current.value.trim();
    const validatedTag = validateNewTag(tags, newTag);
    if (!validatedTag) return;
    setTags([...tags, validatedTag]);
    tagRef.current.value = "";
  };

  // aktualizacja błędów podczas zmiany kontentu polach texkstowych
  const handleChange = (field: "title" | "content" | "tags") => {
    setErrors({ ...errors, [field]: undefined });
  };

  // błąd z informacją o duplikacji pytania
  useEffect(() => {
    // @ts-ignore
    if (error && error.status && error.status == 409)
      setErrors({ ...errors, title: "Pytanie z takim tytyłem już istnieje" });
  }, [error]);

  return (
    <Content.Wrapper>
      {/* kontent */}
      <Text variant="h3" mb="0" children="Zadaj nowe pytanie ★" />
      <Content.Form>
        {/* pytanie */}
        <Content.Field
          errorsField={errors.title}
          label="Pytanie *"
          hint="skonstruuj takie pytanie, aby inni łatwo do niego dotarli (min. 5 znaków)">
          <InputText
            ref={titleRef}
            size="md"
            minLength={5}
            maxLength={80}
            name="title"
            onChange={() => errors.title && handleChange("title")}
          />
        </Content.Field>

        {/* treść */}
        <Content.Field
          errorsField={errors.content}
          label="Treść *"
          hint="możesz umieszczać co chcesz, zdjęcia, kod, linki i wiele innych">
          <Editor
            ref={editorRef}
            style={{ editor: { height: "300px" } }}
            onChange={() => errors.content && handleChange("content")}
          />
        </Content.Field>

        {/* tagi */}
        <Content.Field
          errorsField={errors.tags}
          label="Tagi"
          hint="tagi m.in pomogą innym znaleść twoje pytanie (max. 5 tagów)">
          <Flex gap=".5rem">
            <InputText size="md" minLength={3} maxLength={12} ref={tagRef} />
            <Button children="Dodaj" onClick={handleAddTag} />
          </Flex>
        </Content.Field>

        {/* lista tagów */}
        <Tags.List tags={tags} setTags={setTags} />
      </Content.Form>

      {/* przycisk do przesyłania pytania */}
      <AsyncButton
        w="10rem"
        alignSelf="end"
        disabled={isLoading}
        isLoading={isLoading}
        onClick={handleSubmit}
        children="Prześlij"
      />
      {error && <Text fontSize="xs" color="red" alignSelf="end" mt="0" children="Coś poszło nie tak" />}
      {/* finish modal */}
      {modal.visible && questionID && (
        <FinishModal modal={modal} questionID={questionID} onClose={() => navigate("/home")} />
      )}
    </Content.Wrapper>
  );
};

export default UploadQuestion;
