import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import Card from './components/Card/Card'

export default function App(){
  return(
      <div className="app">
        <Header/>
        <Card/>
      </div>
  )
}

