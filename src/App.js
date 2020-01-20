import React from 'react';
import logo from './logo.svg';
import './App.css';
import Current from './components/current';

function App() {
  return (
   <Current station="KNYC" location="New York, NY, USA"/>
  );
}

export default App;
