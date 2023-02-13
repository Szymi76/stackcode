import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useChangePasswordMutation } from "../../../features/auth/authApiSlice";
import { showInfoToast } from "../Toast";
import { setUser } from "../../../features/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";

import AsyncButton from "../../../components/AsyncButton";
import { Field } from "@welcome-ui/field";
import { InputText } from "@welcome-ui/input-text";
import useToast from "../../../hooks/useToast";
import * as Setting from "../Content";
import { Text } from "@welcome-ui/text";

type Inputs = {
  password: string;
  newPassword: string;
  repearNewPassword: string;
};

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAppSelector((state) => state.auth);
  const [changePassword, { error, isLoading }] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { password, newPassword } = data;
      const { user } = await changePassword({ newPassword, oldPassword: password }).unwrap();
      dispatch(setUser(user));
      toast("Hasło zostało zmienione");
      reset();
    } catch (err) {
      console.warn("Coś poszło nie tak podczas zmiany hasłą");
    }
  };
  console.log(error);
  return (
    <Setting.Wrapper title="Zmień hasło">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field label="Aktualne hasło" maxW="400" error={errors && errors.password && errors.password.message}>
          <InputText {...register("password", { required: "Pole jest wymagane" })} type="password" />
        </Field>

        <Field label="Nowe hasło" maxW="400" error={errors && errors.newPassword && errors.newPassword.message}>
          <InputText
            {...register("newPassword", {
              required: "Pole jest wymagane",
              minLength: { value: 5, message: "Hasło musi mieć co najmniej 5 znaków" },
            })}
            type="password"
          />
        </Field>

        <Field
          label="Powtórz nowe hasło"
          maxW="400"
          error={errors && errors.repearNewPassword && errors.repearNewPassword.message}>
          <InputText
            {...register("repearNewPassword", {
              required: "Pole jest wymagane",
              validate: (val) => {
                if (watch("newPassword") != val) return "Hasła nie są takie same";
              },
            })}
            type="password"
          />
        </Field>

        {/* @ts-ignore */}
        {error && error.status == 409 && <Text fontSize="sm">Błędne hasło</Text>}

        {/* przycisk zapisz */}
        <AsyncButton isLoading={isLoading} mt="1rem" type="submit" disabled={isLoading} children="Zmień hasło" />
      </form>
    </Setting.Wrapper>
  );
};

export default ChangePassword;
