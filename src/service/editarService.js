import axios from "axios"

const API_URL = "" // substitui aqui peida porra pela sua api 

//// aqui viado, ela puxa os  dados da pesagem que tu clicou na tabela, pelo id da pesagem btfe 
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

  updatePesagem: async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData)
      return response.data
    } catch (error) {
      console.error("Erro ao atualizar a pesagem:", error)
      throw error
    }
  },

  deletePesagem: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
    } catch (error) {
      console.error("Erro ao excluir a pesagem:", error)
      throw error
    }
  },
}

export default pesagemService
