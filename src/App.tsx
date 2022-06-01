import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { COURSES_PATH, LOGIN_PATH, LOGOUT_PATH, ROUTES } from './config/routes-config';
import Navigator from './components/navigators/Navigator';
import { Box, Modal } from '@mui/material';
import { ClientData, emptyClientData } from './models/ClientData';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from './redux/store';
import { RouteType } from './models/RouteType';
import { authAction, getCourses, setCourses, setOperationCode } from './redux/actions';
import { OperationCode } from './models/OperationCode';
import { dataProvider } from './config/service-config';
import ServerAlert from './components/Alerts/ServerAlert';
import Spinner from './components/Spinner/Spinner';
// import { useImitator } from './util/useImitator';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const App: React.FC = () => {
  // useImitator();
  const dispatch = useDispatch<any>();
  const operationCode: OperationCode = useSelector<StateType, OperationCode> (state => state.operationCode);
  const clientData: ClientData = useSelector<StateType, ClientData>(state => state.clientData);
  const [flNavigate, setFlNavigate] = useState<boolean>(true);
  const [serverAlert, setServerAlert] = useState<boolean>(false);
  const [onSpinner, setOnSpinner] = useState<boolean>(false);
  const retryTimeout: number = 10;
  const relevantItems: RouteType[] = useMemo<RouteType[]> (() => getRelevantItems(clientData), [clientData]);
  const operationCodeCallback = useCallback(operationCodeHandler, [operationCode]);
  // useEffect(()=> {
  //   try {    
  //     dispatch(getCourses());
  //     dispatch(setOperationCode(OperationCode.OK));
  // } catch (err: any) {
  //     dispatch(setOperationCode(err))
  // }}, [operationCode, clientData]);
  useEffect(() => {
    dataProvider.get().then(courses =>{ 
      dispatch(setCourses(courses));
      dispatch(setOperationCode(OperationCode.OK));
    }).catch(err => dispatch(setOperationCode(err)));
  },[operationCode, clientData]);
  useEffect(() => setFlNavigate(false), []);
  useEffect(() => operationCodeCallback(), [operationCodeCallback]);

  function operationCodeHandler() { 
    if(operationCode === OperationCode.AUTH_ERROR) {
      dispatch(authAction(emptyClientData));
    }
    if(operationCode === OperationCode.SERVER_UNAVAILABLE) {
      setServerAlert(true);
      setTimeout(()=> {
        dispatch(setOperationCode(OperationCode.OK));
        setServerAlert(false);
        setOnSpinner(true);
        dispatch(getCourses());
      }, retryTimeout*1000);
    }
  }
  return <BrowserRouter>  
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
            <Modal
              open={serverAlert}
              aria-labelledby="serverAlert-modal-title"
              aria-describedby="serverAlert-modal-description"
              disableEscapeKeyDown={true}
            >
              <Box sx={style}>
                  <ServerAlert onAlert={serverAlert} retryTimeout={retryTimeout}/>
              </Box>
            </Modal>
            {onSpinner &&
            <Box sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}>
                  <Spinner/>
            </Box>
            }
         </BrowserRouter>
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

