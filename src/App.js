import React from 'react';
import './App.css';
import Current from './components/current';
import Context from './components/context';

function App() {
  return (
    <>
   <Current station="KNYC" location="New York, NY, USA"/>
   <Context stationId="GHCND:USW00094728" />
   </>
  );
}

export default App;
