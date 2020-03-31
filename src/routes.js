import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import CadastroScreen from "./components/screens/cadastro";
import LoginScreen from './components/screens/login';
import HomeScreen from "./components/screens/home";

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/register" component={CadastroScreen} />
                <Route exact path="/login" component={LoginScreen} />
            </Switch>
        </BrowserRouter>
    )
}