import React from "react";
import "./Home.css";
import logo from "../../images/emblem.png";

export const Home = () => {
  return (
    <div className="home-page">
      <h1>Админ Панель для мобильного приложения АвтоШоп</h1>
      <img className="image" src={logo} alt="logo" />
    </div>
  );
};
