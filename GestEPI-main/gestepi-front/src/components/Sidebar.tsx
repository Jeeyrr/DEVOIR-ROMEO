import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1 }}>
          {/* Liste des EPI */}
          <ListItem disablePadding>
            <Link
              to="/gestion-epi"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
              }}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Liste des EPI" />
            </Link>
          </ListItem>

          {/* Liste des contrôles */}
          <ListItem disablePadding>
            <Link
              to="/controle"
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
              }}
            >
              <ListItemIcon>
                <FactCheckIcon />
              </ListItemIcon>
              <ListItemText primary="Liste des contrôles" />
            </Link>
          </ListItem>

          {/* Gestion utilisateurs (admin uniquement) */}
          {role === "admin" && (
            <ListItem disablePadding>
              <Link
                to="/admin/utilisateurs"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                }}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Utilisateurs" />
              </Link>
            </ListItem>
          )}
        </List>

        {/* Bouton de déconnexion */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
