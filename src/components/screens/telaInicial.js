import React, {useEffect, useState} from "react";

import firebase from "../shared/firebaseConnection";

import {useHistory} from "react-router-dom";

export default function TelaInicial(){
    let history = useHistory();
    const [nome, setNome] = useState("");
    const [todo, setTodo] = useState([]);
    let [tarefas, setTarefas] = useState([]);
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
            todoDescription: todo.todoDescription,
            todoCompleted:false
        })
        e.preventDefault();
    }
    const completarTarefa = (todoKey) => {
        //Entrando no firebase e completando a tarefa
        if(uid !== 0)
            firebase.database().ref("todo").child(uid).child(todoKey).child("todoCompleted").set(true);
        else
            alert("Erro ao completar tarefa!");    
    }
    const removerTarefa = (todoKey) => {
        if(uid != 0)
            firebase.database().ref("todo").child(uid).child(todoKey).child("todoCompleted").set(false);
        else
            alert("Erro ao desmarcar tarefa");
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
                    tarefas = [];
                    snapshot.forEach((child)=>{
                        //Coloco no array
                        tarefas.push({
                            todoName:child.val().todoName,
                            todoDescription:child.val().todoDescription,
                            todoCompleted:child.val().todoCompleted,
                            todoKey:child.key
                        })
                    })
                    setTarefas([...tarefas, tarefas]);
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
                            <div onClick={()=>completarTarefa(tarefa.todoKey)} onDoubleClick={()=>removerTarefa(tarefa.todoKey)} style={{width:tarefa.todoKey !== undefined ? 20:0, height:tarefa.todoKey !== undefined ? 20:0, backgroundColor:tarefa.todoCompleted == true?"green":"red"}}></div>
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