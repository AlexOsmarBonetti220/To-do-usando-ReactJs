import React, { useEffect, useState } from "react";

import firebase from "../shared/firebaseConnection";

import { useHistory } from "react-router-dom";

import "./style.css";

export default function TelaInicial() {
    let history = useHistory();
    const [nome, setNome] = useState("");
    const [todo, setTodo] = useState([]);
    let [tarefas, setTarefas] = useState([]);
    const [uid, setUid] = useState(0);
    const [load, setLoad] = useState(false);

    const completarTarefa = (todoKey) => {
        //Entrando no firebase e completando a tarefa
        if (uid !== 0)
            firebase.database().ref("todo").child(uid).child(todoKey).child("todoCompleted").set(true);
        else
            alert("Erro ao completar tarefa!");
    }

    const descompletarTarefa = (todoKey) => {
        if (uid !== 0)
            firebase.database().ref("todo").child(uid).child(todoKey).child("todoCompleted").set(false);
        else
            alert("Erro ao desmarcar tarefa");
    }

    const removerTarefa = (todoKey) => {
        if (uid !== 0) {
            firebase.database().ref("todo").child(uid).child(todoKey).remove();
        } else
            alert("Erro ao remover tarefa!");
    }

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
                    snapshot.forEach((child) => {
                        //Coloco no array
                        tarefas.push({
                            todoName: child.val().todoName,
                            todoDescription: child.val().todoDescription,
                            todoCompleted: child.val().todoCompleted,
                            todoKey: child.key
                        })
                    })
                    setTarefas([...tarefas, tarefas]);
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
                        <a class="navbar-item">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Bulma"/>
                        </a>
                        <a class="navbar-item">
                            <h3>Bem vindo, {nome}</h3>
                        </a>
                        <a class="navbar-item">
                            <div className="buttons are-small">
                                <button type="button" className="button is-danger is-outlined" onClick={signOut}>Logout</button>
                            </div>
                        </a>
                    </div>
                </nav>
                <div className="corpo">
                    <div>
                        <h1>To do online</h1>
                        
                        
                    </div>
                    <div>
                        {tarefas.map((tarefa) => {
                            if (tarefa.todoKey !== undefined) {
                                return (
                                    <div key={tarefa.todoKey}>
                                        <div onClick={() => completarTarefa(tarefa.todoKey)} onDoubleClick={() => descompletarTarefa(tarefa.todoKey)} style={{ width: 20, height: 20, backgroundColor: tarefa.todoCompleted === true ? "green" : "red" }}></div>
                                        <h3>{tarefa.todoName}</h3>
                                        <p>{tarefa.todoDescription}</p>
                                        <span onClick={() => removerTarefa(tarefa.todoKey)}>X</span>
                                    </div>
                                )
                            } else
                                return null
                        })}
                    </div>
                    <div>
                        <button type="button" onClick={() => {
                            history.push("/addToDo");
                        }}>+ Tarefa</button>
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