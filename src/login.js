import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Form } from 'react-bootstrap';
import React,{ useState, useEffect, Component } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import App from './App';
import TastemakerImg  from './Tastemakers Main Logo (1).png'
import TastemakerLogo from './taste makers logo (1).png'
import spotifyImg from './spotify img.png'
import Footer from './Footer Desktop Login'
import FooterMobile from './Footer Login'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const SPOTIFY_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "https://www.tastemakers.pro/"
const generateRandomString = function (length=6){
    return Math.random().toString(20).substring(2,length)
}
// //console.log("User Token: " + sessionStorage.getItem("token"))
const state = generateRandomString(20)
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET



export default function Login(){
    checkURL()
    const [userId,setUserId] = useState("");
    const [currentURL, setCurrentURL] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [userAuthToken, setUserAuthToken] = useState("");
    const [error, setError] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    //console.log("Image:"+ (sessionStorage.getItem("imgURL")))
    //console.log("User: "+ (sessionStorage.getItem("userId")))
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["streaming","playlist-read-private","playlist-modify-private", "playlist-modify-public", "playlist-read-collaborative", "user-library-modify", "user-read-private", "user-read-email", "user-read-currently-playing", "user-read-playback-state", "user-modify-playback-state"]
    const SCOPES_URI_PARAM = SCOPES.join(SPACE_DELIMITER)
    useEffect(() => {
        // API Access Token
        var authParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
          .then(result => result.json())
          .then(data => setAccessToken(data.access_token))
          .catch(result => console.log(result.json()))

          function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          }

          document.body.style.overflowX = 'hidden';
      
          window.addEventListener("resize", handleResize);
          handleResize(); // Set initial size on mount
      
          return () => window.removeEventListener("resize", handleResize);
      }, [])

      function checkForActive(){
          setIsActive(current => !current)
      }

      //For Playlist App Server
      async function fetchUsers(){
            if(sessionStorage.getItem("userId") != null){
                  const response = await fetch('https://playlist-backend-6muv.onrender.com/api/users/createUser',{
                    method: 'POST',
                    body: JSON.stringify({
                      "userId": sessionStorage.getItem("userId"),
                      "friends":[],
                      "playlists":[],
                      "spotifyToken": sessionStorage.getItem("spotifyToken"),
                      "spotifyUserImgUrl": sessionStorage.getItem("spotifyUserImgUrl"),
                      "paidMember":false,
                      "email":sessionStorage.getItem("userEmail")
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  //console.log(response)
                  const json = await response.json()
                  //console.log(json)
                  if(!response.ok){
                    //console.log("User Already Exists")
                  }else{
                    //console.log("User Created")
                  }
          }else{
            //console.log("UserId Null")
          }
        }

      function checkURL(){
      if(window.location.href.includes("access_token")){
        //console.log("TOKEN FOUND")
        const getURL = window.location.href;
        var positionToken = getURL.substring(getURL.indexOf("access_token="),getURL.indexOf("&token_type=Bearer"))
        var secondToken = positionToken.substring(positionToken.indexOf("B"))
        //console.log("2:"+secondToken)
        sessionStorage.setItem("token",secondToken)
        try{
        userInfo()
        }catch{
          return(
            <div><h1>Login Failed</h1></div>
          )
        }
        if(sessionStorage.getItem("userId") != null){
          fetchUsers()
          window.location.assign("https://tastemakers.pro/Home")
        }
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
        sessionStorage.setItem("params",JSON.stringify(userParameters))
        //console.log(sessionStorage.getItem("params"))
        var userData = fetch('https://api.spotify.com/v1/me',userParameters)
        .then(response => response.json())
        // .then(data => sessionStorage.setItem("error",JSON.stringify(data)))
        .then(data => {
          sessionStorage.setItem("userId", JSON.stringify(data.id))
          sessionStorage.setItem("imgURL",data.images[0].url)
          sessionStorage.setItem("userEmail",data.email)
          sessionStorage.setItem("spotifyToken",data.href)
          sessionStorage.setItem("spotifyUserImgUrl",data.images[0].url)
        })
        .catch(response => console.log("CATCH"+response.json()))
        //Just getting UserId for now but definitely can get additional info from this json
      }

    const handleLogin = () => {
        window.location.assign(SPOTIFY_ENDPOINT+'?response_type=token' + '&client_id=' + (CLIENT_ID)
        + '&scope=' + (SCOPES_URI_PARAM) + '&redirect_uri=' + (REDIRECT_URI) + '&state=' + (state))
        const getURL = window.location.href
        getURL.substring(getURL.indexOf("access_token="),"&token_type")
    };

    const handleSignup = () => {
      window.location.assign("https://forms.gle/9z9cmbSbvpmSCSwb8")
  };
    
    function handleSmallerScreen(){
      if(windowSize.width < 765){
        return (
          <div style={{height: "100vh", width: "100%", backgroundColor:"black", textAlign:"center", alignContent:"center", alignItems:"center",color:"black", justifyContent:"center", justifyItems:"center", display:"center"}}>
          {/* <div style={{display: "left", height: "100vh", width: "50vh",textAlign:"center", justifyContent:"left",backgroundColor:"black"}}> */}
            {/* <div style={{textAlign:"center", justifyContent:"center", backgroundColor:"black"}}> */}
              {/* <h1>TasteMakers</h1> */}
              {/* <div style={{justifyContent:"left", marginRight:"20rem", display:"center"}}> */}
                <img src={TastemakerImg} style={{height:"25rem",width:"23rem", marginTop:".5rem"}}/>
                
                <Container style={{marginTop:".1rem",marginBottom:"12rem",backgroundColor:"black", alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center", textAlign:"center", display:"center"}}>
                  <h5 style={{color:"#ff514d",fontSize:"1.5rem"}}>Join Now</h5>
                  <InputGroup style={{display:"center", alignContent:"center", alignItems:"center", justifyContent:"center", justifyItems:"center"}}>
                      <Button style={{backgroundColor:"green", width:"40vh", color:"white", borderColor:"black", borderRadius:"2rem", alignContent:"center"}}
                      onClick={handleLogin}
                      >
                      <img style={{width:"2rem",height:"2rem", marginRight:"1rem"}} src={spotifyImg}/>
                      Login with Spotify</Button>
                      <Button style={{backgroundColor:"black", marginTop:"1rem", width:"40vh", color:"orange", borderColor:"orange", borderRadius:"2rem"}}onClick={handleSignup}>
                    <img style={{width:"2rem",height:"2rem", borderRadius:"5rem", marginRight:"1rem"}} src={TastemakerLogo}/>
                    Sign Up for Beta</Button>
                  </InputGroup>
              </Container>
              {/* </div> */}
              
            {/* </div>   */}
          {/* </div> */}
          <br/>
        <FooterMobile/>
        </div>
        )
      }else{
          return(
            <div style={{height: "100vh", width: "100%", backgroundColor:"black"}}>
        <div style={{display: "flex", height: "100vh", width: "100%",textAlign:"center", justifyContent:"center",backgroundColor:"black"}}>
          <div style={{textAlign:"center", justifyContent:"center"}}>
            {/* <h1>TasteMakers</h1> */}
            <div style={{justifyContent:"left", marginRight:"20rem", display:"flex"}}>
              <img src={TastemakerImg} style={{height:"40rem",widht:"40rem", marginLeft:"10rem", marginTop:".5rem"}}/>
              
              <Container style={{marginTop:"20rem", marginLeft:"5rem"}}>
                <h5 style={{color:"#ff514d",fontSize:"2rem"}}>Join Now</h5>
                <InputGroup>
                    <Button style={{backgroundColor:"green", width:"15rem", color:"white", borderColor:"black", borderRadius:"2rem", marginLeft:"1.5rem"}}
                    onClick={handleLogin}
                    >
                    <img style={{width:"2rem",height:"2rem", marginRight:"1rem"}} src={spotifyImg}/>
                    Login with Spotify</Button>
                    <Button style={{backgroundColor:"black", marginTop:"1rem", width:"15rem", color:"orange", borderColor:"orange", borderRadius:"2rem", marginLeft:"1.5rem"}}onClick={handleSignup}>
                    <img style={{width:"2.5rem",height:"2.5rem", borderRadius:"5rem", marginRight:"1rem"}} src={TastemakerLogo}/>
                    Sign Up for Beta</Button>
                </InputGroup>
            </Container>
            </div>
            
          </div>  
        </div>
        <br/>
        <Footer/>
      </div>
           )
      }
    }

    return(
      <div>
      {handleSmallerScreen()}
        </div>
    )
}