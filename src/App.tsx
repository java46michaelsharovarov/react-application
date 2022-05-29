import React, { useEffect, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { COURSES_PATH, LOGIN_PATH, ROUTES } from './config/routes-config';
import Navigator from './components/navigators/Navigator';
import { Box } from '@mui/material';
import { ClientData } from './models/ClientData';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from './redux/store';
import { RouteType } from './models/RouteType';
import { getCourses } from './redux/actions';
// import { useImitator } from './util/useImitator';

const App: React.FC = () => {
  // useImitator();
  const dispatch = useDispatch<any>();
  useEffect(()=> {dispatch(getCourses())});
  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData)
  const [flNavigate, setFlNavigate] = React.useState<boolean>(true);
  const relevantItems: RouteType[] = useMemo<RouteType[]> (() => getRelevantItems(clientData), [clientData])
  React.useEffect(() => setFlNavigate(false), [])
  return <BrowserRouter>  
            <Navigator items={relevantItems} />
            {flNavigate && (clientData.email 
                              ? <Navigate to={COURSES_PATH}/> 
                              : <Navigate to={LOGIN_PATH}/>) 
            }
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <Routes>
                {getRoutes(relevantItems)}
              </Routes>
            </Box>
         </BrowserRouter>
}
function getRoutes(relevantItems: RouteType[]): React.ReactNode {
  return relevantItems.map(r => <Route key={r.path} path={r.path} element={r.element} />)
}
export default App;

function getRelevantItems(clientData: ClientData): RouteType[] {
  return ROUTES.filter(r => !!clientData.email 
      ? (clientData.isAdmin ? r.authenticated : r.forUser) 
      : !r.authenticated); 
}

