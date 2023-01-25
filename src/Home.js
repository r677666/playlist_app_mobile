import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import TasteMaker1 from './TasteMaker1.png'
import TasteMaker2 from './TasteMaker2.png'
import TasteMaker3 from './TasteMaker3.png'
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
    const [getUserImg,setGetUserImg] = useState("")
    var [spotifyUsers,setSpotifyUsers] = useState([{}])
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
                style={{backgroundColor: "#ff914d", color: "black", border:"#5AEDEA"}}
                onClick={event => {followUserButton(item2,item1)}}>Follow</Button>
            )
        }
    }

    function userInfo(){
            var userParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
            }
                console.log("Token");
                // console.log(sessionStorage.getItem("token"))
                for(var i = 0; i<users.length;i++){
                var demoUser = users[i].userId
                var userFixed = demoUser.replaceAll('\"', '')
                // console.log("User")
                // console.log(userFixed)
                var userData = fetch('https://api.spotify.com/v1/users/' + userFixed,userParameters)
                // .then(response => console.log(response.json()))
                // .then(data => spotifyUsers.push(data.images[0].url))
                // .then(setSpotifyUsers(loadedUsers))
                .then(console.log("Successfully Retrieved Spotify Users"))
                }
                console.log("Spotify")
                console.log(spotifyUsers)
                spotifyUsers.shift()
                var unique = spotifyUsers.filter(onlyUnique);
                test = unique
                console.log(test)
        }
      
      userInfo()
      function competitionButton(){
        window.location.assign("http://localhost:3000/competition/")
    }
    return(
        <div className='Home'>
        <Navigation/>
        <div style={{margin:'auto',backgroundColor:'black'}}>
        <Carousel fade style={{width:'960px',maxHeight:'540px',margin:'auto', marginTop:"6rem"}}>
            <Carousel.Item interval={2000}>
                <img
                className="d-block w-100"
                src={artistPicture}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>Best Drake Album</h3>
                <p>Submit your playlist for this week's competition</p>
                <Button style={{backgroundColor: "#ff914d", color: "black", border:"#000000"}} onClick={event => competitionButton()} >Submit playlist</Button>
                </Carousel.Caption>
                
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img
                className="d-block w-100"
                src={pollPicture}
                alt="Second slide"
                />
                
                <Carousel.Caption>
                <h3>To Pimp a Butterfly or Good Kid m.A.A.d City</h3>
                <p>Vote for which you think is better</p>
                <Button>
                    Card 1
                </Button>
                <Button>
                    Card 2
                </Button>
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
        <br/>
        <div>
            <h1>Current Users</h1>
            {console.log(users)}
            <Container style={{alignItems:"normal"}}>
                <Row className="mx-2 row row-cols-4">
                    {users && users.map((user,i) => (
                        <Card style={{width:'20rem',height:'22rem', paddingTop:'1rem' }} key={users._id} >
                            <Container onClick={event => clickUser(users[i].userId)}>
                                {console.log(users[i])}
                                    {/* <Card.Img src={users[i].images.url}/> */}
                                        <Container> 
                                            {users[i].userId.replaceAll("\"","")}
                                        </Container>
                            </Container>
                            {checkFollowButton(sessionStorage.getItem("userId"),users[i].userId)}
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