import axios from "axios"

const API_BASE_URL = "meu penis e grande" //// sua api aqui 
/////// nessa api o mais importante é a id da pesagen, já que ele exibe elas na tabela pela id delas 
const pesagemService = {
  /// aqui ele da o fetch nas pesagens mais recentes 
  getRecentPesagens: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pesagens/recent/`)
      return response.data
    } catch (error) {
      console.error("Error fetching recent pesagens:", error)
      throw error
    }
  },

  // usada no form pra pegar o registro, tlgd gay
  cadastrarPesagem: async (pesagemData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/pesagens/`, pesagemData)
      return response.data
    } catch (error) {
      console.error("Error creating pesagem:", error)
      throw error
    }
  },

  // pega a pesagem pelo o id 
  getPesagemById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pesagens/${id}/`)
      return response.data
    } catch (error) {
      console.error(`Error fetching pesagem with id ${id}:`, error)
      throw error
    }
  },

  //edita os dados da tabela de pesagens recentes
  updatePesagem: async (id, pesagemData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/pesagens/${id}/`, pesagemData)
      return response.data
    } catch (error) {
      console.error(`Error updating pesagem with id ${id}:`, error)
      throw error
    }
  },

  // deletaa pesagem
  deletePesagem: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/pesagens/${id}/`)
    } catch (error) {
      console.error(`Error deleting pesagem with id ${id}:`, error)
      throw error
    }
  },

  // calcula o peso pelo o volume e tipo de carga, nesse modelo de jason 
  calcularPeso: (tipoVeiculo, volumeCarga) => {
    const pesos = {
      Basculante: {
        baixo: 75,
        medio: 150,
        alto: 300,
      },
      Selectolix: {
        baixo: 512.5,
        medio: 1025,
        alto: 2050,
      },
      Baú: {
        baixo: 562.5,
        medio: 1125,
        alto: 2250,
      },
    }
    return pesos[tipoVeiculo]?.[volumeCarga] || 0
  },

  // aqui gay, ele pega o veiculo pelo prefixo
  getTipoVeiculo: (prefixo) => {
    const prefix = prefixo.substring(0, 2).toUpperCase()
    switch (prefix) {
      case "BC":
        return "Basculante"
      case "SL":
        return "Selectolix"
      case "BS":
        return "Baú"
      default:
        return ""
    }
  },

  // aqui peida porra, ele relaciona o veiculo com os volumes
  getVolumeInfo: (tipoVeiculo) => {
    const volumes = {
      Basculante: {
        alto: "6 M³",
        medio: "3 M³",
        baixo: "1,5 M³",
      },
      Selectolix: {
        alto: "12 M³",
        medio: "6 M³",
        baixo: "3 M³",
      },
      Baú: {
        alto: "45 M³",
        medio: "22,5 M³",
        baixo: "11,25 M³",
      },
    }
    return volumes[tipoVeiculo] || null
  },
}

export default pesagemService

