import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CadastroService from "../../services/CadastroService";

export default function Index() {
  const [cadastros, setCadastros] = useState([]);

  const getAllCadastros = () => {
    CadastroService.getAllCadastros()
      .then((response) => {
        setCadastros(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCadastros();
  }, []);

  console.log(cadastros)

  const deleteCadastro = (cadastroId) => {
    CadastroService.deleteCadastro(cadastroId)
      .then((response) => {
        getAllCadastros();
      })
      .catch((error) => {
        console.log(error);
        const { data } = error.response;
        if (data.status === 500) {
          alert("Erro na API");
        }
      });
  };

  return (
    <>
      <header className="header">
        <h1 className="container">Cadastro </h1>
      </header>
      <div className="container p-5">
        <Link to="/Cadastros-Create" className="btn btn-primary mb-2">
          Criar Cadastro
        </Link>
        <div className="table-responsive">
          <table className="table table-hover table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>cpf</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cadastros.map((cadastro) => (
                <tr key={cadastro.id_cadastro}>
                  <td>{cadastro.id_cadastro}</td>
                  <td>{cadastro.nome}</td>
                  <td>{cadastro.cpf}</td>
                  <td className="d-flex">
                    <Link
                      to={`/Cadastros-Update/${cadastro.id_cadastro}`}
                      className="btn btn-info"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCadastro(cadastro.id_cadastro)}
                      style={{ marginLeft: "10px" }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}