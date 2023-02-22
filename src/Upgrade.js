import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, Col, Collapse, Accordion } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import crown from './crown.png';
import goldOk from './gold_ok.png';
import grayOk from './gray_ok.png'

function handleUpgradeButton(){
    window.location.assign('http://localhost:3000/Payment')
}

export default function Upgrade(){
    return(
        <div>
            <Navigation/>
            <h1 style={{marginTop:"8rem",textAlign:"center", marginBottom:"2.5rem"}}> Upgrade To PRO </h1>
            <div>
            <Container className='d-flex justify-content-center text-center'>
                    
                    <Card style={{width:'30rem',height:'32rem', paddingTop:'1rem', marginRight:'6rem',borderRadius: "1rem",backgroundColor:'black',borderColor:'#dbdbdb'}}>
                    {/* <Card.Img style={{width:'5rem',maxHeight:'3rem'}}src='https://static.vecteezy.com/system/resources/previews/001/200/758/original/music-note-png.png'/> */}
                            <Card.Title style={{fontSize:'2rem', color:'orange'}}>Free</Card.Title>
                        <hr style={{marginBottom: '0', marginTop:'1rem'}}/>
                            <Card.Body className='text-center' style={{backgroundColor:'white'}}> 
                                <Card.Text style={{marginTop:'5.5rem'}}>
                                    <img src={grayOk}/>
                                    Ability to View Other's created playlist
                                </Card.Text>
                                <Card.Text>
                                    <img src={grayOk}/>
                                    Access to Playlist Creation
                                </Card.Text>
                                <Card.Text>
                                    <img src={grayOk}/>
                                    Created Playlist Added to Spotify Account
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    <Card style={{display:'center',width:'30rem',height:'32rem', paddingTop:'1rem',borderRadius: "1rem", backgroundColor:'black',borderColor:'#dbdbdb'}}>
                        <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <img style={{width:'2.3rem',height:'2.3rem', marginRight:'.5rem'}}src={crown}/>
                        <Card.Title style={{fontSize:'2rem', color:"#FFD700", marginRight:'1.5rem',fontSize:'2rem',
                        textShadow: "0 0 0px #fff, 0 0 1px #fff, 0 0 5px #fff, 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 55px #FFD700, 0 0 75px #FFD700"
                        }}>PRO</Card.Title>
                        </Container>
                     <hr style={{marginBottom: '0', marginTop:'1rem'}}/>
                     <Card.Body className='text-center' style={{backgroundColor:'white'}}>
                                <Card.Text style={{marginTop:'3rem'}}>
                                    <img src={goldOk}/>
                                    Removes Ads from the Website
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Submit to Weekly Competition
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Vote for next Artist and/or Playlist Genre
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Chance to Win the Golden Vinyl
                                </Card.Text>
                                <Button 
                                onClick={event => handleUpgradeButton()}
                                style={{marginBottom:".25rem", color:"#ff914d",backgroundColor:"black", borderColor:"black", paddingLeft:"2rem",paddingRight:"2rem",marginTop:'.75rem'}}
                                >
                                    Upgrade
                                </Button>
                            </Card.Body>
                     </Card>
            </Container>
            </div>
            <div style={{marginTop:'4rem'}}>
                <Footer/>
            </div>
        </div>
    )
}