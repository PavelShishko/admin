import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/UserApi";
import "./UserPanel.css";

export const UserPanel = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data.rows))
      .catch((e) => console.log(new Error(e)));
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Пользователи</h1>
      </header>
      <main className="main">
        <table border={1} cellPadding={10}>
          <tbody>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Дата регистрации</th>
              <th>Время регистрации</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.createdAt.slice(0, 10)}</td>
                <td>{user.createdAt.slice(11, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};
