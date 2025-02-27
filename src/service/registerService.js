export const registerUser = async (userData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); 
        console.error("Erro no registro:", errorMessage);
        throw new Error(errorMessage || "Erro desconhecido no servidor");
      }
  
      
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  };