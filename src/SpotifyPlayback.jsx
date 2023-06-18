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
    const [error, setError] = useState(false);
    // const [current_track, setTrack] = useState(track);
    // player.disconnect()
    useEffect(() => {
      
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
      
        document.body.appendChild(script);
      
        let spotifyPlayer;
      
        window.onSpotifyWebPlaybackSDKReady = () => {
          spotifyPlayer = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: (cb) => {
              cb(sessionStorage.getItem('token'));
            },
            volume: 0.5
          });
          console.log(sessionStorage.getItem('token'));
          setPlayer(spotifyPlayer);
      
          spotifyPlayer.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
      
            const playlistId = sessionStorage.getItem('compDoc');
            const access_token = sessionStorage.getItem("token");
      
            spotifyPlayer._options.id = device_id;
            spotifyPlayer._options.getOAuthToken((access_token) => {
              fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  context_uri: `spotify:playlist:${playlistId}`,
                }),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
              });
            });
          });
      
          spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });
      
          spotifyPlayer.connect();
        };
      
        if (window.Spotify) {
          window.onSpotifyWebPlaybackSDKReady();
        }
      
        if (spotifyPlayer) {
          spotifyPlayer.addListener('player_state_changed', async (state) => {
            if (state && state.track_window && state.track_window.current_track) {
              const currentTrack = state.track_window.current_track;
              console.log('Current Track URI:', currentTrack.uri);
              console.log('Current Track ID:', currentTrack.id);
              console.log('Current Track Name:', currentTrack.name);
              sessionStorage.setItem('currentTrack', currentTrack.name);
              console.log('Current Track Artists:', currentTrack.artists);
              console.log('Current Track Album:', currentTrack.album);
              sessionStorage.setItem('currentTrackAlbumImg', currentTrack.album.images[2].url);

              // Check if the current track is the last track in the playlist
        const isLastTrack =
          state.track_window.next_tracks && state.track_window.next_tracks.length === 0;

        // Pause the playback when the last track is reached
        if (isLastTrack && !state.paused) {
          spotifyPlayer.disconnect();
          setPlayer(null)
        }

        if(localStorage.getItem("showSpotifyPlayer") == null){
          player.pause()  
          spotifyPlayer.disconnect()
            setPlayer(null)
            console.log("cancelled")
        }
            }
          });
        }
        // else{
        //   window.onSpotifyWebPlaybackSDKReady();
        // }
      }, []);
      
    
    function handleSpotifyPlaybackOff(){
      player.pause()
      player.disconnect()
        setPlayer(null)
        localStorage.setItem("showSpotifyPlayer", "false")
        console.log(localStorage.getItem("showSpotifyPlaylist"))
    }

    function handleReload() {
      player.pause()
      player.disconnect()
      setPlayer(null);
      localStorage.setItem("showSpotifyPlayer", "false")
      window.onSpotifyWebPlaybackSDKReady();
    }

    return(

      <div>
      {error ? (
        <div>
          {handleReload}
        </div>
      ) : (
            
            <Navbar
            style={{height:"6rem",backgroundSize: "0", backgroundColor: "black", bottom:"0",
            position:"fixed",zIndex:"1060", width:"100%", color:"white", display:"flex"}} 
            variant="dark"
            >
                
                <Button onClick={() => handleSpotifyPlaybackOff()} 
                style={{background:`url(${exit})`, backgroundSize: "cover", border: "none", height:"2rem", marginBottom:"1rem",width:"1.5rem", marginLeft:"1rem",justifyContent:"flex-end", display:"flex"}}/>
                <img src={sessionStorage.getItem("currentTrackAlbumImg")} style={{height:"5rem", width:"5rem", marginLeft:"1rem"}}/>
                <text style={{marginLeft:"1rem"}}>{sessionStorage.getItem("currentTrack")}</text>
                <button className="btn-spotify" onClick={() => { player && player.previousTrack() }} >
                  &lt;&lt;
                </button>

                <button className="btn-spotify" onClick={() => { player && player.togglePlay() }} >
                  {is_paused ? 'PLAY' : 'PAUSE'}
                </button>

                <button className="btn-spotify" onClick={() => {player && player.nextTrack() }} >
                  &gt;&gt;
                </button>


                {/* <img src={play} style={{height:"2.5rem", width:"2.5rem", marginLeft:"32rem"}}/> */}

            </Navbar>
      )}
        </div>
    );
}

export default SpotifyPlayback;