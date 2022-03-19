import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CadastroService from "../../services/CadastroService";

export default function Create() {
  const [nome, setNome] = useState("");
  const [cpf, setcpf] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const criarOuEditarCadastro = (e) => {
    e.preventDefault();

    const cadastro = { nome, cpf};

    if (id) {
        CadastroService.updateCadastro(id, cadastro)
        .then((response) => {
            navigate("/Cadastros")
        })

    } else {
        CadastroService.createCadastro(cadastro)
        .then((response) => {
            navigate("/Cadastros")
        })
    }
  }

  useEffect(() => {
      function getCadastroById() {
        if (id) {
            CadastroService.getCadastroById(id)
            .then((response) => {
                setNome(response.data.nome);
                setcpf(response.data.cpf);
            })
            .catch((error) => {
                console.log(error);
            })
        }
      }
      getCadastroById()
  }, [id]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="mb-3">
            <label htmlFor="Nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              id="Nome"
              className="form-control"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">
              cpf
            </label>
            <input
              type="text"
              id="cpf"
              className="form-control"
              placeholder="cpf"
              value={cpf}
              onChange={(e) => setcpf(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={(e) => criarOuEditarCadastro(e)}>
            Enviar
          </button>
          <Link
            to="/Cadastros"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </Link>
        </fieldset>
      </form>
    </div>
  );
}