import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import { Route, Routes, BrowserRouter, Switch} from "react-router-dom";
import Login from './login';
import Home from './Home';

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
