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
            <h1 style={{marginTop:"8rem",textAlign:"center", marginBottom:"2rem"}}> BE THE TASTEMAKER </h1>
            <div>
            <Container className='d-flex justify-content-center text-center'>
                    
                    <Card style={{width:'23rem',height:'32rem', paddingTop:'1rem', marginRight:'3rem',borderRadius: "1rem",backgroundColor:'black',borderColor:'#dbdbdb'}}>
                    {/* <Card.Img style={{width:'5rem',maxHeight:'3rem'}}src='https://static.vecteezy.com/system/resources/previews/001/200/758/original/music-note-png.png'/> */}
                            <Card.Title style={{fontSize:'2rem', color:'orange'}}>Free</Card.Title>
                        <hr style={{marginBottom: '0', marginTop:'1rem'}}/>
                            <Card.Body className='text-center' style={{backgroundColor:'white'}}> 
                                <Card.Text style={{marginTop:'7rem'}}>Ability to View Other's created playlist</Card.Text>
                                <Card.Text>Access to Playlist Creation</Card.Text>
                                <Card.Text>Created Playlist Added to Spotify Account</Card.Text>
                            </Card.Body>
                        </Card>
                    <Card style={{width:'23rem',height:'32rem', paddingTop:'1rem',borderRadius: "1rem", backgroundColor:'black',borderColor:'#dbdbdb'}}>
                     <Card.Title style={{fontSize:'2rem', color:"#FFD700", fontSize:'2rem',
                     textShadow: "0 0 0px #fff, 0 0 1px #fff, 0 0 5px #fff, 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 55px #FFD700, 0 0 75px #FFD700"
                     }}>PRO</Card.Title>
                     <hr style={{marginBottom: '0', marginTop:'1rem'}}/>
                     <Card.Body className='text-center' style={{backgroundColor:'white'}}> 
                                <Card.Text style={{marginTop:'7rem'}}>Ability to View Other's created playlist</Card.Text>
                                <Card.Text>Access to Playlist Creation</Card.Text>
                                <Card.Text>Created Playlist Added to Spotify Account</Card.Text>
                                <Button 
                                onClick={event => null}
                                style={{marginBottom:"1rem", color:"#ff914d",backgroundColor:"black", borderColor:"black", paddingLeft:"2rem",paddingRight:"2rem",marginTop:'2rem'}}
                                >
                                    Go Pro
                                </Button>
                            </Card.Body>
                     </Card>
            </Container>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}