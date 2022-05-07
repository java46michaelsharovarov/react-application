import { AppBar, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { RouteType } from "../../models/RouteType";

const NavigatorDesktop: React.FC<{items: RouteType[]}> = ({items}) => {
    const [tabNumber, setTabNumber] = React.useState<number>(0);
    function changeTab(event: any, tabNumber: number): void {
        setTabNumber(tabNumber);
    }
    function getTabs(): React.ReactNode {
        return items.map(item => <Tab key={item.path} component={RouterLink} to={item.path} label={item.label}/>)
    }
    return <AppBar position={"fixed"} style={{alignItems: 'center'}}>
                <Tabs value={tabNumber} onChange={changeTab} textColor="inherit" indicatorColor="secondary">
                    {getTabs()}
                </Tabs>
           </AppBar>
}
export default NavigatorDesktop;