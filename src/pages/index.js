
"use client"

import Head from "next/head"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { loginUser } from "../service/authService"
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"


const purpleColors = {
  darkPurple: "#4a148c", 
  mediumPurple: "#7b1fa2", 
  lightPurple: "#9c27b0", 
  lighterPurple: "#ba68c8", 
  paleViolet: "#e1bee7", 
  deepPurple: "#311b92",
  textPurple: "#4a148c", 
  purpleShadow: "rgba(74, 20, 140, 0.4)", 
}

const Login = () => {
  const [invalidEmail, setInvalidEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Email é obrigatório"),
      password: Yup.string().required("Senha é obrigatória").min(6, "A senha deve ter pelo menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      setInvalidEmail("")
      try {
        const data = await loginUser(values.email, values.password)
        console.log("Login bem-sucedido:", data)
        router.push("/dashboard/tableandcardspage")
      } catch (error) {
        console.error("Erro no login:", error)
        formik.setErrors({ submit: "Credenciais inválidas. Por favor, verifique seu email e senha." })
        setInvalidEmail(values.email)
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Head>
        <title>Login | Sistema de Controle de Pesagem</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          background: `linear-gradient(135deg, ${purpleColors.deepPurple} 0%, ${purpleColors.lightPurple} 100%)`,
          position: "relative",
          overflow: "hidden",
          padding: { xs: "1rem", sm: "2rem" },
        }}
      >

        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.03)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              "@keyframes float": {
                "0%": { transform: "translate(0, 0) rotate(0deg)" },
                "50%": {
                  transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 30}deg)`,
                },
                "100%": { transform: "translate(0, 0) rotate(0deg)" },
              },
            }}
          />
        ))}

        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            py: { xs: 2, sm: 4 },
          }}
        >
          <Grow in={true} timeout={800}>
            <Paper
              elevation={24}
              sx={{
                width: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: `0 10px 40px ${purpleColors.purpleShadow}`,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: `0 15px 50px ${purpleColors.purpleShadow}`,
                },
              }}
            >
              <Box
                sx={{
                  padding: isMobile ? "1.5rem 1.5rem" : "2.5rem 3rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Fade in={animationComplete} timeout={800}>
                  <Box
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "24px",
                      background: `linear-gradient(135deg, ${purpleColors.darkPurple} 0%, ${purpleColors.lightPurple} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: `0 8px 25px ${purpleColors.purpleShadow}`,
                      transform: "rotate(10deg)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "rotate(0deg) scale(1.05)",
                      },
                    }}
                  >
                    <LockIcon sx={{ fontSize: 40, color: "white" }} />
                  </Box>
                </Fade>

                <Fade in={animationComplete} timeout={900}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      color: purpleColors.darkPurple,
                      marginBottom: "0.5rem",
                      textAlign: "center",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Bem-vindo
                  </Typography>
                </Fade>

                <Fade in={animationComplete} timeout={1000}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "#6a6a6a",
                      marginBottom: "1.5rem",
                      textAlign: "center",
                      maxWidth: "80%",
                    }}
                  >
                    Acesse o Sistema de Controle de Pesagem
                  </Typography>
                </Fade>

                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                  <Fade in={animationComplete} timeout={1100}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: purpleColors.mediumPurple }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 2.5,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          "&.Mui-focused fieldset": {
                            borderColor: purpleColors.mediumPurple,
                            borderWidth: "2px",
                          },
                          "& fieldset": {
                            transition: "all 0.2s ease",
                          },
                          "&:hover fieldset": {
                            borderColor: purpleColors.lighterPurple,
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: purpleColors.mediumPurple,
                        },
                        "& .MuiInputBase-input": {
                          padding: "14px 14px 14px 0",
                        },
                      }}
                      {...formik.getFieldProps("email")}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Fade>

                  <Fade in={animationComplete} timeout={1200}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: purpleColors.mediumPurple }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                              sx={{ color: purpleColors.mediumPurple }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 2.5,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          "&.Mui-focused fieldset": {
                            borderColor: purpleColors.mediumPurple,
                            borderWidth: "2px",
                          },
                          "& fieldset": {
                            transition: "all 0.2s ease",
                          },
                          "&:hover fieldset": {
                            borderColor: purpleColors.lighterPurple,
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: purpleColors.mediumPurple,
                        },
                        "& .MuiInputBase-input": {
                          padding: "14px 14px 14px 0",
                        },
                      }}
                      {...formik.getFieldProps("password")}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Fade>

                  <Fade in={animationComplete} timeout={1300}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                      
                    </Box>
                  </Fade>

                  <Fade in={animationComplete} timeout={1400}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 1,
                        mb: 3,
                        py: 1.5,
                        borderRadius: "16px",
                        background: `linear-gradient(90deg, ${purpleColors.darkPurple} 0%, ${purpleColors.lightPurple} 100%)`,
                        color: "white",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                        textTransform: "none",
                        boxShadow: `0 8px 25px ${purpleColors.purpleShadow}`,
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                          transition: "all 0.5s ease",
                        },
                        "&:hover": {
                          background: `linear-gradient(90deg, ${purpleColors.deepPurple} 0%, ${purpleColors.mediumPurple} 100%)`,
                          boxShadow: `0 10px 30px ${purpleColors.purpleShadow}`,
                          transform: "translateY(-2px)",
                          "&::before": {
                            left: "100%",
                          },
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                      }}
                    >
                      Entrar <ArrowForwardIcon sx={{ ml: 1 }} />
                    </Button>
                  </Fade>

                  {formik.errors.submit && (
                    <Fade in={true} timeout={500}>
                      <Typography
                        color="error"
                        variant="body2"
                        sx={{
                          textAlign: "center",
                          mb: 2,
                          fontFamily: "'Poppins', sans-serif",
                          padding: "10px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                        }}
                      >
                        {formik.errors.submit}
                      </Typography>
                    </Fade>
                  )}

                  <Divider sx={{ my: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#78909c",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      ou
                    </Typography>
                  </Divider>

                  <Fade in={animationComplete} timeout={1500}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6a6a6a",
                          mb: 1.5,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Não tem uma conta?
                      </Typography>
                      <Button
                        onClick={() => router.push("/cadastro_user/cadastro_user_page")}
                        variant="outlined"
                        sx={{
                          borderRadius: "16px",
                          borderColor: purpleColors.mediumPurple,
                          borderWidth: "2px",
                          color: purpleColors.mediumPurple,
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          textTransform: "none",
                          px: 4,
                          py: 1,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: purpleColors.lightPurple,
                            backgroundColor: `rgba(156, 39, 176, 0.05)`,
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Cadastre-se
                      </Button>
                    </Box>
                  </Fade>
                </form>
              </Box>

              <Box
                sx={{
                  bgcolor: "rgba(236, 239, 241, 0.7)",
                  py: 2,
                  textAlign: "center",
                  borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6a6a6a",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  © {new Date().getFullYear()} LimpaGyn. Todos os direitos reservados.
                </Typography>
              </Box>
            </Paper>
          </Grow>
        </Container>
      </Box>
    </>
  )
}

export default Login

