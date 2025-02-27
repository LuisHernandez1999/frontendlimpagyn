"use client";

import { useState} from "react"
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
} from "@mui/material"
import {
  AiOutlineDashboard,
  AiOutlineControl,
  AiOutlineFileDone,
  AiOutlineLogout,
  AiOutlineSearch,
} from "react-icons/ai"
import { useRouter } from "next/router"

export default function Sidebar() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")
 
  const handleNavigation = (path) => {
    router.push(path)
  }

  const menuItems = [
    { text: "Dashboard Pesagem", icon: AiOutlineDashboard, path: "/dashboard/dashboard_page" },
    { text: "Cadastro de Pesagem", icon: AiOutlineControl, path: "/cadastro_pesagem/cadastro_page_pesagem" },
    { text: "Resumo de Pesagem", icon: AiOutlineFileDone, path: "/resumo_pesagens/resumo_pesagens" },
  ]

  return (
    <Box
      sx={{
        width: "280px",
        height: "100vh",
        backgroundColor: "#1a237e",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "1.5rem",
        zIndex: 1000,
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Fade in={true} timeout={1000}>
        <Typography
          variant="h5"
          sx={{
            marginTop: "2rem",
            marginBottom: "2rem",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Bem-vindo, User1!
        </Typography>
      </Fade>

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
                <AiOutlineSearch color="white" />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              height: "45px",
              color: "white",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255, 255, 255, 0.7)",
              opacity: 1,
            },
          }}
        />
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <Tooltip key={item.text} title={item.text} placement="right" arrow>
            <ListItem
              button
              sx={{
                marginBottom: "1rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "translateX(5px)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <item.icon size={24} />
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Tooltip title="Logout" placement="right" arrow>
        <ListItem
          button
          sx={{
            marginTop: "auto",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              transform: "translateX(5px)",
            },
            "&:active": {
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            },
          }}
          onClick={() => handleNavigation("/logout")}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <AiOutlineLogout size={24} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItem>
      </Tooltip>
    </Box>
  )
}