import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useUpdateDisplayNameMutation } from "../../../features/auth/authApiSlice";
import useToast from "../../../hooks/useToast";
import { setUser } from "../../../features/auth/authSlice";

import AsyncButton from "../../../components/AsyncButton";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
// import { useToast } from "@welcome-ui/toast";
import * as Setting from "../Content";

const UpdateDisplayName = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [update, { isLoading }] = useUpdateDisplayNameMutation();

  const handleUpdate = async () => {
    const { user } = await update({ displayName: displayName!.trim() }).unwrap();
    dispatch(setUser(user));
    toast("Twoja nazwa została zaktualizowana");
  };

  const isButtonDisabled = isLoading || displayName!.trim().length < 4 || displayName == user?.displayName;

  return (
    <Setting.Wrapper title="Twoja nazwa">
      {/* twoja nazwa */}
      <Field label="Twoja nowa nazwa" hint="(min. 4 znaki, max 16 znaków)">
        <InputText value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </Field>

      {/* przycisk zapisz */}
      <AsyncButton isLoading={isLoading} disabled={isButtonDisabled} children="Zapisz" onClick={handleUpdate} />
    </Setting.Wrapper>
  );
};

export default UpdateDisplayName;
