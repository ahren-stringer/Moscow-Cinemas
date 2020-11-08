import React from 'react';
import './App.css';
import Header from '../src/Components/Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Liked from './Components/Liked/Liked';
import Navbar from './Components/Navbar/NavbarContainer';
import Info from './Components/Info/InfoContainer';
import 'materialize-css'
import Search from './Components/Search/Search';

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
      <Route path='/search/:riched' render={()=><Search/>}/>
        <Route path='/liked/:id?' render={()=><Liked/>}/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

