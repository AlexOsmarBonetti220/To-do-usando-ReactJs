import React, {useEffect, useState} from "react";

import firebase from "../shared/firebaseConnection";

import {useHistory} from "react-router-dom";

export default function TelaInicial(){
    let history = useHistory();
    const [nome, setNome] = useState("");
    const [todo, setTodo] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [uid, setUid] = useState(0);
    const changeToDo = (e) => {
        setTodo({
            ...todo,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }
    const addToDo = (e) => {
        let userTodo = firebase.database().ref("todo").child(uid);
        let key = userTodo.push().key;
        userTodo.child(key).set({
            todoName: todo.todoName,
            todoDescription: todo.todoDescription
        })
        e.preventDefault();
    }

    const signOut = () => {
        firebase.auth().signOut();
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                history.push("/");
            }else{
                let uid = user.uid;
                setUid(uid);
                firebase.database().ref("users").child(user.uid).on("value", (snapshot)=>{
                    let nome = snapshot.val().nome
                    setNome(nome);
                })
                //Pegando os dados das tarefas no firebase
                firebase.database().ref("todo").child(user.uid).on("value", (snapshot)=>{
                    snapshot.forEach((child)=>{
                        //Coloco no array
                        tarefas.push({
                            todoName:child.val().todoName,
                            todoDescription:child.val().todoDescription,
                            todoKey:child.key
                        })
                    })
                    setTarefas([...tarefas, tarefas]);
                },error => {
                    alert(error);
                })
            }
        })
    }, [])
    return(
        <div>
            <div>
                <h1>To do online</h1>
                <h3>Bem vindo, {nome}</h3>
            </div>
            <div>
                <form onSubmit={addToDo}>
                    <div>
                        <label htmlFor="todoName">Digite o nome da tarefa: </label>
                        <input type="text" id="todoName" value={todo.todoName} name="todoName" onChange={changeToDo} /><br/><br/>
                        <label htmlFor="todoDescription">Digite a descrição da tarefa: </label><br/>
                        <textarea id="todoDescription" value={todo.todoDescription} name="todoDescription" onChange={changeToDo}></textarea>
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
            <div>
                {tarefas.map((tarefa)=>{
                    return(
                        <div key={tarefa.todoKey}>
                            <h4>{tarefa.todoKey}</h4>
                            <h3>{tarefa.todoName}</h3>
                            <p>{tarefa.todoDescription}</p>
                        </div>
                    )
                })}
            </div>
            <button type="button" onClick={signOut}>Sair</button>
        </div>
    )
}