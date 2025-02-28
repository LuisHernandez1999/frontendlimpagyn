"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material"
import { Save as SaveIcon, Delete as DeleteIcon } from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import pesagemService from "../../service/pesagemService"

const EditPesagem = () => {
  const router = useRouter()
  const { id } = router.query
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

  useEffect(() => {
    if (id) {
      fetchPesagem()
    }
  }, [id])

  const fetchPesagem = async () => {
    try {
      const data = await pesagemService.getPesagemById(id)
      setFormData(data)
    } catch (error) {
      console.error("Error fetching pesagem:", error)
      setSnackbar({
        open: true,
        message: "Erro ao carregar dados da pesagem",
        severity: "error",
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await pesagemService.updatePesagem(id, formData)
      setSnackbar({
        open: true,
        message: "Pesagem atualizada com sucesso!",
        severity: "success",
      })
    } catch (error) {
      console.error("Erro ao atualizar a pesagem:", error)
      setSnackbar({
        open: true,
        message: "Erro ao atualizar a pesagem",
        severity: "error",
      })
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta pesagem?")) {
      try {
        await pesagemService.deletePesagem(id)
        setSnackbar({
          open: true,
          message: "Pesagem excluída com sucesso!",
          severity: "success",
        })
        router.push("/pesagem-list")
      } catch (error) {
        console.error("Erro ao excluir a pesagem:", error)
        setSnackbar({
          open: true,
          message: "Erro ao excluir a pesagem",
          severity: "error",
        })
      }
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

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
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
        <Typography variant="h4" sx={{ mb: 4 }}>
          Editar Pesagem
        </Typography>
        <Card sx={{ p: 4, borderRadius: "20px", backgroundColor: "white" }}>
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
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={inputStyle}>
                  <InputLabel>Prefixo</InputLabel>
                  <Select name="prefixo" value={formData.prefixo} onChange={handleChange} required>
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
                  onChange={handleChange}
                  required
                  sx={inputStyle}
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
                  sx={inputStyle}
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
                  sx={inputStyle}
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
                  sx={inputStyle}
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
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1" gutterBottom>
                    Volume de Carga
                  </Typography>
                  <RadioGroup name="volume_carga" value={formData.volume_carga} onChange={handleChange}>
                    <FormControlLabel value="alto" control={<Radio />} label="Alto" />
                    <FormControlLabel value="medio" control={<Radio />} label="Médio" />
                    <FormControlLabel value="baixo" control={<Radio />} label="Baixo" />
                  </RadioGroup>
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
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" startIcon={<SaveIcon />} sx={{ mr: 2 }}>
                  Salvar Edição
                </Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                  Excluir Pesagem
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
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

export default EditPesagem
