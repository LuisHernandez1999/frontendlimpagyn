import axios from "axios"

const API_URL = "http://localhost:3001/pesagens" // substitui aqui 
//// aqui ele pega a pesagem e seus dados pelo id dela 
const pesagemService = {
  getPesagemById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error("Erro ao buscar a pesagem:", error)
      throw error
    }
  },
}

export default pesagemService
