import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
  
   <nav className="navbar navbar-expand-md navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Agencia
      </Link>
          <li className="nav-item">
            <Link to="/Cadastros" className="nav-link text-dark">
              Cadastro
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Destinos" className="nav-link text-dark">
              Destino
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Passagens" className="nav-link text-dark">
              Passagem
            </Link>
          </li>
          
      </div>
  </nav>
);
}