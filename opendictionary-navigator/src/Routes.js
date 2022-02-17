import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./containers/Home"
import NotFound from "./containers/NotFound";
import Dashboard from "./containers/instance/Dashboard";
import Resume from "./containers/Resume";
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" element={<Home/>}>
                    <Home/>
                </Route>
                <Route exact path ="/od" children={<Resume/>}/>
                <Route exact path="/od/:url" element={<Dashboard/>}>
                    <Dashboard/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}