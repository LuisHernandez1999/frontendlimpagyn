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
  useMediaQuery,
  useTheme,
  Fade,
  Grow,
  CircularProgress,
} from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { Lock as LockIcon, Visibility, VisibilityOff } from "@mui/icons-material"
import { resetPassword } from "../service/reset_paswordService"

const greenColors = {
  lightGreen: "#8bc34a",
  paleGreen: "#dcedc8",
  mediumGreen: "#7cb342",
  darkGreen: "#689f38",
  textGreen: "#33691e",
  greenShadow: "rgba(139, 195, 74, 0.4)",
}

const CreateNewPassword = () => {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const email = searchParams.get("email")

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .matches(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra")
        .matches(/[0-9]/, "A senha deve conter pelo menos um número")
        .required("Senha é obrigatória"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "As senhas devem coincidir")
        .required("Confirmação de senha é obrigatória"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        await resetPassword(email, values.password)
     
        router.push("/login?resetSuccess=true")
      } catch (error) {
        console.error("Erro ao redefinir senha:", error)
        formik.setErrors({ submit: "Não foi possível redefinir a senha. Tente novamente." })
      } finally {
        setIsSubmitting(false)
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  })

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  if (!email) {
    return <Typography>Email não fornecido. Por favor, inicie o processo de redefinição de senha novamente.</Typography>
  }

  return (
    <>
      <Head>
        <title>Criar Nova Senha | Sistema de Controle de Pesagem</title>
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
                    <LockIcon sx={{ fontSize: 40, color: "white" }} />
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
                    Criar Nova Senha
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
                    Digite sua nova senha para a conta associada a {email}.
                  </Typography>
                </Fade>

                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                  <Fade in={animationComplete} timeout={1100}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Nova Senha"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: greenColors.mediumGreen }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
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
                      {...formik.getFieldProps("password")}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Fade>

                  <Fade in={animationComplete} timeout={1200}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirmar Nova Senha"
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: greenColors.mediumGreen }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
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
                      {...formik.getFieldProps("confirmPassword")}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Fade>

                  <Fade in={animationComplete} timeout={1300}>
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
                      {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Redefinir Senha"}
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

export default CreateNewPassword

