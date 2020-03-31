import React, {useEffect} from "react";

import firebase from "../shared/firebaseConnection";

import {useHistory} from "react-router-dom";

export default function TelaInicial(){
    let history = useHistory();
    const signOut = () => {
        firebase.auth().signOut();
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                history.push("/");
            }
        })
    }, [])
    return(
        <div>
            <h2>Tela Inicial</h2>
            <button type="button" onClick={signOut}>Sair</button>
        </div>
    )
}