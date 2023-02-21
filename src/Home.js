import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, ButtonGroup} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import TasteMaker3 from './Tastemaker Pro Ad .99 UPDATED.png'
import { renderMatches } from 'react-router-dom';
import Footer from './Footer';
import artistPicture from './2809.jpg'
import pollPicture from './Kendrick Poll Pic.png'

export default function Home(){
    const userAuthToken = sessionStorage.getItem("token")
    const userImg = sessionStorage.getItem("imgURL");
    const [users,setUsers] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [getUserImg, setGetUserImg] = useState([]);
    var test;
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            .then(result => result.json())
            .then(data => setUsers(data))
            .then(console.log("users from Playlist App Server have been found"))
        }
        fetchUsers()
    },[])

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    function clickUser(name){
        name = name.replaceAll("\"", "")
        window.location.assign("http://localhost:3000/User/" + name)
    }

    async function followUserButton(user,follower){
        var alreadyFollowed = false;
        console.log(user)
        console.log(follower)
        var followThisPerson = '';
        var followerId = '';

        

        for(var i = 0; i<users.length;i++){
            if(users[i].userId == user){
                followThisPerson = users[i]._id
                console.log(followThisPerson)
                console.log("FOLLOWER MATCH")
            }
        }

        for(var i = 0; i<users.length;i++){
            if(users[i].userId == follower){
                followerId = users[i]._id;
                console.log(followerId)
                console.log("USER MATCH")
            }
        }

        const followMethod = await fetch("api/users/friends/addFriend",{
            method: 'PATCH',
            body: JSON.stringify({
              "userId": followerId,
              "friendId": followThisPerson
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => console.log(response.json()))
        .then(alert("Friend Added"))
    }

    function checkFollowButton(item1,item2){
        if(item1 != item2){
            return(

                <Button 
                style={{backgroundColor: "#ff914d", color: "black", border:"#5AEDEA", paddingLeft:"1rem", paddingRight:"1rem", marginLeft:".5rem"}}
                onClick={event => {followUserButton(item2,item1)}}>Follow</Button>
            )
        }
    }

    function competitionButton(){
        window.location.assign("http://localhost:3000/competition/")
    }
    function handleUserImgs(userId){
        var userParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        }
        var userData = fetch('https://api.spotify.com/v1/users/' + userId.replaceAll("\"",""))
        .then(response => response.json())
        .then(data => setGetUserImg(data))
    }
    function handleUpgradeButton(){
        window.location.assign("http://localhost:3000/Upgrade")
    }
    return(
        <div className='Home'>
        <Navigation/>
        <div style={{backgroundColor:"black"}}>
        <div style={{margin:'auto',backgroundColor:'black', width:"80%"}}>
        <Carousel fade style={{maxHeight:'900px',margin:'auto', marginTop:"6rem", backgroundColor:"black", color:"black"}}>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={artistPicture}
                alt="First slide"
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                <h3>Best Drake Album</h3>
                <p>Submit your playlist for this week's competition</p>
                <Button style={{backgroundColor: "#ff914d", color: "black", border:"#000000", marginBottom:".5rem", paddingTop:".5rem", paddingBottom:".5rem"}} onClick={event => competitionButton()} >Submit playlist</Button>
                </Carousel.Caption>
                
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={pollPicture}
                alt="Second slide"
                />
                
                <Carousel.Caption>
                <h3>To Pimp a Butterfly or Good Kid m.A.A.d City</h3>
                <p>Vote for which you think is better</p>
                <ButtonGroup>
                <Button style={{backgroundColor:"#ff914d", color:"black", borderColor:"black"}}>
                    To Pimp a Butterfly
                </Button>
                <Button style={{backgroundColor:"black", color:"#ff914d", borderColor:"black"}}>
                    Good Kid m.A.A.d City
                </Button>
                </ButtonGroup>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={TasteMaker3}
                alt="Third slide"
                />
                
                <Carousel.Caption>
                    <Button 
                    onClick={event => handleUpgradeButton()}
                    style={{marginBottom:"1rem", color:"white",backgroundColor:"black", borderColor:"orange", paddingLeft:"2rem",paddingRight:"2rem"}}
                    >
                        Go Pro
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
        </div>
        <br style={{display:"block",content:"",color:"red"}}/>
        <hr style={{color:"red", marginLeft:"25rem", marginRight:"25rem"}}/>
        <div>
            <h1 style={{textAlign:"center", marginTop:"3rem", marginBottom:"3rem"}}>
                For The Tastemakers
            </h1>
            
        
        <hr style={{color:"red", marginLeft:"25rem", marginRight:"25rem"}}/>
        <h5 style={{textAlign:"center", paddingTop:"1.5rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </h5>
        <h5 style={{textAlign:"center"}}>et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </h5>
        <h5 style={{textAlign:"center"}}>consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h5>
        <h5 style={{textAlign:"center"}}> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
        <hr style={{color:"red", marginLeft:"25rem", marginRight:"25rem", marginBottom:"3rem", marginTop:"4rem"}}/>
            </div>
        <div>
            <h1 style={{textAlign:"center"}}>Current Users</h1>
            <hr style={{color:"red", marginLeft:"25rem", marginRight:"25rem", marginBottom:"4rem", marginTop:"4rem"}}/>
            <Container style={{alignItems:"normal"}}>
                <Row className="mx-2 row row-cols-4">
                    {users && users.map((user,i) => (
                        <Card style={{width:'25rem',height:'26rem', paddingTop:'1rem', marginLeft:"1.5rem" }} key={users._id} >
                            <Container onClick={event => clickUser(users[i].userId)}>
                                {console.log(users[i])}
                                    
                                    <Card.Img src={users[i].spotifyUserImgUrl} alt="..."/>
                                        <Container style={{paddingTop:'.25rem'}}> 
                                            {users[i].userId.replaceAll("\"","")}
                                            {checkFollowButton(sessionStorage.getItem("userId"),users[i].userId)}
                                        </Container>
                                        
                            </Container>
                            
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
        <br/>
        <Footer/>
        </div>
    );
}