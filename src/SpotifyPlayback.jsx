import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap'
import companyImg from '../src/Tastemakers Basic Logo.png'
import crown from './crown.png';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import play from './play.png';
import exit from './cross.png';
import React, { useState, useEffect } from 'react';

function SpotifyPlayback(props){
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    // const [current_track, setTrack] = useState(track);



    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(sessionStorage.getItem("token")); },
                volume: 0.5
            });
            console.log(sessionStorage.getItem("token"))
            setPlayer(player);
    
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
    
    
            player.connect();
    
        

        const playlistId = sessionStorage.getItem("compDoc");
        const access_token = sessionStorage.getItem("token");

        // Play a playlist by its playlistId
        player.addListener('ready', ({ device_id }) => {
        player._options.id = device_id;
        player._options.getOAuthToken((access_token) => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                context_uri: `spotify:playlist:${playlistId}`,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
            });
        });
        });
        };

        player.addListener('player_state_changed', (state) => {
            if (state && state.track_window && state.track_window.current_track) {
              const currentTrack = state.track_window.current_track;
              console.log('Current Track URI:', currentTrack.uri);
              console.log('Current Track ID:', currentTrack.id);
              console.log('Current Track Name:', currentTrack.name);
              sessionStorage.setItem("currentTrack",currentTrack.name)
              console.log('Current Track Artists:', currentTrack.artists);
              console.log('Current Track Album:', currentTrack.album);
              sessionStorage.setItem("currentTrackAlbumImg", currentTrack.album.images[2].url)
            }
          });
        
    }, []);

    function handleSpotifyPlaybackOff(){
        localStorage.setItem("showSpotifyPlayer", "false")
        console.log(localStorage.getItem("showSpotifyPlaylist"))
    }

    return(
        <div>
            
            <Navbar
            style={{height:"5rem",backgroundSize: "0", backgroundColor: "black", bottom:"0",
            position:"fixed",zIndex:"1060", width:"100%", color:"white", display:"flex"}} 
            variant="dark"
            >
                
                <img src={exit} onClick={event => handleSpotifyPlaybackOff()} style={{height:"2rem", width:"2rem", marginLeft:"1rem",justifyContent:"flex-end", display:"flex"}}/>
                <img src={sessionStorage.getItem("currentTrackAlbumImg")} style={{height:"3rem", width:"3rem"}}/>
                <text style={{marginLeft:"1rem"}}>{sessionStorage.getItem("currentTrack")}</text>
                <button onClick={() => { player.previousTrack() }} >
                    &lt;&lt;
                </button>

                <img src={play} style={{height:"2.5rem", width:"2.5rem"}} onClick={() => { player.togglePlay() }} >
                    {/* { is_paused ? "PLAY" : "PAUSE" } */}
                </img>

                <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                    &gt;&gt;
                </button>

                {/* <img src={play} style={{height:"2.5rem", width:"2.5rem", marginLeft:"32rem"}}/> */}

            </Navbar>
        </div>
    );
}

export default SpotifyPlayback;