import './App.css';

import React from 'react';

import logo from './logo.svg';

function App() {

  const generateError = () => {
    alert(1);
    throw new Error("Ups an error here! ;)");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={generateError() }>Throw an error</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
