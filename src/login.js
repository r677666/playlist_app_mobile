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
console.log(sessionStorage.getItem("token"))

const state = generateRandomString(20)
const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";

export default function Login(){
    
    const [userId,setUserId] = useState("");
    const [currentURL, setCurrentURL] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [userAuthToken, setUserAuthToken] = useState("");
    const [error, setError] = useState("");
    console.log("Error:"+error)
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["playlist-read-private","playlist-modify-private", "playlist-modify-public", "playlist-read-collaborative", "user-library-modify"]
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
      }, [])

    function userInfo(){
        var userParameters = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userAuthToken
          }
        }
        var userData = fetch('https://api.spotify.com/v1//me',userParameters)
        .then(response => response.json())
        // .then(data => setError(data))
        // .then(data =>{ setUserId(data)})
      }

    const handleLogin = () => {
        window.location.assign(SPOTIFY_ENDPOINT+'?response_type=token' + '&client_id=' + encodeURIComponent(CLIENT_ID)
        + '&scope=' + encodeURIComponent(SCOPES_URI_PARAM) + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + '&state=' + encodeURIComponent(state))
        const getURL = window.location.href
        // // console.log("String = " + URL)
        getURL.substring(getURL.indexOf("access_token="),"&token_type")
        if(getURL.includes("access_token")){
        console.log("TOKEN FOUND")
        var positionToken = getURL.substring(getURL.indexOf("access_token="),getURL.indexOf("&token_type=Bearer"))
        var secondToken = positionToken.substring(positionToken.indexOf("B"))
        setUserAuthToken(secondToken)
        sessionStorage.setItem("token",secondToken)
        // // console.log("User Bearer Token from URL = " + userAuthToken)
        userInfo()
        // window.location.assign("http://localhost:3000/Home")
        }
        // else if(!URL.includes("access_token")){
        //     console.log("TOKEN NOT FOUND ************")
        // }
    };
    
    return(
        <div>
            <h1>Login</h1>
            <Container>
                <InputGroup>
                    <Button onClick={handleLogin}>login to spotify</Button>
                </InputGroup>
            </Container>
        </div>
    )
}