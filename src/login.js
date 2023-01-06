import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Form } from 'react-bootstrap';
import React,{ useState, useEffect, Component } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import App from './App';
import { isCompositeComponent } from 'react-dom/test-utils';

const CLIENT_ID = "46a1cee5d9084a10876b12abb9c51208";
const SPOTIFY_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:3000/Login"
const generateRandomString = function (length=6){
    return Math.random().toString(20).substring(2,length)
}
const state = generateRandomString(20)
// const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";

export default function Login(){
    const [userId,setUserId] = useState("");
    const [currentURL, setCurrentURL] = useState("");
    const [userSaveToken,setUserSaveToken] = useState("");
    const SPACE_DELIMITER = "%20";
    const SCOPES = ["playlist-read-private","playlist-modify-private", "playlist-modify-public", "playlist-read-collaborative", "user-library-modify"]
    const SCOPES_URI_PARAM = SCOPES.join(SPACE_DELIMITER)
    console.log(userSaveToken)
    const handleLogin = () => {
        window.location.assign(SPOTIFY_ENDPOINT+'?response_type=token' + '&client_id=' + encodeURIComponent(CLIENT_ID)
        + '&scope=' + encodeURIComponent(SCOPES_URI_PARAM) + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + '&state=' + encodeURIComponent(state))
        console.log("GET TOKEN")
        var userToken = window.location.href
        // window.location.href.substring(text.indexOf("access_token="),"&token_type")
        if(window.location.href.includes("access_token")){
        console.log("TOKEN FOUND")
        var positionToken = userToken.substring(userToken.indexOf("access_token="),userToken.indexOf("&token_type=Bearer"))
        sessionStorage.setItem("userToken",positionToken)
        window.location.assign("http://localhost:3000/Home")
    }
    };
    
    return(
        <div>
            <h1>Login</h1>
            <Container>
                <InputGroup>
                    <FormControl
                    placeholder="Spotify UserId"
                    type="input"
                    onKeyDown={event => {
                    if(event.key == "Enter"){setUserId(event.target.value)
                    }
                    sessionStorage.setItem("loginUserId",userId)
                    console.log(userId)
                    }
                    }
                    
                    />
                    <Button onClick={handleLogin}>login to spotify</Button>
                </InputGroup>
            </Container>
        </div>
    )
}