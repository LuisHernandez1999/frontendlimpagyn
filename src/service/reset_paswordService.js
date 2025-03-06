import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/reset-password";


export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-reset-password/`, { email });
    return response.data;  
  } catch (error) {
    throw new Error("Não foi possível enviar o email de redefinição.");
  }
};

export const verifyResetPasswordCode = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-reset-password/`, { email, code });
    return response.data;  
  } catch (error) {
    throw new Error("Código inválido ou expirado.");
  }
};

export const resetPassword = async (email, code, newPassword) => {
  try {

    const verifyResponse = await verifyResetPasswordCode(email, code);
    
    if (verifyResponse.message === 'Código verificado com sucesso!') {
     
      const resetResponse = await axios.post(`${BASE_URL}/reset-password/`, { email, newPassword });
      return resetResponse.data; 
    }

    throw new Error("Código de verificação inválido.");
  } catch (error) {
    throw new Error("Erro ao redefinir a senha: " + error.message);
  }
};
