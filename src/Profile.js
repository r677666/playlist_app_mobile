import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function Profile(){
    const userAuthToken = sessionStorage.getItem("userToken").substring(13);
    const userId = sessionStorage.getItem("loginUserId");
    return(
        
        <div>
            <Navigation/>
            <div>
                <h1>Username</h1>
                <h2>Email</h2>
            </div>
        </div>
    );
}