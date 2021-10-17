import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import 'antd/dist/antd.min';
import 'antd/dist/antd.min.css';
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
