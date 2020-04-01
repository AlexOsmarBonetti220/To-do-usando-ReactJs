import React, {useState, useEffect} from "react";

import firebase from "../shared/firebaseConnection";
import {useHistory} from "react-router-dom";

export default function AddToDo(){
    let history = useHistory();
    const [todo, setTodo] = useState([]);
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

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                let uid = user.uid;
                setUid(uid);
            } 
        })
    }, [])

    return(
        <div>
            <div>
                <h2>Adicione uma nova tarefa</h2>
                <form onSubmit={addToDo}>
                    <div>
                        <label htmlFor="todoName">Digite o nome da tarefa: </label>
                        <input type="text" id="todoName" value={todo.todoName} name="todoName" onChange={changeToDo} /><br/><br/>
                        <label htmlFor="todoDescription">Digite a descrição da tarefa: </label><br/>
                        <textarea rows="5" cols="20" id="todoDescription" value={todo.todoDescription} name="todoDescription" onChange={changeToDo}></textarea>                    </div>
                    <div>
                        <input type="submit" />
                        <input type="button" value="Voltar para o menu" onClick={()=>{
                            history.push("/home");
                        }} />
                    </div>
                </form>
            </div>
        </div>
    )
}