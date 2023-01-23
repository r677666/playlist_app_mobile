import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function Logout(){
    sessionStorage.setItem('token','')
    sessionStorage.setItem("imgURL",'');
    sessionStorage.setItem("userId",'');
    sessionStorage.setItem("userEmail",'')
    console.log(sessionStorage.getItem('token'))
    return(
        
        <div>
            <div>
                <h1>LoggedOut</h1>
                {/* <Button onClick={logInButtonPressed}>Login to Spotify</Button> */}
            </div>
        </div>
    );
}