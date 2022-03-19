import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DestinoService from "../../services/DestinoService";

export default function Create() {
  const [local, setLocal] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const criarOuEditarDestino = (e) => {
    e.preventDefault();

    const destino = { local };

    if (id) {
        DestinoService.updateDestino(id, destino).then((response) => {
        navigate("/Destinos");
      });
    } else {
        DestinoService.createDestino(destino).then((response) => {
        navigate("/Destinos");
      });
    }
  };

  useEffect(() => {
    function getDestinoById() {
      if (id) {
        DestinoService.getDestinoById(id)
          .then((response) => {
            setLocal(response.data.local);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    getDestinoById();
  }, [id]);

  return (
    <div className="container py-3">
      <form>
        <fieldset>
          <legend>
            <h2 className="text-center">{id ? "Editar" : "Criar"}</h2>
          </legend>
          <div className="mb-3">
            <label htmlFor="Local" className="form-label">
              Local
            </label>
            <input
              type="text"
              id="Local"
              className="form-control"
              placeholder="Local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => criarOuEditarDestino(e)}
          >
            Enviar
          </button>
          <Link
            to="/Destinos"
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