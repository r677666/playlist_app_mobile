import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, ButtonGroup, Collapse} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
// import TasteMaker3 from './Tastemaker Pro Ad .99 UPDATED.png'
import TasteMaker3 from './Tastemaker SUBMIT FREE AD.png'
import { renderMatches } from 'react-router-dom';
import Footer from './Footer';
import FOATad from './FOAT ad (3).png'
import pollPicture from './Kendrick Poll Clear.png'
import stockPhotoLogo from './Tastemakers Main Logo (1).png'
import MobileAe2 from './Tastemaker Pro Ad .99 UPDATED - MOBILE.png'
import SpotifyPlayback from './SpotifyPlayback';
import BottomGoogleAd from './BottomGoogleAd';


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
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/users')
            .then(result => result.json())
            .then(data => setUsers(data))
            // .then(//console.log("users from Playlist App Server have been found"))
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
        window.location.assign("https://www.tastemakers.pro/User/" + name)
    }

    async function followUserButton(user,follower){
        var alreadyFollowed = false;
        //console.log(user)
        //console.log(follower)
        var followThisPerson = '';
        var followerId = '';

        

        for(var i = 0; i<users.length;i++){
            if(users[i].userId == user){
                followThisPerson = users[i]._id
                //console.log(followThisPerson)
                //console.log("FOLLOWER MATCH")
            }
        }

        for(var i = 0; i<users.length;i++){
            if(users[i].userId == follower){
                followerId = users[i]._id;
                //console.log(followerId)
                //console.log("USER MATCH")
            }
        }

        const followMethod = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/users/friends/addFriend',{
            method: 'PATCH',
            body: JSON.stringify({
              "userId": followerId,
              "friendId": followThisPerson
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        // .then(response => //console.log(response.json()))
        .then(alert("Friend Added"))
    }

    // function checkForLogin(){
    //     if(sessionStorage.getItem("token") == null || sessionStorage.getItem("token").length < 1){
    //         window.location.assign("https://www.tastemakers.pro")
    //     }
    //   }

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
        window.location.assign("https://www.tastemakers.pro/Competition/")
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
        window.location.assign("https://www.tastemakers.pro/Upgrade")
    }
    function handleTextMobile(){
        if(windowSize.width < 765){
            return(
                <div>
                    
                </div>
            )
        }else{
            return(
                <div style={{maxWidth:"45rem"}}>
                    <h5 style={{textAlign:"center", paddingTop:"1.5rem"}}>Ever sit around and wonder, "What would be their best album?". Three songs from this</h5>
            <h5 style={{textAlign:"center"}}>album, five from that, two from another? Man, that's a good dang album right?...</h5>
            <h5 style={{textAlign:"center"}}>Shouldn't you get a paid for making THAT good of an album. Well, Tastemakers is the place for you.</h5>
            <h5 style={{textAlign:"center"}}> We're here for the music heads, the casuals, the TASTEMAKERS. Sure AI can generate some random playlists of something you MIGHT like.</h5>
            <h5 style={{textAlign:"center"}}> But we all know the truth.</h5>
                </div>
            )
        }
    }
    function handleCardTextMobile(){
        if(windowSize.width < 765){
            return (
                <div>
                </div>
            )
        }else{
            return(
                <h3 style={{color:"black", marginTop:"20rem",textShadow: '0 0 5px #ffffff, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF'}}>F.O.A.T.</h3>
            )
        }
    }
    function handleCard2TextMobile(){
        if(windowSize.width < 765){
            return (
                <div>
                </div>
            )
        }else{
            return(
                <h3 style={{color:"black", textShadow: '0 0 5px #ffffff, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF'}}>To Pimp a Butterfly or Good Kid m.A.A.d City</h3>
            )
        }
    }

    function checkForSpotifyPlayer(){
        if(localStorage.getItem("showSpotifyPlayer")=="true"){
          // handleOpen_showSpotifyPlayer();
              return(
                <div>
                  <SpotifyPlayback/>
                </div>
              )
            }else if(localStorage.getItem("showSpotifyPlayer")=="false"){
              return(
                <div></div>
              )
            }
      }
    
      function handleSpotifyPlayback(){
        localStorage.setItem("showSpotifyPlayer","true")
        //console.log(localStorage.getItem("showSpotifyPlayer"))
        checkForSpotifyPlayer()
      }

    function handleMobileHomeScreen(){
        if(windowSize.width < 765){
            return(
                <div>
                    <div className='Home'>
        <Navigation style={{marginBottom:"3000rem"}}/>
        <div style={{backgroundColor:"black"}}>
        <div style={{margin:'auto',backgroundColor:'black', width:"80%"}}>
        <Carousel fade style={{maxHeight:'900px', margin:'auto', marginTop:"6.25rem", backgroundColor:"black", color:"black"}}>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={FOATad}
                alt="First slide"
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                {handleCardTextMobile()}
                {/* <p style={{color:"white", textShadow: "0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #000, 0 0 55px #000, 0 0 75px #000"}}>Submit playlist for this week's competition</p> */}
                {/* <Button style={{backgroundColor: "#ff914d", color: "black", border:"#000000", marginBottom:".5rem", paddingTop:".5rem", paddingBottom:".5rem"}} onClick={event => competitionButton()} >Submit playlist</Button> */}
                </Carousel.Caption>
                
            </Carousel.Item>
            {/* <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={pollPicture}
                alt="Second slide"
                />
                
                <Carousel.Caption>
                    {handleCard2TextMobile()}
                <p style={{marginBottom:"1rem",color:"lime",textShadow: "0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #000, 0 0 55px #000, 0 0 75px #000"}}>Vote Now</p>
                <ButtonGroup>
                <Button style={{backgroundColor:"#ff914d", color:"black", borderColor:"black", fontSize:".75rem", padding:".05rem"}}>
                    To Pimp a Butterfly
                </Button>
                <Button style={{backgroundColor:"black", color:"#ff914d", borderColor:"black", fontSize:".75rem",padding:".05rem"}}>
                    Good Kid m.A.A.d City
                </Button>
                </ButtonGroup>
                </Carousel.Caption>
            </Carousel.Item> */}
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
        <div style={{width:"100%"}}>
                <h1 style={{textAlign:"center", marginTop:"3rem", marginBottom:"3rem"}}>
                    Music Lovers Welcome
                </h1>
                
            
            <hr style={{borderColor:"red", height:".2rem", justifyContent:"center", alignContent:"center",justifyItems:"center", alignItems:"center", textAlign:"center"}}/>
            <div style={{width:"100%", display:"inline-flex", justifyContent:"center", alignContent:"center",justifyItems:"center", alignItems:"center", textAlign:"center"}}>
                <div style={{maxWidth:"45rem", marginLeft:"4rem", justifyContent:"center", alignContent:"center",justifyItems:"center", alignItems:"center", textAlign:"center"}}>
                    {handleTextMobile()}
                <img style={{width:"22rem", height:"20rem", marginTop:"2rem", marginRight:"4rem"}}src={stockPhotoLogo}/>
                <h5 style={{paddingTop:"2.5rem", paddingRight:"3rem"}}> Music is made by HUMANS.</h5>
                <h5 style={{textAlign:"center", paddingTop:"1rem", paddingRight:"3rem"}}> Humans are the MAKERS.</h5>
                <h5 style={{textAlign:"center", paddingTop:"1rem", paddingRight:"3rem"}}>Makers have TASTE. </h5>
                <h5 style={{textAlign:"center", paddingTop:"1.5rem", paddingRight:"3rem"}}> Welcome to the movement.</h5>
                <h5 style={{textAlign:"center", paddingTop:"1.5rem", fontSize:"1.75rem", paddingRight:"3rem"}}> Welcome to 
                <span style={{color:"red", marginLeft:".25rem"
                // textShadow: "0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff, 0 0 1px red, 0 0 2px red, 0 0 2px red, 0 0 10px red, 0 0 0px red"
                }}>TASTEMAKERS</span>.</h5>
                </div>
                
            </div>
            <hr style={{borderColor:"red", height:".2rem",marginBottom:"3rem", marginTop:"3rem"}}/>
            
        </div>
        <div>
            <h1 style={{textAlign:"center"}}>Current Users</h1>
            <hr style={{borderColor:"red", height:".2rem",marginBottom:"3rem", marginTop:"4rem", textAlign:'center'}}/>
            <Container style={{alignItems:"normal"}}>
                <Row className="flex-nowrap overflow-auto">
                    {users && users.map((user,i) => (
                        <Card style={{width:'25rem',height:'26rem', paddingTop:'1rem', marginLeft:"1.5rem" }} key={users._id} >
                            <Container 
                            // onClick={event => clickUser(users[i].userId)}
                            >
                                {/* {console.log(users[i])} */}
                                    
                                    <Card.Img src={users[i].spotifyUserImgUrl} alt="..."/>
                                        <Container style={{paddingTop:'.25rem'}}> 
                                            {users[i].userId.replaceAll("\"","")}
                                            {/* Add Follower Button with userProfile is finished */}
                                            {/* {checkFollowButton(sessionStorage.getItem("userId"),users[i].userId)} */}
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
                </div>
            )
        }else{
            return(
                <div style={{backgroundColor:"#FFFCFC"}}>
                            <div className='Home'>
        <Navigation/>
        <div style={{backgroundColor:"black"}}>
        <div style={{margin:'auto',backgroundColor:'black', width:"80%"}}>
        <Carousel fade style={{maxHeight:'900px', margin:'auto', marginTop:"6rem", backgroundColor:"black", color:"black", justifyContent:"center", alignContent:"center"}}>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={FOATad}
                alt="First slide"
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover'}}
                />
                <Carousel.Caption>
                {/* {handleCardTextMobile()} */}
                <p style={{color:"white", textShadow: "0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #000, 0 0 30px #000, 0 0 40px #000, 0 0 55px #000, 0 0 75px #000"}}>Submit playlist for this week's competition</p>
                <Button style={{backgroundColor: "#ff914d", color: "black", border:"#000000", marginBottom:".5rem", paddingTop:".5rem", paddingBottom:".5rem"}} onClick={event => competitionButton()} >Submit playlist</Button>
                </Carousel.Caption>
                
            </Carousel.Item>
            {/* <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={pollPicture}
                alt="Second slide"
                />
                
                <Carousel.Caption>
                    {handleCard2TextMobile()}
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
            </Carousel.Item> */}
            <Carousel.Item interval={4000}>
                <img
                // className="d-block w-100"
                src={TasteMaker3}
                alt="Third slide"
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                />
                
                <Carousel.Caption>
                {/* <div>{handleGoProButton()}</div> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
        </div>
        <hr style={{borderColor:"red", height:".2rem"}}/>
        <div style={{width:"100%"}}>
                <h1 style={{textAlign:"center", marginTop:"3rem", marginBottom:"3rem"}}>
                    Music Lovers Welcome
                </h1>
                
            
            <hr style={{borderColor:"red", height:".2rem"}}/>
            <div style={{width:"100%", display:"inline-flex", justifyContent:"center"}}>
                <div style={{maxWidth:"45rem", marginLeft:"4rem"}}>
                    {handleTextMobile()}
                
                <h5 style={{textAlign:"center"}}> Music is made by humans. Humans have TASTE. Humans are the MAKERS.</h5>
                <h5 style={{textAlign:"center", paddingTop:"1.5rem"}}> Welcome to the movement.</h5>
                <h5 style={{textAlign:"center", paddingTop:"1.5rem", fontSize:"1.75rem"}}> Welcome to 
                <span style={{color:"red", marginLeft:".25rem"
                // textShadow: "0 0 1px #fff, 0 0 1px #fff, 0 0 1px #fff, 0 0 1px red, 0 0 2px red, 0 0 2px red, 0 0 10px red, 0 0 0px red"
                }}>TASTEMAKERS</span>.</h5>
                </div>
                <img style={{width:"28rem", height:"25rem", marginLeft:"8rem", marginTop:"2rem"}}src={stockPhotoLogo}/>
            </div>
            <hr style={{borderColor:"red", height:".2rem",marginBottom:"3rem", marginTop:"4rem"}}/>
            
        </div>
        <div>
            <h1 style={{textAlign:"center"}}>Current Users</h1>
            <hr style={{borderColor:"red", height:".2rem",marginBottom:"3rem", marginTop:"4rem", textAlign:'center'}}/>
            <Container style={{alignItems:"normal"}}>
                <Row className="flex-nowrap overflow-auto">
                    {users && users.map((user,i) => (
                        <Card style={{width:'25rem',height:'26rem', paddingTop:'1rem', marginLeft:"1.5rem" }} key={users._id} >
                            <Container 
                            // onClick={event => clickUser(users[i].userId)}
                            >
                                {/* {//console.log(users[i])} */}
                                    
                                    <Card.Img src={users[i].spotifyUserImgUrl} alt="..."/>
                                        <Container style={{paddingTop:'.25rem'}}> 
                                            {users[i].userId.replaceAll("\"","")}
                                            {/* Add Follower Button with userProfile is finished */}
                                            {/* {checkFollowButton(sessionStorage.getItem("userId"),users[i].userId)} */}
                                        </Container>
                                        
                            </Container>
                            
                        </Card>
                    ))}
                </Row>
            </Container>
        </div>
        <br/>
        {/* {checkForSpotifyPlayer()} */}
        <Footer/>
        </div>
                </div>
            )
        }
    }
    return(
        <div>
            {/* {checkForLogin()} */}
            {handleMobileHomeScreen()}
            <BottomGoogleAd/>
        </div>
        
    );
}