import React, { useContext, useState } from "react";
import { Context } from "../../App";
import { login } from "../../api/UserApi";
import { NavPanel } from "../../NavigationPanel/NavPanel";

export const Auth = () => {
  const { user } = useContext(Context);
  const [log, setLog] = useState("");
  const [pass, setPass] = useState("");

  const signIn = async () => {
    let data = await login(log, pass);
    if (data.role === "ADMIN") {
      user.setIsAuth(true);
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: 200,
      }}
    >
      <h1>Авторизация</h1>
      <input
        style={{ fontSize: 36 }}
        placeholder="Логин"
        onChange={(e) => setLog(e.target.value)}
      />
      <input
        style={{ fontSize: 36 }}
        placeholder="Пароль"
        onChange={(e) => setPass(e.target.value)}
        type="password"
      />
      <button style={{ fontSize: 30, marginTop: 10 }} onClick={() => signIn()}>
        Войти
      </button>
    </div>
  );
};
