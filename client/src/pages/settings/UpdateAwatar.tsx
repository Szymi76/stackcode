import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import { Loader } from "@welcome-ui/loader";
import { useToast } from "@welcome-ui/toast";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useUpdatePhotoURLMutation } from "../../features/auth/authApiSlice";
import { setUser } from "../../features/auth/authSlice";
import SettingsWrapper from "./SettingsWrapper";
import infoToast from "./ToastInfo";

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
    infoToast(toast, "Twój awatar został zaktualizowany");
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

  console.log(file);

  return (
    <SettingsWrapper title="Awatar">
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
      <Button disabled={isLoading || !Boolean(file) || file == user?.photoURL} onClick={handleUpdate}>
        {isLoading && <Loader size="xs" color="white" mr="1rem" />}
        Zapisz
      </Button>
    </SettingsWrapper>
  );
};

export default UpdateDisplayName;
