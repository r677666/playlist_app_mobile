import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

export default function UserProfile(){
    return(
        <div>
            <Navigation/>
            <div style={{marginTop:"8rem"}}>Competition</div>
        </div>
    )
}