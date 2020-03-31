import React, {useState} from 'react';

import {useHistory} from 'react-router-dom';

import firebase from "../shared/firebaseConnection";

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
        <div>
            <form onSubmit={sigInUser}>
                <div>
                    <label htmlFor="email">Digite seu email: </label>
                    <input type="email" id="email" name="email" value={log.email} onChange={changeLog} /><br/><br/>
                    <label htmlFor="password">Digite sua senha: </label>
                    <input type="password" id="password" name="password" value={log.password} onChange={changeLog} /><br/><br/>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}