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
    <div className="corpo">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" />
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      <h4 style={{ fontSize: 30, paddingBottom: 20 }}>Faça seu cadastro</h4>
      <form onSubmit={createUser}>
        <div>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Name: " />
            </div>
          </div>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className="input is-success" type="text" placeholder="Username: " />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input is-danger" type="email" placeholder="Email: " />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control">
              <input className="input" type="password" placeholder="Password: " />
            </p>
          </div>
        </div>
        <div style={{ paddingTop: 20 }}>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

