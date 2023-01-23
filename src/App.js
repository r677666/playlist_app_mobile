import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import { Route, Routes, BrowserRouter, Switch, useParams} from "react-router-dom";
import Login from './login';
import Create from './Create';
import Profile from './Profile';
import Home from './Home';
import Logout from './Logout';
import User from './userProfile';

function App() {

  const {id} = useParams();

  return(
    <BrowserRouter>
      <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Create' element={<Create/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Logout' element={<Logout/>}/>
          <Route path={'/User/:id'} element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
