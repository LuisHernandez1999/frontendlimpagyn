"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Fade,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material"
import {
  Save as SaveIcon,
  LocalShipping as TruckIcon,
  Person as DriverIcon,
  Scale as WeightIcon,
  CalendarToday as CalendarIcon,
  Business as CooperativeIcon,
} from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import { keyframes } from "@emotion/react"
import pesagemService from "../../service/pesagemService" 

const VolumeInfo = ({ tipoVeiculo }) => {
  const volumes = {
    Basculante: {
      alto: "6 M³",
      medio: "3 M³",
      baixo: "1,5 M³",
    },
    Selectolix: {
      alto: "12 M³",
      medio: "6 M³",
      baixo: "3 M³",
    },
    Baú: {
      alto: "45 M³",
      medio: "22,5 M³",
      baixo: "11,25 M³",
    },
  }

  if (!tipoVeiculo || !volumes[tipoVeiculo]) return null

  return (
    <Typography variant="caption" sx={{ mt: 1, display: "block", color: "text.secondary" }}>
      Volume: {volumes[tipoVeiculo].baixo} (Baixo) / {volumes[tipoVeiculo].medio} (Médio) / {volumes[tipoVeiculo].alto}{" "}
      (Alto)
    </Typography>
  )
}

const PesagemForm = () => {
  const [formData, setFormData] = useState({
    data: "",
    prefixo: "",
    veiculo: "",
    motorista: "",
    cooperativa: "", 
    hora_chegada: "",
    hora_saida: "",
    volume_carga: "",
    peso_calculado: "",
  })

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const [recentPesagens, setRecentPesagens] = useState([])

  useEffect(() => {
    fetchRecentPesagens()
  }, [])

  useEffect(() => {
    if (formData.prefixo) {
      const tipoVeiculo = pesagemService.getTipoVeiculo(formData.prefixo)
      setFormData((prev) => ({ ...prev, veiculo: tipoVeiculo }))
    }
  }, [formData.prefixo])

  useEffect(() => {
    if (formData.prefixo && formData.volume_carga) {
      const tipoVeiculo = pesagemService.getTipoVeiculo(formData.prefixo)
      const pesoCalculado = pesagemService.calcularPeso(tipoVeiculo, formData.volume_carga)
      setFormData((prev) => ({ ...prev, peso_calculado: pesoCalculado }))
    }
  }, [formData.prefixo, formData.volume_carga])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataFormatada = new Date(formData.data).toISOString()

    const dadosFormatados = {
      ...formData,
      data: dataFormatada,
      peso_calculado: Number.parseFloat(formData.peso_calculado),
    }

    console.log("Enviando dados:", dadosFormatados)

    try {
      await pesagemService.cadastrarPesagem(dadosFormatados)
      setSnackbar({
        open: true,
        message: "Pesagem registrada com sucesso!",
        severity: "success",
      })
      setFormData({
        data: "",
        prefixo: "",
        veiculo: "",
        motorista: "",
        cooperativa: "", 
        hora_chegada: "",
        hora_saida: "",
        volume_carga: "",
        peso_calculado: "",
      })
      fetchRecentPesagens() 
    } catch (error) {
      console.error("Erro ao registrar a pesagem:", error.response?.data || error.message)
      setSnackbar({
        open: true,
        message: "Erro ao registrar a pesagem!",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        borderRadius: "15px",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  }

  const fetchRecentPesagens = async () => {
    try {
      const data = await pesagemService.getRecentPesagens()
      setRecentPesagens(data)
    } catch (error) {
      console.error("Erro ao buscar pesagens recentes:", error)
    }
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f4f8", }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "280px",
          width: "calc(100% - 280px)",
        }}
      >
        <Fade in={true} timeout={1000}>
          <Typography
            variant="h2"
            sx={{
              mb: 16,
              fontWeight: "bold",
              color: "#2c3e50",
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              animation: `${fadeIn} 1s ease-out`,
            }}
          >
            Registrar Nova Pesagem
          </Typography>
        </Fade>

        <Fade in={true} timeout={1500}>
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                transform: "translateY(-5px)",
              },
              mb: 4,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data"
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ ...inputStyle, mb: 2 }}>
                    <InputLabel id="prefixo-label">Prefixo</InputLabel>
                    <Select
                      labelId="prefixo-label"
                      name="prefixo"
                      value={formData.prefixo}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">Selecione</MenuItem>
                      <MenuItem value="BC">BC</MenuItem>
                      <MenuItem value="SL">SL</MenuItem>
                      <MenuItem value="BS">BS</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Veículo"
                    name="veiculo"
                    value={formData.veiculo}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Motorista"
                    name="motorista"
                    value={formData.motorista}
                    onChange={handleChange}
                    required
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cooperativa"
                    name="cooperativa"
                    value={formData.cooperativa}
                    onChange={handleChange}
                    required
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hora de Chegada"
                    type="time"
                    name="hora_chegada"
                    value={formData.hora_chegada}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hora de Saída"
                    type="time"
                    name="hora_saida"
                    value={formData.hora_saida}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Volume de Carga
                    </Typography>
                    <RadioGroup
                      name="volume_carga"
                      value={formData.volume_carga}
                      onChange={handleChange}
                      sx={{
                        "& .MuiFormControlLabel-root": {
                          marginBottom: 1,
                        },
                      }}
                    >
                      <FormControlLabel
                        value="alto"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography>Alto</Typography>
                            {formData.veiculo && (
                              <Typography variant="caption" color="text.secondary">
                                {formData.veiculo === "Basculante" && "6 M³ - 300 TON"}
                                {formData.veiculo === "Selectolix" && "12 M³ - 2.050 TON"}
                                {formData.veiculo === "Baú" && "45 M³ - 2.250 TON"}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="medio"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography>Médio</Typography>
                            {formData.veiculo && (
                              <Typography variant="caption" color="text.secondary">
                                {formData.veiculo === "Basculante" && "3 M³ - 150 TON"}
                                {formData.veiculo === "Selectolix" && "6 M³ - 1.025 TON"}
                                {formData.veiculo === "Baú" && "22,5 M³ - 1.125 TON"}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="baixo"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography>Baixo</Typography>
                            {formData.veiculo && (
                              <Typography variant="caption" color="text.secondary">
                                {formData.veiculo === "Basculante" && "1,5 M³ - 75 TON"}
                                {formData.veiculo === "Selectolix" && "3 M³ - 512,5 TON"}
                                {formData.veiculo === "Baú" && "11,25 M³ - 562,5 TON"}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </RadioGroup>
                    <VolumeInfo tipoVeiculo={formData.veiculo} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Peso Calculado"
                    name="peso_calculado"
                    value={formData.peso_calculado}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ ...inputStyle, mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      mt: 2,
                      bgcolor: "#3f51b5",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#303f9f",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    Salvar Pesagem
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Fade>

        <Fade in={true} timeout={2000}>
          <Card
            sx={{
              p: 4,
              borderRadius: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                transform: "translateY(-5px)",
              },
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#2c3e50" }}>
              Pesagens Recentes
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <Table sx={{ minWidth: 650 }} aria-label="tabela de pesagens recentes">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#3f51b5" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Data</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Prefixo</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Motorista</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cooperativa</TableCell>{" "}
                    {/* Added Cooperative column */}
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Veículo</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Volume de Carga</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>Peso Calculado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentPesagens.map((pesagem, index) => (
                    <TableRow
                      key={pesagem.id}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "#e3f2fd" },
                        transition: "background-color 0.3s",
                      }}
                    >
                      <TableCell>
                        <Tooltip title={new Date(pesagem.data).toLocaleString()}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarIcon sx={{ mr: 1, color: "#3f51b5" }} />
                            {new Date(pesagem.data).toLocaleDateString()}
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<TruckIcon />}
                          label={pesagem.prefixo}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <DriverIcon sx={{ mr: 1, color: "#4caf50" }} />
                          {pesagem.motorista}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CooperativeIcon sx={{ mr: 1, color: "#9c27b0" }} />
                          {pesagem.cooperativa}
                        </Box>
                      </TableCell>{" "}
                      {/* Added Cooperative cell */}
                      <TableCell>{pesagem.veiculo}</TableCell>
                      <TableCell>
                        <Chip label={pesagem.volume_carga} color="secondary" size="small" sx={{ fontWeight: "bold" }} />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <WeightIcon sx={{ mr: 1, color: "#f57c00" }} />
                          {pesagem.peso_calculado} TON
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Fade>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export default PesagemForm

