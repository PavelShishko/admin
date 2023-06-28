import React, { useContext } from "react";
import "./App.css";
import { NavPanel } from "./NavigationPanel/NavPanel";
import UserStore from "./store/UserStore";
import { Auth } from "./components/Auth/Auth";
import { observer } from "mobx-react";

export const Context = React.createContext(null);

const App = () => {
  return (
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <NavPanel />
    </Context.Provider>
  );
};

export default App;
