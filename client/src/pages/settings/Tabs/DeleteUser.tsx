import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useDeleteUserMutation } from "../../../features/auth/authApiSlice";
import useToast from "../../../hooks/useToast";
import { setUser } from "../../../features/auth/authSlice";

import AsyncButton from "../../../components/AsyncButton";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import * as Setting from "../Content";
import { Text } from "@welcome-ui/text";

const DeleteUser = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    await deleteUser().unwrap();
    dispatch(setUser(null));
    toast("Konto zostało usunięte");
  };

  const isButtonDisabled = isLoading || email != user?.email;

  return (
    <Setting.Wrapper title="Usuń konto">
      <Text fontWeight="500" color="gray">
        Wpisz swój adres email{" "}
        <span style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", padding: "1px 5px", borderRadius: 5 }}>
          {user?.email}
        </span>{" "}
        poniżej aby móc usunąć konto, po kliknięciu przycisku
        <span style={{ color: "rgb(239, 68, 68)" }}> Usuń </span>{" "}
        <span style={{ textDecoration: "underline" }}>twoje konto zostanie na stałe usunięte.</span>
      </Text>

      <Field label="Adres email" maxW={500}>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>

      {/* przycisk zapisz */}
      <AsyncButton
        isLoading={isLoading}
        variant="primary-danger"
        disabled={isButtonDisabled}
        children="Usuń konto"
        onClick={handleDeleteUser}
      />
    </Setting.Wrapper>
  );
};

export default DeleteUser;
