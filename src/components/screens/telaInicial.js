import React, {useEffect, useState} from "react";

import firebase from "../shared/firebaseConnection";

import {useHistory} from "react-router-dom";

export default function TelaInicial(){
    let history = useHistory();
    const [uid, setUid] = useState(0);
    const [nome, setNome] = useState("");

    const signOut = () => {
        firebase.auth().signOut();
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(!user){
                history.push("/");
            }else{
                setUid(user.uid);
                firebase.database().ref("users").child(user.uid).on("value", (snapshot)=>{
                    let nome = snapshot.val().nome
                    setNome(nome);
                })
            }
        })
    }, [])
    return(
        <div>
            <h2>Tela Inicial</h2>
            <h3>Seu uid: {uid}</h3>
            <h3>Seu nome: {nome}</h3>
            <button type="button" onClick={signOut}>Sair</button>
        </div>
    )
}