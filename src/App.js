import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import { Route, Routes, BrowserRouter, Switch, useParams} from "react-router-dom";
import Login from './login';
// import Create from './Create';
import Profile from './Profile';
import Home from './Home';
import Logout from './Logout';
import User from './userProfile';
import Competition from './Competition';
import Upgrade from './Upgrade';
import Payment from './stripePayment'
import Ads from './Ads'

function App() {

  const {id} = useParams();

  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Create' element={<Create/>}/>
          <Route path='/Account' element={<Profile/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/competition' element={<Competition/>}/>
          <Route path={'/User/:id'} element={<User/>}/>
          <Route path={'/Upgrade'} element={<Upgrade/>}/>
          <Route path='/Logout' element={<Logout/>}/>
          <Route path='/payment' element={<Payment/>}/>
          {/* <Route path='/ads.txt' element={<Ads/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
