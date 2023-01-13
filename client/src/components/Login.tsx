import axios from "axios";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = data;
    if (email.trim().length == 0 || password.trim().length == 0) {
      setError("Wszystkie pola są wymagane");
      return;
    }

    await axios.post(
      "http://localhost:3000/api/auth/login",
      { email, password },
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
  //       if (status === 404) setError("Użytkownik z takim adresem email nie istnieje");
  //       if (status === 403) setError("Adres email lub hasło się nie zgadzają");
  //     }
  //   }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Zaloguj się</h2>

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

      <button>Zaloguj się</button>
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
};

export default Login;
