import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider domain={"fermitech.eu.auth0.com"} clientId={"dhkUeTUEkCb7uqs12w7kARvn9iKumk8h"}
                   redirectUri={"http://localhost:3000/od/localhost:8000"} audience={"test"} scope={"read:current_user"}>
            <App/>,
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
