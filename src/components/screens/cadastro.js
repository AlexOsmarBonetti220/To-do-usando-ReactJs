import React, {useState, useEffect} from 'react';

import firebase from "../shared/firebaseConnection";

export default function App(){
  const [log, setLog] = useState([])
  
  const changeLog = (e) => {
    setLog({
      ...log,
      [e.currentTarget.name]:e.currentTarget.value
    })
  }

  const createUser = (e) => {
    firebase.auth().signOut();
    firebase.auth().createUserWithEmailAndPassword(log.email, log.password)
    .catch((error)=>{
      alert(error);
    })
    e.preventDefault();
  }

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        alert(user.uid);
      }else{
        alert("não está logado!");
      }
    })
  }, [])

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
