export const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }
  
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
  
      return data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };
  