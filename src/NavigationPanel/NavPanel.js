import React, { useContext, useEffect } from "react";
import "./NavPanel.css";
import logo from "../images/emblem.png";
import { Routes, Route, Link } from "react-router-dom";
import { ModelPanel } from "../components/ModelPanel/ModelPanel";
import { BrandPanel } from "../components/BrandPanel/BrandPanel";
import { DevicePanel } from "../components/DevicePanel/DevicePanel";
import { UserPanel } from "../components/UserPanel/UserPanel";
import { OfferPanel } from "../components/OffersPanel/OfferPanel";
import { Home } from "../components/Home/Home";
import { observer } from "mobx-react";
import { Context } from "../App";
import { Auth } from "../components/Auth/Auth";

export const NavPanel = observer(() => {
  const { user } = useContext(Context);

  return (
    <div>
      {user.isAuth ? (
        <div className="nav_container">
          <div>
            <header className="header">
              <img className="logo" src={logo} alt="Logo" />
              <p className="title">Админ панель</p>
            </header>

            <div className="nav">
              <div className="nav">
                <Link className="link" to="/users">
                  Пользователи
                </Link>
                <Link className="link" to="/brands">
                  Марки
                </Link>
                <Link className="link" to="/models">
                  Модели
                </Link>
                <Link className="link" to="/devices">
                  Запчасти
                </Link>
                <Link className="link" to="/offers">
                  Заказы
                </Link>
              </div>
            </div>
          </div>

          <div className="right-panel">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserPanel />} />
              <Route path="/models" element={<ModelPanel />} />
              <Route path="/brands" element={<BrandPanel />} />
              <Route path="/devices" element={<DevicePanel />} />
              <Route path="/offers" element={<OfferPanel />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
});
