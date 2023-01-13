import axios from "axios";
import React, { useEffect, useState } from "react";

const Register = () => {
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { displayName, email, password, passwordConfirm } = data;
    if (displayName.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0) {
      setError("Wszystkie pola są wymagane");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Hasła nie są takie same");
      return;
    }

    if (displayName.trim().length < 5) {
      setError("Twoja nazwa musi mieć co najmniej 4 znaki");
      return;
    }

    if (password.trim().length < 5) {
      setError("Hasło musi mieć co najmniej 5 znaków");
      return;
    }

    await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        displayName,
        email,
        password,
      },
      { withCredentials: true }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(null);
  };

  //   useEffect(() => {
  //     if (errors && !error) {
  //       // @ts-ignore
  //       const { status } = errors;
  //       if (status === 409) setError("Użytkownik z takime adres email już istnieje");
  //     }
  //   }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Stwórz konto</h2>

      <label>Twoja nazwa</label>
      <input
        type="text"
        name="displayName"
        value={data.displayName}
        onChange={handleChange}
        placeholder="np. adam2"
      />

      <label>Adres email</label>
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="np. adam2@gmail.com"
      />

      <label>Hasło</label>
      <input type="password" name="password" value={data.password} onChange={handleChange} />

      <label>Potwierdź hasło</label>
      <input
        type="password"
        name="passwordConfirm"
        value={data.passwordConfirm}
        onChange={handleChange}
      />

      <button>Stwórz konto</button>
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
};

export default Register;
