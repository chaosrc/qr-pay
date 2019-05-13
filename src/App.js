import React, {useState} from 'react';
import './App.css';
import { Scanner } from './Scanner';

function App() {
  let [status, setStatus] = useState('close')
  let [code, setCode] = useState({})
  let [id, setId] = useState('')
  const handleSuccess = (data) => {
    const hasData = !!data.data
    if (hasData) {
      setCode(data)
      setStatus('close')
    }
  }
  return (
    <div className="App">
      {status === 'open' ? <Scanner id={id} onSuccess={handleSuccess}></Scanner> : ''}
      {code.data}<br/>
      <button onClick={() => setStatus('open')}>扫描</button>
      <button onClick={() => setStatus('close')}>close</button>
    </div>
  );
}

export default App;
