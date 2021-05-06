import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Layout from "./layout/Layout";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Layout/>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
