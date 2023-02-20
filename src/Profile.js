import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import FREE from './FREE.png';
import PRO from './vibes.png';

export default function Profile(){
    const userAuthToken = sessionStorage.getItem("token");
    var userId = sessionStorage.getItem("userId");
    var userEmail = sessionStorage.getItem("userEmail");
    userId = userId.replaceAll("\"","")
    return(
        
        <div>
            <div>
                <Navigation/>
            </div>
            <div style={{marginTop:"6rem"}}>
                <h1>{userId} <img src={FREE} style={{width:"12rem", height:"7rem"}}/></h1>
                <h2>{userEmail}</h2>
                <Button onClick={event => window.location.assign("http://localhost:3000/User/"+userId)}>View public Profile</Button>
                
            </div>
            <div>
                <Button>Upgrade</Button>
            </div>
            
        </div>
    );
}