import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function Upgrade(){
    return(
        <div>
            <Navigation/>
            <h1 style={{marginTop:"8rem"}}> UPGRADE TO PRO </h1>
            <div style={{maxWidth:"40rem"}}>
                <CardGroup>
                <Card style={{width:'15rem',height:'25rem', paddingTop:'1rem' }}> Free </Card>
                <Card style={{width:'15rem',height:'25rem', paddingTop:'1rem' }}> PRO </Card>
                </CardGroup>
            </div>
        </div>
    )
}