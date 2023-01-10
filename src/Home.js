import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import TasteMaker1 from './TasteMaker1.png'
import TasteMaker2 from './TasteMaker2.png'
import TasteMaker3 from './TasteMaker3.png'

export default function Home(){
    const userAuthToken = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("userId");
    // sessionStorage.setItem("userAuthToken",userAuthToken)
    // sessionStorage.setItem("loginUserId",userId)
    // console.log("User ID = " + sessionStorage.getItem("loginUserId"))
    return(
        <div className='Home'>
        <Navigation/>
        <div style={{margin:'auto',backgroundColor:'black'}}>
        <Carousel fade style={{width:'960px',maxHeight:'540px',margin:'auto'}}>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src={TasteMaker1}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src={TasteMaker2}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src={TasteMaker3}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
        <div>
            <h1>Hello</h1>
        </div>
        </div>
    );
}