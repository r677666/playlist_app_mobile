import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

export default function UserProfile(){

    const [compSubmissions,setCompSubmissions] = useState([''])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/competition')
            .then(result => result.json())
            .then(data => setCompSubmissions(data))
            // .then(console.log(compSubmissions[0].playlistsId))
        }
        fetchUsers()
    },[])

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
                            {compSubmissions && compSubmissions.map((user,i) => (
                                <Card style={{padding:".5rem",paddingBottom:"1rem"}} key={compSubmissions._id} >
                                        <Container> 
                                            {compSubmissions[i].playlistsId}
                                            <Button style={{width:"5rem",marginLeft:"48rem"}}>Likes {compSubmissions[i].likes}</Button>
                                        </Container>
                                        
                                </Card>
                            ))}
                        </Col>
                        <Button style={{marginTop:"1.25rem"}}>
                            Submit a Playlist
                        </Button>
                    </Container>
                </div>
                
        </div>
    )
}