import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

export default function UserProfile(){
    return(
        <div>
            <Navigation/>
            <div style={{marginTop:"8rem"}}>
                    <h1>Competition</h1>
                </div>
                <div>
                    <Container>
                        <h3 style={{marginBottom:"1.25rem"}}>Current Submissions</h3>
                        <Col>
                            <Card style={{padding:".5rem",paddingBottom:"1rem"}}>Submission 1</Card>
                            <Card style={{padding:".5rem",paddingBottom:"1rem"}}>Submission 2</Card>
                            <Card style={{padding:".5rem",paddingBottom:"1rem"}}>Submission 3</Card>
                            <Card style={{padding:".5rem",paddingBottom:"1rem"}}>Submission 4</Card>
                            <Card style={{padding:".5rem",paddingBottom:"1rem"}}>Submission 5</Card>
                            <Card style={{padding:".5rem",paddingBottom:"1rem"}}>Submission 6</Card>
                        </Col>
                        <Button style={{marginTop:"1.25rem"}}>
                            Submit a Playlist
                        </Button>
                    </Container>
                </div>
                
        </div>
    )
}