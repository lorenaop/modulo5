import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./views/Home";
import Cadastros from "./views/cadastros/";
import CadastrosCreate from "./views/cadastros/Create";
import Destinos from "./views/destino";
import DestinosCreate from "./views/destino/Create";
import Passagens from "./views/passagens";
import PassagensCreate from "./views/passagens/Create";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import './views/style.css';

function App() {
  return (
    <BrowserRouter>
  
        <Menu />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Cadastros" element={<Cadastros />} />
          <Route path="/Cadastros-Create" element={<CadastrosCreate />} />
          <Route path="/Cadastros-Update/:id" element={<CadastrosCreate />} />
          <Route path="/Destinos" element={<Destinos />} />
          <Route path="/Destinos-Create" element={<DestinosCreate />} />
          <Route path="/Destinos-Update/:id" element={<DestinosCreate />} />
          <Route path="/Passagens" element={<Passagens />} />
          <Route path="/Passagens-Create" element={<PassagensCreate />} />
          <Route path="/Passagens-Update/:id" element={<PassagensCreate />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;