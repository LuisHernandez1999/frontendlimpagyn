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
  CircularProgress,
  Fade,
  Grow,
  Slide,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { registerUser } from "../../service/registerService"
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registrationError, setRegistrationError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isMedium = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

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
      password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "As senhas devem coincidir")
        .required("Confirmação de senha é obrigatória"),
    }),
    onSubmit: async (values) => {
      setRegistrationError("")
      setIsSubmitting(true)
      try {
        const response = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        })
        console.log("Registro bem-sucedido:", response)

        
        setTimeout(() => {
          router.push("/login")
        }, 1500)
      } catch (error) {
        console.error("Erro no registro:", error)
        setRegistrationError("Erro ao fazer registro. Tente novamente.")
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

  
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: "#e0e0e0" }
    if (password.length < 6) return { strength: 25, color: "#f44336" } 
    if (password.length < 8) return { strength: 50, color: "#9c27b0" }
    if (password.length < 10) return { strength: 75, color: "#7b1fa2" } 
    return { strength: 100, color: "#4a148c" } 
  }

  const passwordStrength = getPasswordStrength(formik.values.password)

  return (
    <>
      <Head>
        <title>Cadastro | Sistema de Controle de Pesagem</title>
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
                    <PersonIcon sx={{ fontSize: 40, color: "white" }} />
                  </Box>
                </Fade>

                <Slide direction="down" in={animationComplete} timeout={600}>
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
                    Crie sua conta
                  </Typography>
                </Slide>

                <Slide direction="down" in={animationComplete} timeout={700}>
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
                    Registre-se no Sistema de Controle de Pesagem de coletas da LimpaGyn
                  </Typography>
                </Slide>

                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                  <Fade in={animationComplete} timeout={800}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Nome completo"
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: purpleColors.mediumPurple }} />
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
                      {...formik.getFieldProps("name")}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Fade>

                  <Fade in={animationComplete} timeout={900}>
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

                  <Fade in={animationComplete} timeout={1000}>
                    <Box sx={{ width: "100%" }}>
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
                          mb: 0.5,
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

                   
                      {formik.values.password && (
                        <Box sx={{ mt: 0.5, mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Box
                              sx={{
                                height: "4px",
                                width: "100%",
                                bgcolor: "#e0e0e0",
                                borderRadius: "2px",
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  height: "100%",
                                  width: `${passwordStrength.strength}%`,
                                  bgcolor: passwordStrength.color,
                                  transition: "width 0.3s ease, background-color 0.3s ease",
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: passwordStrength.color,
                              fontFamily: "'Poppins', sans-serif",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {passwordStrength.strength <= 25 && "Senha fraca"}
                            {passwordStrength.strength > 25 && passwordStrength.strength <= 50 && "Senha média"}
                            {passwordStrength.strength > 50 && passwordStrength.strength <= 75 && "Senha boa"}
                            {passwordStrength.strength > 75 && "Senha forte"}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Fade>

                  <Fade in={animationComplete} timeout={1100}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirmar senha"
                      type={showConfirmPassword ? "text" : "password"}
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
                              aria-label="toggle confirm password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                              edge="end"
                              sx={{ color: purpleColors.mediumPurple }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 3.5,
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
                      {...formik.getFieldProps("confirmPassword")}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Fade>

                  <Fade in={animationComplete} timeout={1200}>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
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
                      {isSubmitting ? (
                        <>
                          <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                          Processando...
                        </>
                      ) : (
                        "Criar conta"
                      )}
                    </Button>
                  </Fade>

                  {registrationError && (
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
                        {registrationError}
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

                  <Fade in={animationComplete} timeout={1300}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6a6a6a",
                          mb: 1.5,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Já tem uma conta?
                      </Typography>
                      <Button
                       onClick={() => router.push("/")}
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
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
                        Voltar para login
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
                  © {new Date().getFullYear()} Sistema de Controle de Pesagem. Todos os direitos reservados.
                </Typography>
              </Box>
            </Paper>
          </Grow>
        </Container>
      </Box>
    </>
  )
}

export default Register

