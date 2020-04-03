import React, {useState, useEffect} from "react";

import firebase from "../shared/firebaseConnection";
import {useHistory} from "react-router-dom";

import "./style.css"

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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" />
          <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
          <nav class="navbar" role="navigation" aria-label="main navigation">
              <div class="navbar-brand">
                  <span class="navbar-item">
                      <img src="https://4.bp.blogspot.com/-OyrEG395YYk/Uco4oqI-G5I/AAAAAAAAZXc/kBTRubb55rg/s1600/todolist_logo.gif" width="112" height="28" alt="Bulma"/>
                  </span>
                  <span class="navbar-item">
                      <h3>Bem vindo</h3>
                  </span>
                  <span class="navbar-item">
                      <div className="buttons are-small">
                          <button type="button" className="button is-warning" onClick={()=>{
                            history.push("/home");
                          }}>Voltar</button>
                      </div>
                  </span>
              </div>
          </nav>
          <div className="corpo">
              <h2 style={{paddingBottom:15}} className="titulo">Adicione uma nova tarefa</h2>
              <form onSubmit={addToDo}>
                  <div>
                      <div className="field">
                        <label htmlFor="todoName" className="label">Digite o nome da tarefa</label>
                        <p className="control">
                          <input type="text" placeholder="Correr" onChange={changeToDo} className="input is-danger" name="todoName" id="todoName" onClick={changeToDo} />
                        </p>
                      </div>
                      <div className="field">
                        <label htmlFor="todoDescription" className="label">Digite a descrição da tarefa</label>
                        <p className="control">
                          <textarea id="todoDescription" name="todoDescription" className="textarea is-success" rows="5" placeholder="Correr, todas as manhãs, 10 minutos" onChange={changeToDo}></textarea>
                        </p>
                      </div>
                      <div className="field">
                        <button type="submit" className="button is-link is-outlined">Adicionar tarefa</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
    )
}
