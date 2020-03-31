import React, {useState} from 'react';

import firebase from "../shared/firebaseConnection";

import {useHistory} from "react-router-dom"; 

export default function App(){
  let history = useHistory();
  const [log, setLog] = useState([])
  
  const changeLog = (e) => {
    setLog({
      ...log,
      [e.currentTarget.name]:e.currentTarget.value
    })
  }

  const createUser = (e) => {
    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          firebase.database().ref("users").child(user.uid).set({
            nome:log.name
          })
          history.push("/home");
        }else{
          history.push("/");
        }
      })

    firebase.auth().createUserWithEmailAndPassword(log.email, log.password)
    .catch((error)=>{
      alert(error);
    })
    e.preventDefault();
  }

  return(
    <div>
      <div>
        <form onSubmit={createUser}>
          <div>
            <label htmlFor="name">Digite seu nome: </label>
            <input type="text" id="name" name="name" placeholder="Nome" onChange={changeLog} />
            <label htmlFor="email">Digite seu email: </label>
            <input type="email" id="email" name="email" placeholder="user@domain.com" onChange={changeLog} /><br/><br/>
            <label htmlFor="password">Digite a sua senha: </label>
            <input type="password" id="password" name="password" onChange={changeLog} /><br/><br/>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
