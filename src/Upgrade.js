import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, Col, Collapse, Accordion } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Upgrade(){
    return(
        <div>
            <Navigation/>
            <h1 style={{marginTop:"8rem",textAlign:"center", marginBottom:"2rem"}}> UPGRADE TO PRO </h1>
            <div>
                {/* <Collapse> */}
            <Container className='d-flex justify-content-center text-center'>
                {/* <Accordion style={{textAlign:"center"}}> */}
                    <Card style={{width:'23rem',height:'32rem', paddingTop:'1rem', marginRight:'3rem', fontSize:'2rem',borderRadius: "1rem"}}> Free </Card>
                    <Card style={{width:'23rem',height:'32rem', paddingTop:'1rem', color:"#FFD700", fontSize:'2rem',borderRadius: "1rem"}}> PRO </Card>
                {/* </Accordion> */}
            </Container>
            {/* </Collapse> */}
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}