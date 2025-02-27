"use client";

import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  Grid,
  InputAdornment,
  IconButton,
  useTheme,
  Fade,
  Chip,
  Tooltip,
} from "@mui/material"
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  LocalShipping as TruckIcon,
  Person as DriverIcon,
  Business as CooperativeIcon,
  Scale as WeightIcon,
  Group as GroupIcon,
  LocalShipping as VehicleIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import { keyframes } from "@emotion/react"

const PesagemList = () => {
  const theme = useTheme()
  const [pesagens, setPesagens] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPesagens: 0,
    totalPeso: 0,
    uniqueMotoristas: 0,
    uniqueVeiculos: 0,
  })
 

 
  const fetchPesagens = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/pesagens/")
      setPesagens(response.data)
      calculateStats(response.data)
    } catch (error) {
      console.error("Erro ao buscar pesagens:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const calculateStats = (data) => {
    const totalPesagens = data.length
    const totalPeso = data.reduce((sum, pesagem) => sum + pesagem.peso_calculado, 0)
    const uniqueMotoristas = new Set(data.map((pesagem) => pesagem.motorista)).size
    const uniqueVeiculos = new Set(data.map((pesagem) => pesagem.prefixo)).size

    setStats({
      totalPesagens,
      totalPeso,
      uniqueMotoristas,
      uniqueVeiculos,
    })
  }

  useEffect(() => {
    fetchPesagens()
  }, [fetchPesagens])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredPesagens = pesagens.filter((pesagem) =>
    Object.values(pesagem).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
        backgroundColor: color,
      }}
    >
      {React.createElement(icon, { sx: { fontSize: 40, color: "white", mb: 2 } })}
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", mb: 1 }}>
        {value}
      </Typography>
      <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
        {title}
      </Typography>
    </Card>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", margin: 0, padding: 0, overflow: "hidden" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: 0, sm: "290px" },
          width: "100%",
          height: "auto",
          paddingTop: "3rem",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            fontWeight: "bold",
            color: "#2c3e50",
            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          Dashboard de Pesagens
        </Typography>

        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 4, px: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Total de Pesagens" value={stats.totalPesagens} icon={AssessmentIcon} color="#3f51b5" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Peso Total (kg)"
                  value={stats.totalPeso.toLocaleString()}
                  icon={WeightIcon}
                  color="#f57c00"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Motoristas Únicos" value={stats.uniqueMotoristas} icon={GroupIcon} color="#43a047" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard title="Veículos Únicos" value={stats.uniqueVeiculos} icon={VehicleIcon} color="#e53935" />
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Fade in={true} timeout={1000}>
          <Card
            sx={{
              p: 3,
              mx: 2,
              bgcolor: theme.palette.background.paper,
              borderRadius: "16px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <TextField
                label="Pesquisar"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 0 0 2px #3498db",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 2px #3498db",
                    },
                  },
                }}
              />
              <Tooltip title="Atualizar dados">
                <IconButton
                  onClick={fetchPesagens}
                  color="primary"
                  sx={{ backgroundColor: "#e3f2fd", "&:hover": { backgroundColor: "#bbdefb" } }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Data</TableCell>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>
                      Prefixo
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>
                      Motorista
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>
                      Cooperativa
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>
                      Tipo Veículo
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>
                      Volume Carga
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>
                      Peso Calculado
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="h6" sx={{ fontStyle: "italic", color: "#757575" }}>
                          Carregando...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredPesagens.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="h6" sx={{ fontStyle: "italic", color: "#757575" }}>
                          Nenhuma pesagem encontrada.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPesagens
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((pesagem, index) => (
                        <TableRow
                          key={pesagem.id}
                          sx={{
                            "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                              transform: "scale(1.01)",
                            },
                            animation: `${fadeIn} 0.5s ease-out ${index * 0.05}s both`,
                          }}
                        >
                          <TableCell>{pesagem.data}</TableCell>
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
                            <Tooltip title={`Motorista: ${pesagem.motorista}`}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <DriverIcon sx={{ mr: 1, color: "#1976d2" }} />
                                <Typography>{pesagem.motorista}</Typography>
                              </Box>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title={`Cooperativa: ${pesagem.cooperativa}`}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <CooperativeIcon sx={{ mr: 1, color: "#388e3c" }} />
                                <Typography>{pesagem.cooperativa}</Typography>
                              </Box>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{pesagem.tipo_veiculo}</TableCell>
                          <TableCell>{pesagem.volume_carga}</TableCell>
                          <TableCell>
                            <Tooltip title={`Peso Calculado: ${pesagem.peso_calculado} kg`}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <WeightIcon sx={{ mr: 1, color: "#f57c00" }} />
                                <Typography>{pesagem.peso_calculado} kg</Typography>
                              </Box>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={filteredPesagens.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                  color: "#3f51b5",
                  fontWeight: "bold",
                },
                ".MuiTablePagination-select": {
                  color: "#3f51b5",
                },
                ".MuiTablePagination-actions": {
                  color: "#3f51b5",
                },
              }}
            />
          </Card>
        </Fade>
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

export default PesagemList