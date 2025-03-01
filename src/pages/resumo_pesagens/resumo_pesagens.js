"use client"

import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import {
  Box,
  Typography,
  TextField,
  Button,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  LocalShipping as TruckIcon,
  Person as DriverIcon,
  Business as CooperativeIcon,
  Scale as WeightIcon,
  Group as GroupIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import Sidebar from "../../components/sidebar"
import { keyframes } from "@emotion/react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import FileDownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";


const handleExportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(filteredPesagens);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pesagens");
  XLSX.writeFile(workbook, "pesagens.xlsx");
};

const handleExportPDF = (data) => {
  const doc = new jsPDF();
  doc.text("Relatório de Pesagens", 20, 10);

  const tableColumn = ["Data", "Prefixo", "Motorista", "Cooperativa", "Tipo Veículo", "Volume Carga", "Peso Calculado"];
  const tableRows = data.map((pesagem) => [
    pesagem.data,
    pesagem.prefixo,
    pesagem.motorista,
    pesagem.cooperativa,
    pesagem.tipoVeiculo,
    pesagem.volume_carga,
    pesagem.pesoCalculado,
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("pesagens.pdf");
};

const PesagemSummary = () => {
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

  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    prefixo: "",
    tipoVeiculo: "",
    volumeCarga: "",
    cooperativa: "",
    pesoCalculado: "",
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
    const totalPeso = data.reduce(
      (sum, pesagem) => sum + calcularPeso(getTipoVeiculo(pesagem.prefixo), pesagem.volume_carga),
      0,
    )
  

    setStats({
      totalPesagens,
      totalPeso,
     
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

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: value,
      }

     
      if (name === "prefixo") {
        newFilters.tipoVeiculo = getTipoVeiculo(value)
      }

     
      if (name === "tipoVeiculo" || name === "volumeCarga") {
        newFilters.pesoCalculado = calcularPeso(newFilters.tipoVeiculo, newFilters.volumeCarga).toString()
      }

      return newFilters
    })
  }

  const calcularPeso = (tipoVeiculo, volumeCarga) => {
    const pesos = {
      Basculante: {
        baixo: 75,
        medio: 150,
        alto: 300,
      },
      Selectolix: {
        baixo: 512.5,
        medio: 1025,
        alto: 2050,
      },
      Baú: {
        baixo: 562.5,
        medio: 1125,
        alto: 2250,
      },
    }
    return pesos[tipoVeiculo]?.[volumeCarga] || 0
  }

  const getTipoVeiculo = (prefixo) => {
    const prefix = prefixo.substring(0, 2).toUpperCase()
    switch (prefix) {
      case "BC":
        return "Basculante"
      case "SL":
        return "Selectolix"
      case "BS":
        return "Baú"
      default:
        return ""
    }
  }

  const getVolumeInfo = (tipoVeiculo) => {
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
    return volumes[tipoVeiculo] || null
  }

  const filteredPesagens = pesagens.filter((pesagem) => {
    const tipoVeiculo = getTipoVeiculo(pesagem.prefixo)
    const pesoCalculado = calcularPeso(tipoVeiculo, pesagem.volume_carga)

    return (
      Object.values(pesagem).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(search.toLowerCase()),
      ) &&
      (!filters.startDate || new Date(pesagem.data) >= filters.startDate) &&
      (!filters.endDate || new Date(pesagem.data) <= filters.endDate) &&
      (!filters.prefixo || pesagem.prefixo.startsWith(filters.prefixo)) &&
      (!filters.tipoVeiculo || tipoVeiculo === filters.tipoVeiculo) &&
      (!filters.volumeCarga || pesagem.volume_carga === filters.volumeCarga) &&
      (!filters.cooperativa || pesagem.cooperativa === filters.cooperativa) &&
      (!filters.pesoCalculado || pesoCalculado.toString().includes(filters.pesoCalculado))
    )
  })

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          padding: "16px",
          marginBottom: 2,
        }}
      >
        {React.createElement(icon, { sx: { fontSize: 40, color: "white" } })}
      </Box>
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
          backgroundColor: "#f0f4f8",
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
          Resumo de Pesagens
        </Typography>

        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 4, px: 2 }}>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
  <StatCard
    title="Total de Pesagens"
    value={stats.totalPesagens}
    icon={BarChartIcon}
    color="#3f51b5"
  />
</Grid>
<Grid item xs={12} sm={6} md={6}>
  <StatCard
    title="Peso Total (kg)"
    value={stats.totalPeso.toLocaleString()}
    icon={TimelineIcon}
    color="#f57c00"
  />
</Grid>
              <Grid item xs={12} sm={6} md={3}>
                
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
              
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Fade in={true} timeout={1000}>
          <Card
            sx={{
              p: 3,
              mx: 2,
              mb: 4,
              bgcolor: theme.palette.background.paper,
              borderRadius: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Filtros
            </Typography>
            <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
  <TextField
    fullWidth
    label="Pesquisar Motorista"
    variant="outlined"
    size="medium"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />

  {/* aqui biba mostra a lista apenas se houver busca */}
  {search && (
    <List>
      {filteredMotoristas.map((motorista) => (
        <ListItem key={motorista.id} button>
          <ListItemText primary={motorista.nome} />
        </ListItem>
      ))}
    </List>
  )}
</Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Data Inicial"
                    value={filters.startDate}
                    onChange={(newValue) => setFilters({ ...filters, startDate: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Data Final"
                    value={filters.endDate}
                    onChange={(newValue) => setFilters({ ...filters, endDate: newValue })}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Prefixo</InputLabel>
                  <Select value={filters.prefixo} onChange={handleFilterChange} name="prefixo" label="Prefixo">
                    <MenuItem value="BC">BC (Basculante)</MenuItem>
                    <MenuItem value="SL">SL (Selectolix)</MenuItem>
                    <MenuItem value="BS">BS (Baú)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Veículo</InputLabel>
                  <Select
                    value={filters.tipoVeiculo}
                    onChange={handleFilterChange}
                    name="tipoVeiculo"
                    label="Tipo de Veículo"
                  >
                    
                    <MenuItem value="Basculante">Basculante</MenuItem>
                    <MenuItem value="Selectolix">Selectolix</MenuItem>
                    <MenuItem value="Baú">Baú</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Volume de Carga</InputLabel>
                  <Select
                    value={filters.volumeCarga}
                    onChange={handleFilterChange}
                    name="volumeCarga"
                    label="Volume de Carga"
                  >
                  
                    <MenuItem value="baixo">Baixo</MenuItem>
                    <MenuItem value="medio">Médio</MenuItem>
                    <MenuItem value="alto">Alto</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Cooperativa</InputLabel>
                  <Select
                    value={filters.cooperativa}
                    onChange={handleFilterChange}
                    name="cooperativa"
                    label="Cooperativa"
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {/*aqui baitola adicione as opções de cooperativas aqui */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Peso Calculado"
                  variant="outlined"
                  size="medium"
                  value={filters.pesoCalculado}
                  onChange={handleFilterChange}
                  name="pesoCalculado"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Tooltip title="Atualizar dados">
                  <IconButton
                    onClick={fetchPesagens}
                    color="primary"
                    sx={{
                      backgroundColor: "#e3f2fd",
                      "&:hover": { backgroundColor: "#bbdefb" },
                      width: "56px",
                      height: "56px",
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Card>
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
          <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
  
  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, padding: 2 }}>
    <Button variant="contained" color="primary" startIcon={<FileDownloadIcon />} onClick={handleExportExcel}>
      Exportar Excel
    </Button>
    <Button variant="contained" color="secondary" startIcon={<PictureAsPdfIcon />} onClick={handleExportPDF}>
      Exportar PDF
    </Button>
  </Box>

  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Data</TableCell>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Prefixo</TableCell>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Motorista</TableCell>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Cooperativa</TableCell>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Tipo Veículo</TableCell>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Volume Carga</TableCell>
        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#3f51b5", color: "white" }}>Peso Calculado</TableCell>
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
          .map((pesagem, index) => {
            const tipoVeiculo = getTipoVeiculo(pesagem.prefixo);
            const pesoCalculado = calcularPeso(tipoVeiculo, pesagem.volume_carga);
            return (
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
                  <Chip icon={<TruckIcon />} label={pesagem.prefixo} color="primary" variant="outlined" size="small" />
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
                <TableCell>{tipoVeiculo}</TableCell>
                <TableCell>{pesagem.volume_carga}</TableCell>
                <TableCell>
                  <Tooltip title={`Peso Calculado: ${pesoCalculado} kg`}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <WeightIcon sx={{ mr: 1, color: "#f57c00" }} />
                      <Typography>{pesoCalculado} kg</Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })
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

export default PesagemSummary

