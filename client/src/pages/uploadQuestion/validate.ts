import { DeltaStatic } from "quill";

export type Errors = {
  title: string | undefined;
  content: string | undefined;
  tags: string | undefined;
};

export const initialErrorsObject: Errors = {
  title: undefined,
  content: undefined,
  tags: undefined,
};

/**
 Sprawdza czy nowy tag może zostać umieszczony w tablicy, zwraca tag jeśli walidacja się udała, w przeciwnym przypadku null
 */
export const validateNewTag = (tags: string[], newTag: string) => {
  if (newTag.length < 3) return null;
  if (newTag.length > 12) return null;
  if (tags.includes(newTag)) return null;
  if (tags.length == 5) return null;
  return newTag;
};

/**
  Waliduje podane argumeny i zwraca objekt błędów i zminną `isValid` która mówi czy argumeny są poprawne
 */
export const validateNewQuestion = (title: string, content: DeltaStatic, tags: string[]) => {
  let errors = initialErrorsObject;
  if (title.length < 4) errors = { ...errors, title: "Pytanie musi wynosić co najmniej 4 znaki" };
  if (title.length == 0) errors = { ...errors, title: "Pytanie nie może być puste" };
  if (content && content.length() <= 1) errors = { ...errors, content: "Treść nie może być pusta" };

  const isValid = Object.values(errors).every((e) => e === undefined);

  return { errors, isValid };
};
