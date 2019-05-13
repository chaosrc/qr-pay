import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Scanner } from './Scanner';

function App() {
  let [status, setStatus] = useState('close')
  let [code, setCode] = useState({})
  
  return (
    <div className="App">
      {status === 'open' ? <Scanner onSuccess={data => data && setCode(data)}></Scanner> : ''}
      {JSON.stringify(code.data)}
      <button onClick={() => setStatus('open')}>扫描</button>
      <button onClick={() => setStatus('close')}>close</button>
    </div>
  );
}

export default App;
