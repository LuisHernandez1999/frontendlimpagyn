"use client";


import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { registerUser } from "../../service/registerService";

const Register = () => {
  const [registrationError, setRegistrationError] = useState("");
  const router = useRouter();

 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nome é obrigatório"),
      email: Yup.string().email("Email inválido").required("Email é obrigatório"),
      password: Yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("Senha é obrigatória"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "As senhas devem coincidir")
        .required("Confirmação de senha é obrigatória"),
    }),
    onSubmit: async (values) => {
      setRegistrationError("");
      try {
        // Envia os dados para o backend no formato correto
        const response = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        console.log("Registro bem-sucedido:", response);
        alert("Registro bem-sucedido!");
        router.push("/index");
      } catch (error) {
        console.error("Erro no registro:", error);
        setRegistrationError("Erro ao fazer registro. Tente novamente.");
      }
    },
  });

  return (
    <>
      <Head>
        <title>Registro</title>
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
            Bem vindo!
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
            Crie sua conta
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
                label="Nome"
                type="text"
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
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

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

              <TextField
                label="Confirmar Senha"
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
                {...formik.getFieldProps("confirmPassword")}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                Registrar
              </Button>

              <Button
                onClick={() => router.push("/login")}
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
                Voltar
              </Button>
            </Box>
          </form>

          {registrationError && (
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
              {registrationError}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Register;