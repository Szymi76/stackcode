import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useUpdateDisplayNameMutation, useVerifyEmailMutation } from "../../../features/auth/authApiSlice";
import useToast from "../../../hooks/useToast";
import { setUser } from "../../../features/auth/authSlice";

import AsyncButton from "../../../components/AsyncButton";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
// import { useToast } from "@welcome-ui/toast";
import * as Setting from "../Content";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";

const UpdateDisplayName = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [verifyEmailAsync, { isLoading, isUninitialized }] = useVerifyEmailMutation();

  const handleEmailVerification = async () => {
    await verifyEmailAsync();
  };

  //   const isButtonDisabled = isLoading || displayName!.trim().length < 4 || displayName == user?.displayName;

  return (
    <Setting.Wrapper title="Weryfikacja emailu">
      {/* twoja nazwa */}
      {!user?.emailVerified ? (
        <Field label="Klknij przycisk poniżej aby wysłać email weryfikacyjny" disabled={isLoading}>
          <AsyncButton
            isLoading={isLoading}
            disabled={isLoading}
            children={isUninitialized ? "Wyślij email weryfikacyjny" : "Wyślij email ponownie"}
            onClick={handleEmailVerification}
          />
        </Field>
      ) : (
        <Text children="Twój adres jest już zweryfikowany" />
      )}
      {!isUninitialized && (
        <Text
          maxW="750px"
          children="Wejdź na swój email, kliknij w wiadomość weryfikacyją i podążaj z podanymi tam instrukcjami. 
         (Jeśli wiadomość nie dotarła do ciebie w ciągu 5 - ciu minut, kliknij 'Wyślij email ponownie')"
        />
      )}
    </Setting.Wrapper>
  );
};

export default UpdateDisplayName;
