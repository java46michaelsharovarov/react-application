import React from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  return <div>
    <Timer city={'Jerusalem'} timeZone={'Asia/Jerusalem'}/>
    <Timer city={'New York'} timeZone={'America/New_York'}/>
    <Timer city={'Beijing'} timeZone={'Asia/Shanghai'}/>
    <Timer city={'London'} timeZone={'Europe/London'}/>
    </div>
}

export default App;
