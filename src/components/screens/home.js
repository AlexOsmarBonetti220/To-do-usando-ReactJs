import React from "react";

import {useHistory} from 'react-router-dom';

import "./style.css";

export default function Home(){
    let history = useHistory();
    const gotoLogin = () => {
        history.push("/login");
    }
    const gotoRegister = () => {
        history.push("/register");
    }
    return(
        <div className="corpo">
            <div>
                <img src="https://sanet.pics/storage-3/0917/Dj0Ev6sEnlvnQzzRmCVdblxmPHWlidTV.png" />
            </div>
            <div>
                <button type="button" onClick={gotoLogin} >Login</button>
                <button type="button" onClick={gotoRegister} >Cadastro</button>
            </div>
        </div>
    )
}