import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { RouteType } from "../../models/RouteType";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuIcon from '@mui/icons-material/Menu';

const NavigatorMobile: React.FC<{ items: RouteType[] }> = ({ items }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  function getList(): React.ReactNode {
      return <List>
                {items.map(item =>
                  <ListItem key={item.path} component={RouterLink} to={item.path}>
                    <ListItemButton onClick={handleDrawerToggle}>
                      <ListItemIcon >
                        <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 20}}/>
                      </ListItemIcon>
                      <ListItemText primary={item.label} sx={{ color: 'primary.main' }}/>                        </ListItemButton>
                  </ListItem>)}
              </List>
  }
  return (
      <Box sx={{ display: 'flex' }}>
          <CssBaseline/>
          <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div">
              Courses app
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: 240 }}}>
          <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
            sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }}}>
              {getList()}
          </Drawer>            
        </Box>          
      </Box>
    );
}
export default NavigatorMobile;