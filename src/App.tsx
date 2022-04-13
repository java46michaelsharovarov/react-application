import React from 'react';
import Life from './components/LIfe';
import lifeGameConfig from './config/lifeGameConfig.json';
function App() {

  return <>
            <Life dimension={lifeGameConfig.dimension} ticInteval={lifeGameConfig.tic}></Life>
         </>
            
         
}

export default App;
