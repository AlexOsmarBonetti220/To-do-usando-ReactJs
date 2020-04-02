import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import CadastroScreen from "./components/screens/cadastro";
import LoginScreen from './components/screens/login';
import HomeScreen from "./components/screens/home";
import InicialScreen from "./components/screens/telaInicial";
import NotFoundScreen from "./components/screens/notFound";
import addToDoScreen from './components/screens/addToDo';
import opcoesTarefaScreen from './components/screens/opcoesTarefa';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/home" component={InicialScreen} />
                <Route exact path="/register" component={CadastroScreen} />
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/addToDo" component={addToDoScreen} />
                <Route exact path="/edit/:id" component={opcoesTarefaScreen} />
                <Route path="*" component={NotFoundScreen} />
            </Switch>
        </BrowserRouter>
    )
}