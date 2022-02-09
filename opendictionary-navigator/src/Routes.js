import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./containers/Home"
import NotFound from "./containers/NotFound";
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<Home/>}>
                    <Home/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}