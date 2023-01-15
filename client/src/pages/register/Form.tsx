import { useAppDispatch } from "../../app/hooks";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { setUser } from "../../features/auth/authSlice";
import { InputText } from "@welcome-ui/input-text";
import { Field } from "@welcome-ui/field";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import { Link } from "react-router-dom";
import { Checkbox } from "@welcome-ui/checkbox";

type Inputs = {
  displayName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  policy: boolean;
  newsLetter: boolean;
};

const Form = () => {
  const dispatch = useAppDispatch();
  const [createAccount, { error }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  // tworzenie konta
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { displayName, email, password, passwordRepeat } = data;
      const { user } = await createAccount({ displayName, email, password }).unwrap();
      dispatch(setUser(user));
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field error={errors && errors.displayName && errors.displayName.message} label="Twoja nazwa" mb="1rem">
        <InputText
          {...register("displayName", {
            required: "Pole jest wymagane",
            minLength: { value: 4, message: "Twoja nazwa musi mieć co najmniej 4 znaki" },
            maxLength: { value: 16, message: "Twoja nazwa może mieć co najwyżej 16 znaków" },
          })}
          type="text"
          size="md"
        />
      </Field>
      <Field error={errors && errors.email && errors.email.message} label="Adres email" mb="1rem">
        <InputText {...register("email", { required: "Pole jest wymagane" })} type="email" size="md" />
      </Field>
      <Field error={errors && errors.password && errors.password.message} label="Hasło" mb="1rem">
        <InputText
          {...register("password", {
            required: "Pole jest wymagane",
            minLength: { value: 5, message: "Hasło musi wynosić co najmniej 5 znaków" },
          })}
          type="password"
          size="md"
        />
      </Field>
      <Field error={errors && errors.passwordRepeat && errors.passwordRepeat.message} label="Powtórz hasło" mb="1rem">
        <InputText
          {...register("passwordRepeat", {
            required: "Pole jest wymagane",
            minLength: { value: 5, message: "Hasło musi wynosić co najmniej 5 znaków" },
            validate: (val) => {
              if (watch("password") != val) {
                return "Hasła nie są takie same";
              }
            },
          })}
          type="password"
          size="md"
        />
      </Field>

      {/* @ts-ignore */}
      {error && error.data && error.data.status == 409 && (
        <Text fontSize="sm" m={0} children="Użytkownik z takim adresem email już istnieje" />
      )}
      <Controller
        name="policy"
        control={control}
        rules={{ required: "Pole jest wymagane" }}
        render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
          return (
            <Field error={error && error.message} label="zgadzasz się na prawa polityki których nie ma *" mt="xl">
              <Checkbox {...field} checked={value} onClick={onChange} />
            </Field>
          );
        }}
      />

      <Controller
        name="newsLetter"
        control={control}
        render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
          return (
            <Field
              error={error && error.message}
              label="chcesz aby twój email był co tydzień zasypywany przez nieużyteczne wiadomości">
              <Checkbox {...field} checked={value} onClick={onChange} />
            </Field>
          );
        }}
      />

      {/* przycisk do logowania */}
      <Button w="100%" type="submit" my=".25rem" children="Kontynuuj" />

      {/* text - nie masz konta wraz z linkiem */}
      <Flex alignItems="start" gap=".75rem" mb=".25rem">
        <Text fontWeight={400} fontSize="0.9em" margin={0} children="Masz już konto" />
        <Link to={"/zaloguj-sie"} className={"link"} children="Zaloguj się" />
      </Flex>
    </form>
  );
};

export default Form;
