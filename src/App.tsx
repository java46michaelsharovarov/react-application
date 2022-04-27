import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { COURSES_PATH, ROUTES } from './config/routes-config';
import Navigator from './components/navigators/Navigator';

const App: React.FC = () => {
  const [flNavigate, setFlNavigate] = React.useState<boolean>(true);
  React.useEffect(() => setFlNavigate(false), [])
  return <BrowserRouter>
            <Navigator items={ROUTES} />
            {flNavigate && <Navigate to={COURSES_PATH}></Navigate>}
            <div style={{marginTop: '5vh', display: 'flex', justifyContent: 'center'}}>
              <Routes>
                {getRoutes()}
              </Routes>
            </div>
         </BrowserRouter>


}
function getRoutes(): React.ReactNode {
  return ROUTES.map(r => <Route key={r.path} path={r.path} element={r.element} />)
}
export default App;
