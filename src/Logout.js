import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function Profile(){
    const userAuthToken = sessionStorage.getItem("userToken").substring(13);
    const userId = sessionStorage.getItem("loginUserId");
    const logInButtonPressed = () => {
        window.location.assign("http://localhost:3000/Login")
    }
    
    return(
        
        <div>
            <div>
                <h1>LoggedOut</h1>
                <Button onClick={logInButtonPressed}>Login to Spotify</Button>
            </div>
        </div>
    );
}