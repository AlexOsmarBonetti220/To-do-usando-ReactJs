import React, {useState} from 'react';

import {useHistory} from 'react-router-dom';

import firebase from "../shared/firebaseConnection";

import "./style.css";

export default function Login(){
    let history = useHistory();
    const [log, setLog] = useState([]);

    const changeLog = (e) => {
        setLog({
            ...log,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }
    const sigInUser = (e) => {
        firebase.auth().signOut();

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                history.push("/home");
            }else{
                history.push("/");
            }
        })

        firebase.auth().signInWithEmailAndPassword(log.email, log.password)
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
            <form onSubmit={sigInUser}>
                <div>
                    <div className="field">
                        <label htmlFor="email" className="label">Email</label>
                        <p className="control">
                            <input id="email" name="email" className="input is-success" type="email" placeholder="Email" onChange={changeLog}/>
                        </p>
                    </div>
                    <div className="field">
                        <label htmlFor="password" className="label">Password</label>
                        <p className="control">
                            <input id="password" name="password" className="input is-danger" type="password" placeholder="Password" onChange={changeLog}/>
                        </p>
                    </div>
                </div>
                <div className="area-botoes">
                    <button style={{marginRight:15}} className="button is-success" type="submit">Login</button>
                    <button className="button is-danger " onClick={()=>{history.push("/")}}>Voltar</button>
                </div>
            </form>
      </div>
    )
}