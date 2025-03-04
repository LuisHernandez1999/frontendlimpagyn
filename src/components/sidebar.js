"use client"

import { useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  InputAdornment,
  Tooltip,
  Fade,
  Avatar,
  Divider,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { useRouter } from "next/navigation"


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

export default function Sidebar() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")

  const handleNavigation = (path) => {
    router.push(path)
  }

  const menuItems = [
    { text: "Dashboard Pesagem", icon: DashboardIcon, path: "/dashboard/dashboard_page" },
    { text: "Cadastro de Pesagem", icon: BarChartIcon, path: "/cadastro_pesagem/cadastro_page_pesagem" },
    { text: "Resumo de Pesagem", icon: AssessmentIcon, path: "/resumo_pesagens/resumo_pesagens" },
  ]

  return (
    <Box
      sx={{
        width: "280px",
        height: "100vh",
        background: `linear-gradient(180deg, ${purpleColors.deepPurple} 0%, ${purpleColors.darkPurple} 100%)`,
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "1.5rem",
        zIndex: 1000,
        boxShadow: `4px 0 20px ${purpleColors.purpleShadow}`,
        transition: "all 0.3s ease-in-out",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          right: "-50%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          zIndex: -1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-30%",
          left: "-30%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.03)",
          zIndex: -1,
        },
      }}
    >
      <Fade in={true} timeout={800}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2, mb: 3 }}>
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "white",
              color: purpleColors.mediumPurple,
              boxShadow: `0 4px 20px ${purpleColors.purpleShadow}`,
              mb: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Bem-vindo!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
            }}
          >
            Sistema de Controle de Pesagem
          </Typography>
        </Box>
      </Fade>

      <Divider
        sx={{
          my: 2,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          width: "100%",
          height: "1px",
        }}
      />

      <Fade in={true} timeout={1000}>
        <Box sx={{ marginBottom: "2rem" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              "& .MuiOutlinedInput-root": {
                height: "45px",
                color: "white",
                "& fieldset": {
                  borderColor: "transparent",
                  transition: "all 0.2s ease",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: purpleColors.lighterPurple,
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />
        </Box>
      </Fade>

      <Fade in={true} timeout={1200}>
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item, index) => (
            <Tooltip key={item.text} title={item.text} placement="right" arrow>
              <ListItem
                button
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "16px",
                  padding: "10px 16px",
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
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    transition: "all 0.5s ease",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateX(5px)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: "40px",
                  }}
                >
                  <item.icon sx={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: "white",
                    "& .MuiTypography-root": {
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Fade>

      <Divider
        sx={{
          my: 2,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          width: "100%",
          height: "1px",
        }}
      />

      <Fade in={true} timeout={1400}>
        <Tooltip title="Logout" placement="right" arrow>
          <ListItem
            button
            sx={{
              marginTop: "auto",
              borderRadius: "16px",
              padding: "10px 16px",
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
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                transition: "all 0.5s ease",
              },
              "&:hover": {
                backgroundColor: "rgba(233, 30, 99, 0.2)",
                transform: "translateX(5px)",
                "&::before": {
                  left: "100%",
                },
              },
              "&:active": {
                backgroundColor: "rgba(233, 30, 99, 0.3)",
              },
            }}
            onClick={() => handleNavigation("/logout")}
          >
            <ListItemIcon
              sx={{
                color: "#ff80ab",
                minWidth: "40px",
              }}
            >
              <LogoutIcon sx={{ fontSize: 22 }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{
                color: "#ff80ab",
                "& .MuiTypography-root": {
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        </Tooltip>
      </Fade>
    </Box>
  )
}

