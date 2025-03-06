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
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
  CircularProgress,
} from "@mui/material"
import { useRouter } from "next/navigation"
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  LockReset as LockResetIcon,
} from "@mui/icons-material"
import { sendResetPasswordEmail, verifyResetPasswordCode } from "../../service/reset_paswordService"

const greenColors = {
  lightGreen: "#8bc34a",
  paleGreen: "#dcedc8",
  mediumGreen: "#7cb342",
  darkGreen: "#689f38",
  textGreen: "#33691e",
  greenShadow: "rgba(139, 195, 74, 0.4)",
}

const ResetPassword = () => {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        const response = await sendResetPasswordEmail(values.email)
        console.log(response)
        setCodeSent(true)
      } catch (error) {
        console.error("Erro ao enviar email:", error)
        emailFormik.setErrors({
          submit: error.message || "Não foi possível enviar o email. Tente novamente mais tarde.",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })

  const codeFormik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().length(6, "O código deve ter 6 dígitos").required("Código é obrigatório"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        const response = await verifyResetPasswordCode(emailFormik.values.email, values.code)
        console.log(response)
        // Aqui você pode redirecionar para uma página de definição de nova senha
        // ou mostrar um formulário para definir a nova senha
        router.push("/new-password")
      } catch (error) {
        console.error("Erro ao verificar código:", error)
        codeFormik.setErrors({ submit: error.message || "Código inválido. Tente novamente." })
      } finally {
        setIsSubmitting(false)
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })

  return (
    <>
      <Head>
        <title>Redefinir Senha | Sistema de Controle de Pesagem</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          background: `linear-gradient(135deg, ${greenColors.paleGreen} 0%, ${greenColors.lightGreen} 100%)`,
          position: "relative",
          overflow: "hidden",
          padding: { xs: "1rem", sm: "2rem" },
        }}
      >
        {/* Background bubbles */}
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
                boxShadow: `0 10px 40px ${greenColors.greenShadow}`,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: `0 15px 50px ${greenColors.greenShadow}`,
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
                      background: `linear-gradient(135deg, ${greenColors.mediumGreen} 0%, ${greenColors.lightGreen} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: `0 8px 25px ${greenColors.greenShadow}`,
                      transform: "rotate(10deg)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "rotate(0deg) scale(1.05)",
                      },
                    }}
                  >
                    {codeSent ? (
                      <LockResetIcon sx={{ fontSize: 40, color: "white" }} />
                    ) : (
                      <EmailIcon sx={{ fontSize: 40, color: "white" }} />
                    )}
                  </Box>
                </Fade>

                <Fade in={animationComplete} timeout={900}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      color: greenColors.textGreen,
                      marginBottom: "0.5rem",
                      textAlign: "center",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Redefinir Senha
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
                      maxWidth: "90%",
                    }}
                  >
                    {codeSent
                      ? "Digite o código de 6 dígitos enviado para o seu email."
                      : "Informe seu email para receber o código de redefinição de senha."}
                  </Typography>
                </Fade>

                {!codeSent ? (
                  <form onSubmit={emailFormik.handleSubmit} style={{ width: "100%" }}>
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
                              <EmailIcon sx={{ color: greenColors.mediumGreen }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "16px",
                            "&.Mui-focused fieldset": {
                              borderColor: greenColors.mediumGreen,
                              borderWidth: "2px",
                            },
                            "& fieldset": {
                              transition: "all 0.2s ease",
                            },
                            "&:hover fieldset": {
                              borderColor: greenColors.lightGreen,
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: greenColors.mediumGreen,
                          },
                          "& .MuiInputBase-input": {
                            padding: "14px 14px 14px 0",
                          },
                        }}
                        {...emailFormik.getFieldProps("email")}
                        error={emailFormik.touched.email && Boolean(emailFormik.errors.email)}
                        helperText={emailFormik.touched.email && emailFormik.errors.email}
                      />
                    </Fade>

                    <Fade in={animationComplete} timeout={1400}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          mt: 1,
                          mb: 3,
                          py: 1.5,
                          borderRadius: "16px",
                          background: `linear-gradient(90deg, ${greenColors.mediumGreen} 0%, ${greenColors.lightGreen} 100%)`,
                          color: "white",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: "1rem",
                          textTransform: "none",
                          boxShadow: `0 8px 25px ${greenColors.greenShadow}`,
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
                            background: `linear-gradient(90deg, ${greenColors.darkGreen} 0%, ${greenColors.mediumGreen} 100%)`,
                            boxShadow: `0 10px 30px ${greenColors.greenShadow}`,
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
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <>
                            Enviar Código <SendIcon sx={{ ml: 1 }} />
                          </>
                        )}
                      </Button>
                    </Fade>

                    {emailFormik.errors.submit && (
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
                          {emailFormik.errors.submit}
                        </Typography>
                      </Fade>
                    )}
                  </form>
                ) : (
                  <form onSubmit={codeFormik.handleSubmit} style={{ width: "100%" }}>
                    <Fade in={true} timeout={800}>
                      <TextField
                        fullWidth
                        id="code"
                        name="code"
                        label="Código de 6 dígitos"
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockResetIcon sx={{ color: greenColors.mediumGreen }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 3,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "16px",
                            "&.Mui-focused fieldset": {
                              borderColor: greenColors.mediumGreen,
                              borderWidth: "2px",
                            },
                            "& fieldset": {
                              transition: "all 0.2s ease",
                            },
                            "&:hover fieldset": {
                              borderColor: greenColors.lightGreen,
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: greenColors.mediumGreen,
                          },
                          "& .MuiInputBase-input": {
                            padding: "14px 14px 14px 0",
                            letterSpacing: "0.5em",
                            textAlign: "center",
                          },
                        }}
                        inputProps={{
                          maxLength: 6,
                        }}
                        {...codeFormik.getFieldProps("code")}
                        error={codeFormik.touched.code && Boolean(codeFormik.errors.code)}
                        helperText={codeFormik.touched.code && codeFormik.errors.code}
                      />
                    </Fade>

                    <Fade in={true} timeout={1000}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          mt: 1,
                          mb: 3,
                          py: 1.5,
                          borderRadius: "16px",
                          background: `linear-gradient(90deg, ${greenColors.mediumGreen} 0%, ${greenColors.lightGreen} 100%)`,
                          color: "white",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: "1rem",
                          textTransform: "none",
                          boxShadow: `0 8px 25px ${greenColors.greenShadow}`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: `linear-gradient(90deg, ${greenColors.darkGreen} 0%, ${greenColors.mediumGreen} 100%)`,
                            boxShadow: `0 10px 30px ${greenColors.greenShadow}`,
                            transform: "translateY(-2px)",
                          },
                          "&:active": {
                            transform: "translateY(0)",
                          },
                        }}
                      >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Verificar Código"}
                      </Button>
                    </Fade>

                    {codeFormik.errors.submit && (
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
                          {codeFormik.errors.submit}
                        </Typography>
                      </Fade>
                    )}
                  </form>
                )}

                <Fade in={animationComplete} timeout={1500}>
                  <Button
                    onClick={() => router.push("/")}
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      color: greenColors.mediumGreen,
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      textTransform: "none",
                      mt: 2,
                      "&:hover": {
                        backgroundColor: `rgba(139, 195, 74, 0.1)`,
                      },
                    }}
                  >
                    Voltar para o login
                  </Button>
                </Fade>
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

export default ResetPassword

