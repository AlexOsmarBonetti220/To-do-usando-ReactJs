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
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.1/css/bulma.min.css" />
            <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
            <div>
                <img src="https://sanet.pics/storage-3/0917/Dj0Ev6sEnlvnQzzRmCVdblxmPHWlidTV.png" />
            </div>
            <div>
                <button style={{marginRight:20}} class="button is-primary is-focused" onClick={gotoLogin}>Login</button>
                <button className="button is-link is-focused" onClick={gotoRegister}>Cadastro</button>
            </div>
        </div>
    )
}