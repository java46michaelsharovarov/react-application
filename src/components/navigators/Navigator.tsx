import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { RouteType } from "../../models/RouteType";
import NavigatorDesktop from "./NavigatorDesktop";
import NavigatorMobile from "./NavigatorMobile";

const Navigator: React.FC<{items: RouteType[]}> = ({items}) => {
    const isLaptopOrDesktop = useMediaQuery('(min-width: 900px)');
    return (<Box sx={{mt: { xs: '12vh', sm: '17vw', md: '12vh'}}}>
                {isLaptopOrDesktop ? <NavigatorDesktop items={items}/> : <NavigatorMobile items={items}/>}
           </Box>)
}
export default Navigator;