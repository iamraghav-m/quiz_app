import React, { StrictMode }  from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from 'react-helmet-async';
import {Provider} from "react-redux";
import store from './store';

import "./index.css";
import App from "./App";

// If you are using react-helmet-async on server side
const helmetContext = {};

ReactDOM.render(<StrictMode>
    <HelmetProvider context={helmetContext}>
        <Provider store={store}>
            <App />
        </Provider>
    </HelmetProvider>
</StrictMode>, document.getElementById("root"));
