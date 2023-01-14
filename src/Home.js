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
    const [users,setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            .then(result => result.json())
            .then(data => setUsers(data))
            .then(console.log("users from Playlist App Server have been found"))
        }

        fetchUsers()
    },[])

    return(
        <div className='Home'>
        <Navigation/>
        <div style={{margin:'auto',backgroundColor:'black'}}>
        <Carousel fade style={{width:'960px',maxHeight:'540px',margin:'auto'}}>
            <Carousel.Item interval={2000}>
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
            <Carousel.Item interval={2000}>
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
            <Carousel.Item interval={2000}>
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
            <h1>Current Users</h1>
            {console.log(users)}
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {users && users.map((user,i) => (
                        <Card style={{width:'10rem',height:'5rem'}} key={users._id}>{users[i].userId}</Card>
                    ))}
                </Row>
            </Container>
        </div>
        </div>
    );
}