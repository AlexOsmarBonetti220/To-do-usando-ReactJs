import React from "react";

import {useHistory} from 'react-router-dom';

export default function Home(){
    let history = useHistory();
    const gotoLogin = () => {
        history.push("/login");
    }
    const gotoRegister = () => {
        history.push("/register");
    }
    return(
        <div>
            <div>
                <h2>Super Sitemas</h2>
            </div>
            <div>
                <button type="button" onClick={gotoLogin} >Login</button>
                <button type="button" onClick={gotoRegister} >Cadastro</button>
            </div>
        </div>
    )
}