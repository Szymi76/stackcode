import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { setUser } from "../../features/auth/authSlice";

// komponenty
import { InputText } from "@welcome-ui/input-text";
import { Field } from "@welcome-ui/field";
import { Text } from "@welcome-ui/text";
import { Flex } from "@welcome-ui/flex";
import { Button } from "@welcome-ui/button";
import { Link } from "react-router-dom";
import { Loader } from "@welcome-ui/loader";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const dispatch = useAppDispatch();
  const [login, { error, isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // logowanie
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { email, password } = data;
      const { user } = await login({ email, password }).unwrap();
      dispatch(setUser(user));
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* adres email */}
      <Field error={errors && errors.email && errors.email.message} label="Adres email">
        <InputText {...register("email", { required: "Pole jest wymagane" })} type="email" size="md" />
      </Field>

      {/* hasło */}
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

      {/* @ts-ignore */}
      {error && error.data && error.data.status == 404 && (
        <Text fontSize="sm" m={0}>
          Konto z takim adresem email nie istnieje
        </Text>
      )}

      {/* @ts-ignore */}
      {error && error.data && error.data.status == 409 && (
        <Text fontSize="sm" m={0}>
          Adres email lub hasło jest błędne
        </Text>
      )}

      {/* przycisk do logowania */}
      <Button w="100%" type="submit" my=".25rem" disabled={isLoading}>
        {isLoading && <Loader color="white" size="xs" mr=".5rem" />}
        Kontynuuj
      </Button>

      {/* link do stworzenia konta */}
      <Flex alignItems="start" gap=".75rem" mb=".25rem">
        <Text fontWeight={400} fontSize="0.9em" margin={0}>
          Nie masz konta?{" "}
        </Text>
        <Link to={"/stworz-konto"} className={"link"} children="Stwórz konto" />
      </Flex>

      {/* link do resetowania hasła */}
      <Link to={"/resetowanie-hasla"} className={"link"} children="Zapomniałeś hasła?" />
    </form>
  );
};

export default Form;
