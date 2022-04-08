import React from 'react';
import './App.css';
import Color from './components/Color';
import Timer from './components/Timer';
import InputData from './components/InputData';
import timeZones from './config/time-zones';
import colors from './config/colors'
type ComponentNames = "Color selection" | "Show time" | "Show color" | "Time zone selection"
function App() {
  const [timeZone, setTimeZone] = React.useState('Asia/Jerusalem');
  const [color, setColor] = React.useState('red');
  const [componentName, setComponentName] = React.useState<ComponentNames>('Color selection');
  const mapComponents: Map<ComponentNames, React.ReactNode> = new Map();
  mapComponents.set("Color selection", <InputData values={colors} injectValue={setColor}></InputData>);
  mapComponents.set("Show color", <Color color={color}></Color>);
  mapComponents.set("Time zone selection", <InputData values={timeZones} injectValue={setTimeZone}></InputData>);
  mapComponents.set("Show time", <Timer timeZone={timeZone}></Timer>);

  return <>
          <div style={{display: "flex", justifyContent: 'center',  marginTop: '5vh'}}>
            {Array.from(mapComponents.keys()).map(
              k => <button onClick={() => setComponentName(k)} style={{width: '15vw', marginRight: '5vw'}}>{k}</button>)}
          </div>
          <div style={{display: "flex", justifyContent: 'center', marginTop: '5vh', textAlign: 'center', marginRight: '5vw'}}>
            {mapComponents.get(componentName)}
          </div>
        </>
}

export default App;
