import React, { useState } from "react";
import { useUpdatePhotoURLMutation } from "../../../features/auth/authApiSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setUser } from "../../../features/auth/authSlice";
import useToast from "../../../hooks/useToast";

// komponenty
import { Box } from "@welcome-ui/box";
import { Field } from "@welcome-ui/field";
import * as Setting from "../Content";
import AsyncButton from "../../../components/AsyncButton";

const UpdateDisplayName = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [file, setFile] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [update, { isLoading }] = useUpdatePhotoURLMutation();

  const handleUpdate = async () => {
    if (!file) return;
    const { user } = await update({ photoURL: file }).unwrap();
    dispatch(setUser(user));
    toast("Twój awatar został zaktualizowany");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const photo = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      // @ts-ignore
      setFile(reader.result);
    };
    reader.readAsDataURL(photo);
  };

  const isButtonDisabled = isLoading || !Boolean(file) || file == user?.photoURL;

  return (
    <Setting.Wrapper title="Awatar">
      <Field label="Nowy awatar">
        <Box position="relative">
          <img src={file ? file : user?.photoURL} height={100} width={100} style={{ borderRadius: "9999px" }} />
          <input
            type="file"
            multiple={false}
            onChange={handleChange}
            style={{
              position: "absolute",
              left: 0,
              height: "100px",
              width: "100px",
              opacity: "0",
              borderRadius: "9999px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Field>

      {/* przcycisk zapisz */}
      <AsyncButton isLoading={isLoading} disabled={isButtonDisabled} children="Zapisz" onClick={handleUpdate} />
    </Setting.Wrapper>
  );
};

export default UpdateDisplayName;
