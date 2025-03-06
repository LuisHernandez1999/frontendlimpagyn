import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/reset-password"; 


export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-reset-password/`, { email });
    return response.data;  
  } catch (error) {
    throw new Error("não foi possível enviar o email de redefinição.");
  }
};


export const verifyResetPasswordCode = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-reset-password/`, { email, code });
    return response.data;  
  } catch (error) {
    throw new Error("código inválido ou expirado.");
  }
};
