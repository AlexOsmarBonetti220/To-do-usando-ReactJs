import React from "react";

import {Link} from "react-router-dom";

export default function NotFound(){
    return(
        <div>
            <h3>Página não encontrada</h3>
            <Link to="/">Voltar para a página inicial</Link>
        </div>
    )
}