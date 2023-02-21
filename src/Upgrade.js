import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';

export default function Upgrade(){
    return(
        <div>
            <Navigation/>
            <h1 style={{marginTop:"8rem",textAlign:"center"}}> UPGRADE TO PRO </h1>
            <div>
            <Container className='d-flex justify-content-center text-center'>
                {/* <CardGroup style={{textAlign:"center"}}> */}
                    <Card style={{width:'23rem',height:'32rem', paddingTop:'1rem', marginRight:'1rem' }}> Free </Card>
                    <Card style={{width:'23rem',height:'32rem', paddingTop:'1rem' }}> PRO </Card>
                {/* </CardGroup> */}
            </Container>
            </div>
        </div>
    )
}