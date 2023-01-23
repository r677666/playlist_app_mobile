import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function Profile(){
    const userAuthToken = sessionStorage.getItem("token");
    var userId = sessionStorage.getItem("userId");
    var userEmail = sessionStorage.getItem("userEmail");
    userId = userId.replaceAll("\"","")
    return(
        
        <div>
            <Navigation/>
            <div>
                <h1>{userId}</h1>
                <h2>{userEmail}</h2>
            </div>
        </div>
    );
}