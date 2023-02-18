import { Button } from "@welcome-ui/button";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import { Text } from "@welcome-ui/text";
import React, { useState } from "react";
import AsyncButton from "../../../components/AsyncButton";
import { useResetPasswordMutation } from "../../../features/auth/authApiSlice";
import * as Content from "./Content";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetPasswordAsync, { isLoading, isError, isUninitialized, isSuccess }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    try {
      await resetPasswordAsync({ email }).unwrap();
    } catch (err) {
      console.warn("Coś poszło nie tak podczas próby wysłania emaila do resetowania hasła");
    }
  };

  const isButtonDisabled = isLoading || email.length == 0;
  const buttonLabel = isUninitialized ? "Resetuj hasło" : "Wyślij wiadomość ponownie";

  return (
    <Content.Wrapper>
      <Text
        color="gray"
        children="Wpisz swój adres email poniżej, następnie kliknij przycisk [Resetuj hasło],
         a my wyślemy na twojego maila kod do zresetowania hasła.
        Dalej podązaj zgodnie z instrukcjami, które są zawarte w wiadomości wysłanej na adres email"
      />
      <Field label="Adres email">
        <InputText size="md" maxW="450px" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>

      <AsyncButton
        isLoading={isLoading}
        disabled={isButtonDisabled}
        children={buttonLabel}
        onClick={handleResetPassword}
      />

      {isSuccess && <Text color="gray" children="Wysłano email resetujący na podany email" />}
      {isError && <Text fontSize="sm" mt="0" color="red" children="Nie udało się wysłać wiadomości na podany email" />}
    </Content.Wrapper>
  );
};

export default ForgotPassword;
