import React, {useState, useEffect} from "react";

import firebase from "../shared/firebaseConnection";

import {useParams} from "react-router-dom";

import {useHistory} from "react-router-dom";

import "./style.css";

export default function OpcoesTarefa(){
    let history = useHistory();
    let {id} = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [uid, setUid] = useState(0);
    const mudarTarefa = () => {
        //Testo de devo concluir ou desconcluir
        if(completed){
            //Descompleto
            firebase.database().ref("todo").child(uid).child(id).child("todoCompleted").set(false);
            alert("Tarefa desconcluída com sucesso!");
        }else{
            //Completo
            firebase.database().ref("todo").child(uid).child(id).child("todoCompleted").set(true);
            alert("Tarefa concluída com sucesso!");
        }
    }
    const removerTarefa = () => {
        firebase.database().ref("todo").child(uid).child(id).remove();
        alert("Tarefa removida com sucesso!");
        history.push("/home");
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let uid = user.uid;
                setUid(uid);
                firebase.database().ref("todo").child(uid).child(id).on("value", (snapshot)=>{
                    if(snapshot.val() !== null && snapshot.val() !== undefined){
                        let name = snapshot.val().todoName;
                        let description = snapshot.val().todoDescription;
                        let completed = snapshot.val().todoCompleted;
                        setName(name);
                        setDescription(description);
                        setCompleted(completed);
                    }
                })
            }
        })
    }, [])
    let button;
    completed ? button = "Desconcluir tarefa" : button = "Concluir tarefa";

    return(
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" />
            <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <span className="navbar-item">
                        <img src="https://4.bp.blogspot.com/-OyrEG395YYk/Uco4oqI-G5I/AAAAAAAAZXc/kBTRubb55rg/s1600/todolist_logo.gif" width="112" height="28" alt="Bulma"/>
                    </span>
                    <span className="navbar-item">
                        <div className="buttons are-small">
                            <button className="button is-success" onClick={mudarTarefa}>{button}</button>
                        </div>
                    </span>
                    <span className="navbar-item">
                        <div className="buttons are-small">
                            <button className="button is-danger" onClick={removerTarefa}>Remover tarefa</button>
                        </div>
                    </span>
                    <span className="navbar-item">
                        <div className="buttons are-small">
                            <button className="button is-warning" onClick={()=>{
                                history.push("/home");
                            }}>Voltar</button>
                        </div>
                    </span>
                </div>
            </nav>
            <div className="corpo">
                <div>
                    <h1 className="titulo-grande">Tarefa</h1>
                    <label className="label">Nome</label>
                    <h3 style={{color:"#0000FF"}} className="titulo">{name}</h3>
                    <br/>
                    <label className="label">Descrição</label>
                    <p style={{color:"#FF0000"}} className="todoDescription">{description}</p>
                </div>
                <hr/>
            </div>
        </div>
    )
}
