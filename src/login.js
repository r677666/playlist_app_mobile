import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Form } from 'react-bootstrap';
import React,{ useState, useEffect, Component } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import App from './App';

const CLIENT_ID = "46a1cee5d9084a10876b12abb9c51208";
const SPOTIFY_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/Login"
const generateRandomString = function (length=6){
    return Math.random().toString(20).substring(2,length)
}
// console.log("User Token: " + sessionStorage.getItem("token"))
const state = generateRandomString(20)
const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";



export default function Login(){
    checkURL()
    const [userId,setUserId] = useState("");
    const [currentURL, setCurrentURL] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [userAuthToken, setUserAuthToken] = useState("");
    const [error, setError] = useState([]);
    const [isActive, setIsActive] = useState(false);
    console.log("Image:"+ (sessionStorage.getItem("imgURL")))
    console.log("User: "+ (sessionStorage.getItem("userId")))
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["playlist-read-private","playlist-modify-private", "playlist-modify-public", "playlist-read-collaborative", "user-library-modify", "user-read-private", "user-read-email"]
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
      }, [])

      function checkForActive(){
          setIsActive(current => !current)
      }

      //For Playlist App Server
      async function fetchUsers(){
            if(sessionStorage.getItem("userId") != null){
                  const response = await fetch('/api/users/createUser',{
                    method: 'POST',
                    body: JSON.stringify({
                      "userId": sessionStorage.getItem("userId"),
                      "spotifyToken": sessionStorage.getItem("spotifyToken")
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  console.log(response)
                  const json = await response.json()
                  console.log(json)
                  if(!response.ok){
                    console.log("User Already Exists")
                  }else{
                    console.log("User Created")
                  }
          }else{
            console.log("UserId Null")
          }
        }

      function checkURL(){
      if(window.location.href.includes("access_token")){
        console.log("TOKEN FOUND")
        const getURL = window.location.href;
        var positionToken = getURL.substring(getURL.indexOf("access_token="),getURL.indexOf("&token_type=Bearer"))
        var secondToken = positionToken.substring(positionToken.indexOf("B"))
        console.log("2:"+secondToken)
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
          window.location.assign("http://localhost:3000/Home")
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
        console.log(sessionStorage.getItem("params"))
        var userData = fetch('https://api.spotify.com/v1/me',userParameters)
        .then(response => response.json())
        // .then(data => sessionStorage.setItem("error",JSON.stringify(data)))
        .then(data => {
          sessionStorage.setItem("userId", JSON.stringify(data.id))
          sessionStorage.setItem("imgURL",data.images[0].url)
          sessionStorage.setItem("userEmail",data.email)
          sessionStorage.setItem("spotifyToken",data.href)
        })
        .catch(response => console.log("CATCH"+response.json()))
        //Just getting UserId for now but definitely can get additional info from this json
      }

    const handleLogin = () => {
        window.location.assign(SPOTIFY_ENDPOINT+'?response_type=token' + '&client_id=' + encodeURIComponent(CLIENT_ID)
        + '&scope=' + encodeURIComponent(SCOPES_URI_PARAM) + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + '&state=' + encodeURIComponent(state))
        const getURL = window.location.href
        getURL.substring(getURL.indexOf("access_token="),"&token_type")
    };
    
    return(
        <div>
            <h1>TasteMakers</h1>
            <Container>
                <InputGroup>
                    <Button style={{backgroundColor:"green"}}onClick={handleLogin}>login with spotify</Button>
                </InputGroup>
            </Container>
        </div>
    )
}