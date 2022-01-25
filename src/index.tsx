import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
ReactDOM.render(
  <React.StrictMode>
    <Toaster
      containerStyle={{
        position: "relative",
      }}
      toastOptions={{
        duration: 500,
        error: {
          icon: null,
          style: {
            background: "black",
            color: "white",
            animation: "none",
          },
        },
      }}
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
