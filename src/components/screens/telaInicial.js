import React, { useEffect, useState } from "react";

import firebase from "../shared/firebaseConnection";

import { useHistory } from "react-router-dom";

import "./style.css";

export default function TelaInicial() {
    let history = useHistory();
    const [nome, setNome] = useState("");
    const [todo, setTodo] = useState([]);
    let [tarefas, setTarefas] = useState([]);
    let [tarefasConcluidas, setTarefasConcluidas] = useState([]);
    const [uid, setUid] = useState(0);
    const [load, setLoad] = useState(false);
    const [empty, setEmpty] = useState(""); 
    const [emptyConcluidas, setEmptyConcluidas] = useState("");
    const signOut = () => {
        firebase.auth().signOut();
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                history.push("/");
            } else {
                let uid = user.uid;
                setUid(uid);
                firebase.database().ref("users").child(user.uid).on("value", (snapshot) => {
                    let nome = snapshot.val().nome
                    setNome(nome);
                })
                //Pegando os dados das tarefas no firebase
                firebase.database().ref("todo").child(user.uid).on("value", (snapshot) => {
                    tarefas = [];
                    tarefasConcluidas = [];
                    snapshot.forEach((child) => {
                        //Coloco no array
                        //Verifico se é completa ou não
                        if(child.val().todoCompleted == true){
                            tarefasConcluidas.push({
                                todoName: child.val().todoName,
                                todoDescription: child.val().todoDescription,
                                todoCompleted: child.val().todoCompleted,
                                todoKey: child.key
                            })
                        }else{
                            tarefas.push({
                                todoName: child.val().todoName,
                                todoDescription: child.val().todoDescription,
                                todoCompleted: child.val().todoCompleted,
                                todoKey: child.key
                            })
                        }
                        
                    })
                    setTarefas([...tarefas, tarefas]);
                    if(tarefas.length === 0)setEmpty("Você não possui tarefas nessa categoria!");
                    setTarefasConcluidas([...tarefasConcluidas, tarefasConcluidas]);
                    if(tarefasConcluidas.length === 0)setEmptyConcluidas("Você não possui tarefas nessa categoria!");
                    setLoad(true);
                })
            }
        })
    }, [])
    if (load) {
        return (
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" />
                <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <span class="navbar-item">
                            <img src="https://4.bp.blogspot.com/-OyrEG395YYk/Uco4oqI-G5I/AAAAAAAAZXc/kBTRubb55rg/s1600/todolist_logo.gif" width="112" height="28" alt="Bulma"/>
                        </span>
                        <span class="navbar-item">
                            <h3>Bem vindo, {nome}</h3>
                        </span>
                        <span className="navbar-item">
                            <div className="buttons are-small">
                                <button className="button is-link is-outlined" type="button" onClick={() => {
                                    history.push("/addToDo");
                                }}>+ Tarefa</button>
                            </div>
                        </span>
                        <span class="navbar-item">
                            <div className="buttons are-small">
                                <button type="button" className="button is-danger is-outlined" onClick={signOut}>Logout</button>
                            </div>
                        </span>
                    </div>
                </nav>
                <div className="corpo">
                    <div>
                        <div className="titulos-area">
                            <span className="titulo">Tarefas pendentes</span><br/>
                            <span>{empty}</span>
                        </div>
                        {tarefas.map((tarefa) => {
                            if (tarefa.todoKey !== undefined) {
                                return (
                                    <div className="todoItem" key={tarefa.todoKey}>
                                        <div>
                                            <h3 className="link" onClick={()=>history.push(`/edit/${tarefa.todoKey}`)}>{tarefa.todoName}</h3>
                                        </div>
                                    </div>
                                )
                            } else
                                return null
                        })}
                    </div>
                    <div>
                        <div className="titulos-area">
                            <span className="titulo">Tarefas concluídas</span><br/>
                            <span>{emptyConcluidas}</span>
                        </div>
                        {tarefasConcluidas.map((tConluida)=>{
                            if(tConluida.todoKey !== undefined){
                                return(
                                    <div className="todoItem" key={tConluida.todoKey}>
                                        <div>
                                            <h3 className="link" onClick={()=>history.push(`/edit/${tConluida.todoKey}`)}>{tConluida.todoName}</h3>
                                        </div>
                                    </div>
                                )
                            }else
                                return null;
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }
}