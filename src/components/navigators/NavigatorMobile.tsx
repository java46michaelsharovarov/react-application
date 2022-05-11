import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { RouteType } from "../../models/RouteType";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { getRouteIndex } from "../../util/functions";

const NavigatorMobile: React.FC<{ items: RouteType[] }> = ({ items }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const location = useLocation();
  const getRouteIndexCallback = React.useCallback(getRouteIndex, [items, location]);
  const index = getRouteIndexCallback(items, location.pathname);
  function getList(): React.ReactNode {
      return items.map(item =>
              <ListItem key={item.path} component={RouterLink} to={item.path} onClick={handleDrawerToggle}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: 'primary.main' }}/>
              </ListItem>)
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
              {items[index].label}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
          sx={{'& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }}}>
            <div style={{display: "flex", justifyContent:'flex-end'}}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon sx={{ color: 'primary.main', fontSize: 30}}/>
            </IconButton>
            </div> 
            <Divider/>
            {getList()}
        </Drawer>            
      </Box> 
    );
}
export default NavigatorMobile;