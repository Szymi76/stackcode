import { Button } from "@welcome-ui/button";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import SettingsWrapper from "./SettingsWrapper";
import { useUpdateDisplayNameMutation } from "../../features/auth/authApiSlice";
import { setUser } from "../../features/auth/authSlice";
import { Loader } from "@welcome-ui/loader";
import { useToast } from "@welcome-ui/toast";
import infoToast from "./ToastInfo";
import AsyncButton from "../../components/AsyncButton";

const UpdateDisplayName = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [update, { isLoading }] = useUpdateDisplayNameMutation();

  const handleUpdate = async () => {
    const { user } = await update({ displayName: displayName!.trim() }).unwrap();
    dispatch(setUser(user));
    infoToast(toast, "Twoja nazwa zotsała zaktualizowana");
  };

  return (
    <SettingsWrapper title="Twoja nazwa">
      {/* twoja nazwa */}
      <Field label="Twoja nowa nazwa" hint="(min. 4 znaki)">
        <InputText value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </Field>

      {/* zapisz */}
      <Button
        disabled={isLoading || displayName!.trim().length < 4 || displayName == user?.displayName}
        onClick={handleUpdate}>
        {isLoading && <Loader size="xs" color="white" mr="1rem" />}
        Zapisz
      </Button>
    </SettingsWrapper>
  );
};

export default UpdateDisplayName;
