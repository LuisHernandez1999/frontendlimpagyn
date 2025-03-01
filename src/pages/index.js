"use client";


import Head from "next/head"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
import { Box, Typography, Button, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { loginUser } from '../service/authService' 

const Login = () => {
  const [invalidEmail, setInvalidEmail] = useState("")
  const router = useRouter()
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório")
        .matches(
         
        ),
      password: Yup.string()
        .required("Senha é obrigatória")
        
    }),
    onSubmit: async (values) => {
      setInvalidEmail("")
      try {
        const data = await loginUser(values.email, values.password)  
        console.log("Login bem-sucedido:", data)

        alert("Login bem-sucedido!")
        router.push("/dashboard/tableandcardspage")
      } catch (error) {
        console.error("Erro no login:", error)
        formik.setErrors({ submit: "Erro ao fazer login. Tente novamente." })
        setInvalidEmail(values.email)
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })

  return (
    <>
      <Head>
        <title>Login</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a237e",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            padding: "2rem",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Bem vindo !
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "0.5rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: "bold",
              fontSize: "35px",
              color: "black",
            }}
          >
            Controle de Pesagem
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              marginBottom: "0.5rem",
              fontSize: "20px",
            }}
          >
            Entre com seu e-mail e senha
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <TextField
                label="E-mail"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  marginBottom: "1rem",
                  border: "2px solid black",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  marginBottom: "1rem",
                  border: "2px solid black",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "7px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#1E90FF",
                    },
                  },
                }}
                {...formik.getFieldProps("password")}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type="submit"
                sx={{
                  width: "70%",
                  padding: "0.5rem 1rem",
                  color: "white",
                  fontSize: "15px",
                  borderRadius: "50px",
                  marginBottom: "0.8rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "#1a237e",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                Entrar
              </Button>

              <Button
      onClick={() => router.push("/cadastro_user/cadastro_user_page")} // Altere "/cadastro" para a rota correta
      sx={{
        width: "40%",
        padding: "0.5rem 1rem",
        color: "black",
        fontSize: "15px",
        borderRadius: "50px",
        fontWeight: "bold",
        textTransform: "none",
        backgroundColor: "white",
        marginBottom: "0.5rem",
        border: "2px solid black",
        "&:hover": {
          backgroundColor: "black",
          color: "white",
        },
      }}
    >
      Cadastre-se
    </Button>
            </Box>
          </form>

          {formik.errors.submit && (
            <Typography
              color="error"
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              variant="body2"
            >
              {formik.errors.submit}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Login