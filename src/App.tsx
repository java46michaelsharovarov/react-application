import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { COURSES_PATH, LOGIN_PATH, LOGOUT_PATH, ROUTES } from './config/routes-config';
import Navigator from './components/navigators/Navigator';
import { Box } from '@mui/material';
import { ClientData, emptyClientData } from './models/ClientData';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from './redux/store';
import { RouteType } from './models/RouteType';
import { authAction, setCourses, setOperationCode } from './redux/actions';
import { OperationCode, OperationCodeMessage } from './models/OperationCode';
import ServerAlert from './components/Alerts/ServerAlert';
import { dataProvider } from './config/service-config';
import { Course } from './models/Course';
import { Subscription } from 'rxjs';
// import { useImitator } from './util/useImitator';

let operationCodeMessage: OperationCodeMessage;

const App: React.FC = () => {
  // useImitator();
  const dispatch = useDispatch<any>();
  const operationCode: OperationCode = useSelector<StateType, OperationCode> (state => state.operationCode);
  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
  const [flNavigate, setFlNavigate] = useState<boolean>(true);
  const [serverAlert, setServerAlert] = useState<boolean>(false);
  const repeatedAuthError = useRef<boolean>(false);
  const relevantItems: RouteType[] = useMemo<RouteType[]> (() => getRelevantItems(clientData), [clientData]);
  const operationCodeCallback = useCallback(operationCodeHandler, [operationCode]);    
  useEffect(() => {
    const subscription: Subscription = dataProvider.getObservableData().subscribe({
      next: courses_err => {
        if(Array.isArray(courses_err)) {
          dispatch(setCourses(courses_err as Course[]));
          dispatch(setOperationCode(OperationCode.OK));
        } else {
          dispatch(setOperationCode(courses_err as OperationCode));
        }
      }
    })
    return () => subscription.unsubscribe();
  }, [clientData]);
  useEffect(() => setFlNavigate(false), []);
  useEffect(() => operationCodeCallback(), [operationCodeCallback]);

  function operationCodeHandler() { 
    if(operationCode === OperationCode.AUTH_ERROR) {
      if (repeatedAuthError.current) {
          dispatch(setOperationCode(OperationCode.UNKNOWN));
      } else {
          repeatedAuthError.current = true;
          setTimeout(()=> repeatedAuthError.current = false, 20000)
          dispatch(authAction(emptyClientData));
      }
    } else if(operationCode === OperationCode.SERVER_UNAVAILABLE) {
        operationCodeMessage = new OperationCodeMessage(operationCode,
          `Unable to access the server !`);        
        setServerAlert(true);
    } else if(operationCode === OperationCode.UNKNOWN) {
        operationCodeMessage = new OperationCodeMessage(operationCode, "Unknow error");
        setServerAlert(false);
        setTimeout(() => setServerAlert(true));
    } else {
        setServerAlert(false);
    }
  }
  return <>{ serverAlert
          ? <Box sx={{
                      position: 'absolute' as 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: {xs: 360, sm: 400}
                    }}>
                <ServerAlert onAlert={serverAlert} operationCodeMessage={operationCodeMessage}/>
            </Box>
          :<BrowserRouter>  
            <Navigator items={relevantItems} />
            {flNavigate && (clientData.email 
                              ? <Navigate to={COURSES_PATH}/> 
                              : <Navigate to={LOGIN_PATH}/>) 
            }
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <Routes>
                {getRoutes(relevantItems, clientData)}
              </Routes>
            </Box>
         </BrowserRouter>}</>
}
export default App;

function getRoutes(relevantItems: RouteType[], clientData: ClientData): React.ReactNode {
  const logoutRoute = relevantItems.find(ri => ri.path === LOGOUT_PATH);
  if (logoutRoute) {
    logoutRoute.label = `Logout ${clientData.displayName}`;
  }
  return relevantItems.map(r => <Route key={r.path} path={r.path} element={r.element}/>)
}
function getRelevantItems(clientData: ClientData): RouteType[] {
  return ROUTES.filter(r => !!clientData.email 
    ? (clientData.isAdmin ? r.authenticated : r.forUser) 
    : !r.authenticated)
}

