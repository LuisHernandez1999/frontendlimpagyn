"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Box, Typography, Card, Grid, CircularProgress } from "@mui/material"
import {
  LocalShipping as TruckIcon,
  Person as DriverIcon,
  Business as CooperativeIcon,
  Scale as WeightIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import pesagemService from "../../service/pesagemService"

const ViewPesagem = () => {
  const router = useRouter()
  const { id } = router.query
  const [pesagem, setPesagem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPesagem()
    }
  }, [id])

  const fetchPesagem = async () => {
    try {
      setLoading(true)
      const data = await pesagemService.getPesagemById(id)
      setPesagem(data)
    } catch (error) {
      console.error("Error fetching pesagem:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f4f8",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!pesagem) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f4f8",
        }}
      >
        <Typography variant="h6">Pesagem não encontrada</Typography>
      </Box>
    )
  }

  const infoStyle = {
    display: "flex",
    alignItems: "center",
    mb: 2,
    p: 2,
    borderRadius: "15px",
    border: "2px solid black",
    backgroundColor: "white",
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
          Detalhes da Pesagem
        </Typography>
        <Card sx={{ p: 4, borderRadius: "20px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <CalendarIcon sx={{ mr: 1, color: "#3f51b5" }} />
                <Typography variant="h6">Data: {pesagem.data}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <TruckIcon sx={{ mr: 1, color: "#f57c00" }} />
                <Typography variant="h6">Prefixo: {pesagem.prefixo}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <DriverIcon sx={{ mr: 1, color: "#4caf50" }} />
                <Typography variant="h6">Motorista: {pesagem.motorista}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <CooperativeIcon sx={{ mr: 1, color: "#9c27b0" }} />
                <Typography variant="h6">Cooperativa: {pesagem.cooperativa}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <Typography variant="h6">Tipo de Veículo: {pesagem.tipo_veiculo}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <Typography variant="h6">Volume de Carga: {pesagem.volume_carga}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <WeightIcon sx={{ mr: 1, color: "#e91e63" }} />
                <Typography variant="h6">Peso Calculado: {pesagem.peso_calculado} kg</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <Typography variant="h6">Hora de Chegada: {pesagem.hora_chegada}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={infoStyle}>
                <Typography variant="h6">Hora de Saída: {pesagem.hora_saida}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  )
}

export default ViewPesagem

