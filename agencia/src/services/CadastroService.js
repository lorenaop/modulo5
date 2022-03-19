import axios from "axios";

const CADASTRO_API_URL = "http://localhost:8080/cadastros";

class CadastroService {
  getAllCadastros() {
    return axios.get(CADASTRO_API_URL);
  }

  createCadastro(cadastro) {
    return axios.post(CADASTRO_API_URL,cadastro);
  }

  getCadastroById(cadastroId) {
    return axios.get(CADASTRO_API_URL + "/" + cadastroId);
  }

  updateCadastro(cadastroId, cadastro) {
    return axios.put(CADASTRO_API_URL + "/" + cadastroId,cadastro);
  }

  deleteCadastro(cadastroId) {
    return axios.delete(CADASTRO_API_URL + "/" + cadastroId);
  }
}

export default new CadastroService();