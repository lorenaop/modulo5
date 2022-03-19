import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CadastroService from "../../services/CadastroService";
import DestinoService from "../../services/DestinoService";
import PassagemService from "../../services/PassagemService";

export default function Create() {
  const [preco, setPreco] = useState(0.0);
  const [cadastro, setCadastro] = useState({ id_cadastro: "", nome: ""});
  const [destino, setDestino] = useState({ id: "", local: "" });
  const [cadastros, setCadastros] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAllDestinos = () => {
    DestinoService.getAllDestinos()
      .then((response) => {
        setDestinos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllDestinos();
  }, []);

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

  const criarOuEditarCadastro = (e) => {
    e.preventDefault();

    const passagem = { preco, cadastro, destino };
    console.log(passagem)
    if (id) {
      PassagemService.updatePassagem(id, passagem).then((response) => {
        navigate("/Passagens");
      });
    } else {
      PassagemService.createLivro(passagem).then((response) => {
        navigate("/Passagens");
      });
    }
  };

  useEffect(() => {
    function getPassagemById() {
      if (id) {
        PassagemService.getPassagemById(id)
          .then((response) => {
            setPreco(response.data.preco);
            setCadastro({
              id_cadastro: response.data.cadastro.id_cadastro,
              nome: response.data.cadastro.nome,
            });
            setDestino({
              id: response.data.destino.id,
              local: response.data.destino.local,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    getPassagemById();
  }, [id]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id ? "Editar" : "Criar"}</h2>
          </legend>
           <div className="form-group mb-3">
            <label htmlFor="Preco" className="form-label">
              Preço
            </label>
            <input
              type="text"
              id="Preco"
              className="form-control"
              placeholder="Preco"
              value={preco}
              onChange={(e) => setPreco(Number.parseFloat(e.target.value))}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="CadastroId_cadastro" className="form-label">
              Cadastro
            </label>
            <select
              id="CadastroId_cadastro"
              name="CadastroId_cadastro"
              className="form-select"
              onChange={(e) =>
                setCadastro({ id_cadastro: Number.parseInt(e.target.value) })
              }
            >
              <option value="DEFAULT" >{id ? cadastro.nome : 'Faça seu cadastro'}</option>
              {cadastros.map((cadastro) => (
                <option key={cadastro.id_cadastro} value={cadastro.id_cadastro}>
                  {cadastro.nome} {cadastro.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Destino" className="form-label">
            Destino
            </label>
            <select
              id="Destino"
              name="Destino"
              className="form-select"
              onChange={(e) =>
                setDestino({ id: Number.parseInt(e.target.value) })
              }
            >
              <option value="DEFAULT" >{id ? destino.local : 'Escolha seu destino'}</option>
              {destinos.map((destino) => (
                <option key={destino.id} value={destino.id}>
                  {destino.local}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => criarOuEditarCadastro(e)}
          >
            Enviar
          </button>
          <Link
            to="/Passagens"
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