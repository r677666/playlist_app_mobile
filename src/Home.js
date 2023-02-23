import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, ButtonGroup, Collapse} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import TasteMaker3 from './Tastemaker Pro Ad .99 UPDATED.png'
import { renderMatches } from 'react-router-dom';
import Footer from './Footer';
import artistPicture from './2809.jpg'
import pollPicture from './Kendrick Poll Clear.png'

export default function Home(){
    const userAuthToken = sessionStorage.getItem("token")
    const userImg = sessionStorage.getItem("imgURL");
    const [users,setUsers] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [getUserImg, setGetUserImg] = useState([]);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
      });
    var test;
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            .then(result => result.json())
            .then(data => setUsers(data))
            .then(console.log("users from Playlist App Server have been found"))
        }
        fetchUsers()
        function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          }
      
          window.addEventListener("resize", handleResize);
          handleResize(); // Set initial size on mount
      
          return () => window.removeEventListener("resize", handleResize);
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
    function handleGoProButton(){
        if(windowSize.width < 765){
            return(
                <div></div>
            )
        }else{
           return(
              <Button 
                    onClick={event => handleUpgradeButton()}
                    style={{marginBottom:"1rem", color:"white",backgroundColor:"black", borderColor:"#ff914d", paddingLeft:"2rem",paddingRight:"2rem"}}
                    >
                        Go Pro
                    </Button>  
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
    function handleTextMobile(){
        if(windowSize.width < 765){
            return(
                <div>
                    
                </div>
            )
        }else{
            return(
                <div>
                    <h5 style={{textAlign:"center", paddingTop:"1.5rem"}}>Ever sit around and wonder, "What would be their best album?". Three songs from this album, five from that, </h5>
            <h5 style={{textAlign:"center"}}>  two from another? Man, that's a good damn album right?...Shouldn't you get a paid for making THAT good of an album. Well, Tastemakers is the place for you.</h5>
            <h5 style={{textAlign:"center"}}> We're here for the music heads, the old heads, the TASTEMAKERS. Sure AI can generate some random playlists of something you MIGHT like.</h5>
            <h5 style={{textAlign:"center"}}> But we all know the truth. Music is made by humans. Humans have the taste. Humans should be the MAKERS.</h5>
                </div>
            )
        }
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
                <h3 style={{color:"black", textShadow: '0 0 5px #ffffff, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF'}}>Best Drake Album</h3>
                <p style={{color:"white", textShadow: "0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #000, 0 0 55px #000, 0 0 75px #000"}}>Submit playlist for this week's competition</p>
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
                <h3 style={{color:"black", textShadow: '0 0 5px #ffffff, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF'}}>To Pimp a Butterfly or Good Kid m.A.A.d City</h3>
                <p style={{color:"white",textShadow: "0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #000, 0 0 55px #000, 0 0 75px #000"}}>Vote Now</p>
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
                <div>{handleGoProButton()}</div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
        </div>
        <hr style={{borderColor:"red", height:".2rem"}}/>
        <div>
            <h1 style={{textAlign:"center", marginTop:"3rem", marginBottom:"3rem"}}>
                Music Lovers Welcome
            </h1>
            
        
        <hr style={{borderColor:"red", height:".2rem"}}/>
        <div>
            {handleTextMobile()}
        </div>
        <h5 style={{textAlign:"center"}}> Music is made by humans. Humans have TASTE. Humans are the MAKERS.</h5>
        <h5 style={{textAlign:"center", paddingTop:"1.5rem"}}> Welcome to the movement.</h5>
        <h5 style={{textAlign:"center", paddingTop:"1.5rem", fontSize:"1.75rem"}}> Welcome to TASTEMAKERS.</h5>
        <hr style={{borderColor:"red", height:".2rem",marginBottom:"3rem", marginTop:"4rem"}}/>
            </div>
        <div>
            <h1 style={{textAlign:"center"}}>Current Users</h1>
            <hr style={{borderColor:"red", height:".2rem",marginBottom:"3rem", marginTop:"4rem", textAlign:'center'}}/>
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