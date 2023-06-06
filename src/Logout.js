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
    sessionStorage.setItem("spotifyToken",'')
    sessionStorage.clear()
    console.log(sessionStorage.getItem('token'))
    useEffect(() => {
        window.location.assign("https://playlist-frontend-krmi.onrender.com/")
      }, [])
    return(
        <div>
            <div>
                <h1>LoggedOut</h1>
            </div>
        </div>
    );
}