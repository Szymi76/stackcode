import { Button } from "@welcome-ui/button";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import SettingsWrapper from "./SettingsWrapper";

const UpdateDisplayName = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <SettingsWrapper title="Awatar">
      <Field label="Twoja nowa nazwa" hint="(min. 4 znaki)">
        <InputText defaultValue={user?.displayName} />
      </Field>
      <Button children="Zapisz" />
    </SettingsWrapper>
  );
};

export default UpdateDisplayName;
