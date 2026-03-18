import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import { ActivityProvider } from "./context/ActivityContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <Provider store={store}>

      <AuthProvider>

        <ActivityProvider>

          <App />

        </ActivityProvider>

      </AuthProvider>

    </Provider>

  </React.StrictMode>
);