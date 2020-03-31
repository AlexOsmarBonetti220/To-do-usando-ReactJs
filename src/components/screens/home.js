import React from "react";

import {useHistory} from 'react-router-dom';

export default function Home(){
    return(
        <div>
            <div>
                <h2>Super Sitemas</h2>
            </div>
            <div>
                <button type="button">Login</button>
                <button type="button">Cadastro</button>
            </div>
        </div>
    )
}