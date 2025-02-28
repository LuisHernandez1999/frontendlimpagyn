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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!pesagem) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">Pesagem não encontrada</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
        <Card sx={{ p: 4, borderRadius: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarIcon sx={{ mr: 1, color: "#3f51b5" }} />
                <Typography variant="h6">Data: {pesagem.data}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TruckIcon sx={{ mr: 1, color: "#f57c00" }} />
                <Typography variant="h6">Prefixo: {pesagem.prefixo}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DriverIcon sx={{ mr: 1, color: "#4caf50" }} />
                <Typography variant="h6">Motorista: {pesagem.motorista}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CooperativeIcon sx={{ mr: 1, color: "#9c27b0" }} />
                <Typography variant="h6">Cooperativa: {pesagem.cooperativa}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Tipo de Veículo: {pesagem.tipo_veiculo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Volume de Carga: {pesagem.volume_carga}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <WeightIcon sx={{ mr: 1, color: "#e91e63" }} />
                <Typography variant="h6">Peso Calculado: {pesagem.peso_calculado} kg</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Hora de Chegada: {pesagem.hora_chegada}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Hora de Saída: {pesagem.hora_saida}</Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  )
}

export default ViewPesagem

