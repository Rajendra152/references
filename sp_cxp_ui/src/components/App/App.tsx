import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.global.css";

import { initializeIcons } from "@uifabric/icons";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import routes from "../../Routes";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18n";
// import { forwardToRenderer, triggerAlias, replayActionMain, replayActionRenderer } from 'electron-redux';

// console.log("kiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
export const store = configureStore();

//replayActionRenderer(store)

initializeIcons();

// const Hello = () => {
//   return (
//     <Provider store={store}>
//     <div className="main-window">
//       <MainWindow />
//     </div>
//     </Provider>
//   );
// };

export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <div className='main-window'>
            <Switch>
              {routes.map((route, idx) => {
                return route.compontent ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.compontent {...props} />}
                  />
                ) : null;
              })}
              <Redirect from='/' to='/home' />
            </Switch>
          </div>
        </Router>
      </I18nextProvider>
    </Provider>
  );
}
