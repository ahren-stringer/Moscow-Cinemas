import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/Components/Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import All from './Components/All/All';
import Liked from './Components/Liked/Liked';
import Navbar from './Components/Navbar/NavbarContainer';
import Info from './Components/Info/InfoContainer';
import 'materialize-css'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className='Header'>
        <Header/>
      </div>
      <Route exact path="/" children={<Navbar/>} />
      <Route path='/cinema/:id' render={()=><Info/>}/>
      <div className='content'>
        <Route path='/liked/:id?' render={()=><Liked/>}/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

