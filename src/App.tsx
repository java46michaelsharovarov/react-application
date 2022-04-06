import React from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  return <div>
    <Timer interval={1000} city={'Tel Aviv'} timezone={'Asia/Jerusalem'}/>
    <Timer interval={1000} city={'New York'} timezone={'America/New_York'}/>
    <Timer interval={1000} city={'Beijing'} timezone={'Asia/Shanghai'}/>
    <Timer interval={1000} city={'London'} timezone={'Europe/London'}/>
    </div>
}

export default App;
