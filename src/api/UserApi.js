import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const fetchUsers = async () => {
  const { data } = await $host.get(`api/user/users`);
  return data;
};

export const login = async (email, password) => {
  const { data } = await $host.post(`api/user/login`, {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("/api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
