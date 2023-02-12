import { useEffect, useRef, useState } from "react";
import { useEditQuestionMutation, useGetQuestionByIdQuery } from "../../features/question/questionApiSlice";
import { useAppSelector } from "../../app/hooks";
import { useModalState } from "@welcome-ui/modal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { validateNewQuestion, validateNewTag, initialErrorsObject, Errors } from "../uploadQuestion/validate";

// komponenty
import Editor from "../../components/Editor";
import ReactQuill from "react-quill";
import FinishModal from "./FinishModal";
import AsyncButton from "../../components/AsyncButton";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { InputText } from "@welcome-ui/input-text";
import { Loader } from "@welcome-ui/loader";
import * as Content from "../uploadQuestion/Content";
import * as Tags from "../uploadQuestion/Tags";

const EditQuestion = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading: isLoadingQuestion, isSuccess } = useGetQuestionByIdQuery({ id: id || "" });
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState(initialErrorsObject);
  const [editQuestion, { isLoading, isError, error }] = useEditQuestionMutation();
  const modal = useModalState({ animated: true });
  const navigate = useNavigate();

  document.title = `Edytuj pytanie - ${id}`;

  // refy
  const editorRef = useRef<ReactQuill>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!data) return;
    setTags(data?.question.tags);
  }, [data]);

  if (!id || !user) return <Navigate to={"/home"} />;
  if (isLoadingQuestion) return <Flex minH="100vh" py="6rem" justify="center" children={<Loader color="green" />} />;
  // @ts-ignore
  if (!data || data.question.author._id != user.id) return <Navigate to={"/home"} />;

  // dodawanie nowego pytania
  const handleSubmit = async () => {
    try {
      // @ts-ignore
      const content: string = editorRef.current?.value;
      if (!titleRef.current || !content) return;
      const title = titleRef.current.value.trim();

      // walidacja
      const { isValid, errors: newErrors } = validateNewQuestion(title, content, tags);

      if (!isValid) {
        setErrors(newErrors);
        if (newErrors.title) titleRef.current.focus();
        return;
      }

      await editQuestion({ questionID: id, title, content, tags }).unwrap();

      // sprawdzanie czy modal ma zostać wyświetlony;
      modal.show();
    } catch (err) {
      console.warn("Coś poszło nie tak podczas edytowania pytania");
    }
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

  return (
    <Content.Wrapper>
      {/* kontent */}
      <Text variant="h3" mb="0" children="Edytuj pytanie" />
      <Text variant="body3" color="gray" m="0" children={`ID: ${id}`} />
      <Content.Form>
        {/* pytanie */}
        <Content.Field
          errorsField={errors.title}
          label="Pytanie *"
          hint="skonstruuj takie pytanie, aby inni łatwo do niego dotarli (min. 5 znaków)">
          <InputText
            ref={titleRef}
            defaultValue={data.question.title}
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
            // @ts-ignore
            defaultValue={data.question.content}
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
      <Flex wrap="wrap" justify="end" gap=".5rem">
        {/* przycisk anuluj */}
        <Button
          variant="primary-danger"
          disabled={isLoading}
          children="Anuluj"
          onClick={() => navigate("/twoj-profil")}
        />
        {/* przycisk potwierdź */}
        <AsyncButton
          w="10rem"
          alignSelf="end"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handleSubmit}
          children="Prześlij"
        />
      </Flex>
      {isError && <Text variant="body4" color="gray" alignSelf="end" mt="0" children="Coś poszło nie tak" />}
      {/* finish modal */}
      {modal.visible && <FinishModal modal={modal} id={id} />}
    </Content.Wrapper>
  );
};

export default EditQuestion;
