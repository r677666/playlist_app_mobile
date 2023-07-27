import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import Login from './login';
import App from './App';
import { json } from 'react-router-dom';
import Navigation from './Navigation';
import addImage from './add (1).png'
import BottomGoogleAd from './BottomGoogleAd';

const CLIENT_ID = "46a1cee5d9084a10876b12abb9c51208";
const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";

export default function Create(){
    
    const userAuthToken = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("userId");
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [choosePlaylistActive, setChoosePlaylistActive] = useState(false);
    var trackArray = [];
    var trackIDArray = [];
    var jsonTrackIDs = [];
    const [selectedTracks, setSelectedTracks] = useState(trackArray);
    const [selectedTracksIDs, setSelectedTracksIDs] = useState(trackIDArray);
    const [playlistCreated, setPlaylistCreated] = useState([]);
    const [selectedPlaylistName, setSelectedPlaylistName] = useState([]);
    const [selectedPlaylistID, setSelectedPlaylistID] = useState([]);
    const [hoveredTrack, setHoveredTrack] = useState(false);
    const [userImg, setUserImg] = useState("");
    const [userPlaylists,setUserPlaylists] = useState([]);
    //for playlist creation
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    //consts for modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [showSetPlayListModal, set_SetPlayList_ShowModal] = useState(false);
    const handleClose_showSetPlayListModal = () => set_SetPlayList_ShowModal(false);
    const handleShow_showSetPlayListModal = () => set_SetPlayList_ShowModal(true);
    const [showCartModal, set_Cart_ShowModal] = useState(false);
    const handleClose_showCartModal = () => set_Cart_ShowModal(false);
    const handleShow_showCartModal = () => set_Cart_ShowModal(true);
    const [showTrackModal, set_Track_ShowModal] = useState(false);
    const handleClose_showTrackModal = () => set_Track_ShowModal(false);
    const handleShow_showTrackModal = () => set_Track_ShowModal(true);

    function createButtonFunction(){
      if(checkForLogin()){
      playlistCreation();
      handleClose();
      }
    }

    //clickedAlbum consts
    var [clickedAlbum, setClickedAlbum] = useState("");
    var albumCheck = true;
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
    },[])
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Set initial size on mount
  
      return () => window.removeEventListener("resize", handleResize);
    },[]);

    //Playlist Creation SUCCESSFUL
    async function playlistCreation() {
        var playlistParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userAuthToken
            },
            body: JSON.stringify({
              "name": playlistName,
              "description": playlistDescription,
              "public": false
            })
        }
        //Create Playlist from Given User Id
        var createPlaylist = fetch('https://api.spotify.com/v1/users/' + userId.replaceAll("\"","") + '/playlists',playlistParameters)
        .then(response => response.json())
        // .then(data => //console.log(data))
        // .then(//console.log(userId))
    }
    //Get Playlist
    async function getUserPlaylist(){
      if(checkForLogin()){
      var playlistParameters={
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userAuthToken
        }
      }
      var getUsersPlaylist = await fetch('https://api.spotify.com/v1/me/playlists?limit=50&mine=true' , playlistParameters)
      .then(response => response.json())
      .then(data => 
        {
        const personalPlaylists = data.items.filter(playlist => {
          return playlist.owner.id === userId.replaceAll("\"","");
      });setUserPlaylists(personalPlaylists);
      }
      )
      // .then(//console.log(userPlaylists))
      // .catch(response => //console.log(response.json()))
    }
    }
    // Add Tracks to Playlist
    async function addTrackToPlaylist(){
      //console.log("Made It to Adding Tracks to Playlist")
      //console.log("Playlist Id to add Tracks: " + selectedPlaylistID)
      //console.log("Playlist Tracks = " + selectedTracks)
      //console.log("Playlist Tracks IDs = " +selectedTracksIDs)
      var trackToPlaylistParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userAuthToken
        },
        body: JSON.stringify({
          'uris': 
            jsonTrackIDs,
          'position':0
        })
      }
      var addTracks = await fetch('https://api.spotify.com/v1/playlists/' + selectedPlaylistID + '/tracks',trackToPlaylistParameters)
      .then(response => response.json())
      // .then(data => //console.log(data))
    }

    function jsonTracksFunction(arr){
      //console.log("jsonTracksFunction called")
      var newArr = []
      //console.log("Original Array = " + arr)
      //console.log(arr.length)
      for(var i = 0; i<arr.length; i++ ){
        newArr[i] = "spotify:track:" + arr[i];
        //console.log(newArr[i])
      }
      jsonTrackIDs=newArr;
      //console.log("JSON Tracks = " + jsonTrackIDs)
      addTrackToPlaylist()
    }
    function checkForLogin(){
      if(sessionStorage.getItem("token") == null || sessionStorage.getItem("token").length < 1){
          window.location.assign("https://www.tastemakers.pro/Login")
      }else{
        return true
      }
    }
    //Search
    async function search() {
      //console.log("Search for " + searchInput);
      if(checkForLogin()){
      //Get Request for Artist Id
      var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id})
      
      var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&market=US&limit=50', searchParameters)
      .then(response => response.json())
      .then(data => {
        setAlbums(data.items);
      });
      //get album Id to get corresponding tracks
      if(albumCheck!==true){
        var albumID = await fetch('https://api.spotify.com/v1/search?q=' + clickedAlbum + "&type=album", searchParameters)
        .then(response => response.json())
        .then(data => data.albums.items[0].id)
        // .then(//console.log("Album Id Found"))
        
        var returnedTracks = await fetch('https://api.spotify.com/v1/albums/' + albumID + '/tracks',searchParameters)
        .then(response => response.json())
        .then(data => {setTracks(data.items)})
        // .then(//console.log("Tracks for " + clickedAlbum + " Found"))
      }
        
    }
    }
  
    function onClickFunction(name){
      albumCheck = false;
      clickedAlbum = name;
      setIsActive(current => !current)
      var executed = false;
      search();
      setClickedAlbum(name)
      handleShow_showTrackModal()
      // set_Track_ShowModal(true)
    }

    function setClickedPlaylistButton(name,id){
      var executed = false;
      var currentID = "";
      return function(){
        
        if(!executed){
          // if(id==currentID){
          setChoosePlaylistActive(current => !current)
          // }else{
          //   currentID = id
          // }
          //console.log(name)
          //console.log("Playlist ID = " + id)
          alert("SELECTED")
          setSelectedPlaylistID(id)
          setSelectedPlaylistName(name)
        }
      }
    }
    function addCartItemsToPlaylist(){
          // addTrackToPlaylist()
          //console.log("Add cart items pressed")
          jsonTracksFunction(selectedTracksIDs)
    }

    function addTrackToCartFunction(track,id){
      var executed = false;
      return function(){
        if(!executed){
          executed= true;
          setSelectedTracks(trackArray => [...trackArray, track])
          setSelectedTracksIDs(trackIDArray => [...trackIDArray, id])
          alert("Current Tracks For Playlist: " + selectedTracks)
        }
        //console.log(selectedTracks)
        //console.log(selectedTracksIDs)
      }
    }
    function playlistImg(url){
      if(url == null){
        return ""
      }
    }
    // function checkForLogin(){
    //   if(sessionStorage.getItem("token") == null || sessionStorage.getItem("token").length < 1){
    //       window.location.assign("https://www.tastemakers.pro")
    //   }
    // }
    function handleWindowSize(){
      if(windowSize.width < 765){
          return (
            <Row>
              {albums.map((album, i) => {
                return (
                  <div >
                  <CardGroup style={{justifyContent:"center", alignContent:"center", alignItems:"center", justifyItems:"center", marginLeft:"1.5rem"}}>
                    <div key={album.name} 
                    onClick={() => onClickFunction(album.name)}
                    >
                      <Card style={{width:'20rem'}}>
                        <Card.Img src={album.images[0].url} style={{width:'20rem'}}/>
                          <Card.Title>{album.name}</Card.Title>
                      </Card>
                    </div>
                      <Modal 
                      show={handleShow_showTrackModal} 
                      onHide={handleClose_showTrackModal}>
                    <Modal.Header closeButton>
                    <Modal.Title> {clickedAlbum} </Modal.Title>
                    </Modal.Header>
                    <div>
                      <Card style={{width:'18rem'}}>
                      <Card.Body style={{}}>
                        {isActive && (
                                    tracks.map((track, i) => {
                                      return (
                                        <div>
                                          <div>
                                            <Card
                                            // onMouseEnter={() => setHoveredTrack(true)}
                                            // onMouseLeave={() => setHoveredTrack(false)}
                                            >
                                              
                                              <Card.Title >
                                              {track.name}
                                                <Button
                                                style={{marginLeft:'.5rem'}}
                                                onClick={addTrackToCartFunction(track.name,track.id)}
                                                >
                                                  Add
                                                </Button>
                                              </Card.Title>
                                            </Card>
                                          </div>
                                          
                                        </div>
                                      )
                                    })
                                    )}
                                </Card.Body>

                                </Card>
                      </div>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_showTrackModal}>
                        {selectedPlaylistName}
                    </Button>
                    <Button variant="secondary" onClick={addCartItemsToPlaylist}>
                        Tracks
                    </Button>
                    </Modal.Footer>
                </Modal>
                  </CardGroup>
                  
                  
                  </div>
                )
              })}
            
          </Row>
          )
      }else{
          return (
            <div>
              <Row className="mx-2 row row-cols-4">
              {albums.map((album, i) => {
                return (
                  <div >
                  <CardGroup>
                    <div key={album.name} 
                    onClick={() => onClickFunction(album.name)}
                    >
                      <Card >
                        <Card.Img src={album.images[0].url} style={{maxWidth:'18rem', alignSelf:'flex-start'}}/>
                          <Card.Title>{album.name}</Card.Title>
                      </Card>
                    </div>
                  </CardGroup>
                  
                  
                  </div>
                )
              })}
            
          </Row>
            </div>
          )
      }
  }
  function handleCardSize(){
      if(windowSize.width < 765){
          return '30rem'
      }else{
          return '30rem'
      }
  }
    return (
      <div style={{backgroundColor:"#FFFCFC"}}className="App">
        {/* {checkForLogin()} */}
        <Navigation/>
        <br/>
        <Container style={{marginTop:"6rem"}}>
        
          <InputGroup className="mb-3" size="lg">
          <Stack direction='vertical'>
            <FormControl
              placeholder="Search For Artist"
              type="input"
              onKeyDown={event => {
                if(event.key == "Enter"){
                  search();
                  if(isActive===true){
                    setIsActive(current => !current)
                  }
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
              />
              <Button onClick={search}>
                Search
              </Button>
              <Button variant='primary' onClick={handleShow} style={{backgroundColor:'green'}}>
                Create Playlist
              </Button>
              <Button variant='primary' 
              onClick={handleShow_showSetPlayListModal} 
              style={{backgroundColor:"#ff914d"}}>
                Set Playlist to Add Songs
              </Button>
              <Button variant='primary' onClick={handleShow_showCartModal} style={{backgroundColor:'red'}}>
                Add Selected Songs to Playlist
              </Button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Playlist Creator</Modal.Title>
                    </Modal.Header>
                        <Container>
                            <FormControl 
                            placeholder='Playlist Name'
                            type="input"
                            onKeyDown={event => {
                                if(event.key == "Enter"){
                                    setPlaylistName(event.target.value)}
                                }
                                }
                            />
                            <FormControl placeholder='Description'
                                type="input"
                                onKeyDown={event => {
                                if(event.key == "Enter"){
                                    setPlaylistDescription(event.target.value)}
                                }
                                }
                            />
                        </Container>
                        
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createButtonFunction}>
                        Create
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal for Set Playlist Button */}
                <Modal show={showSetPlayListModal} onHide={handleClose_showSetPlayListModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Playlist Creator</Modal.Title>
                    </Modal.Header>
                        <Container>
                            <Button onClick={getUserPlaylist}>
                              View Playlist
                            </Button>
                            <Card style={{width:'17rem'}}>
                              <Card.Body style={{}}>
                                {(
                                  userPlaylists.map((userPlaylists, i) => {
                                    return (
                                      <div>
                                        <div>
                                        <Container>
                                          <Card key={userPlaylists._id}>
                                          {/* <Card.Img src={userPlaylists.images[0].url}/> */}
                                          {/* <Card.Img src={playlistImg(userPlaylists.images[0].url)}/> */}
                                            <Card.Title>{userPlaylists.name}</Card.Title>
                                          </Card>

                                          <Button 
                                          style={{backgroundColor: !choosePlaylistActive ? 'green' : 'red'}}
                                          onClick={setClickedPlaylistButton(userPlaylists.name,userPlaylists.id)}>
                                          Choose Playlist
                                          </Button>
                                        </Container>  
                                        </div>
                                        
                                      </div>
                                    )
                                  })
                                  )}
                              </Card.Body>
                              
                        </Card>
                        </Container>
                        
                    
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_showSetPlayListModal}>
                        Close
                    </Button>
                    <Button variant="secondary">
                        Set Playlist
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* Cart Modal */}
                <Modal show={showCartModal} onHide={handleClose_showCartModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                        <Container>
                            <Button onClick={getUserPlaylist}>
                              View Playlist
                            </Button>
                            <Card style={{width:'17rem'}}>
                              <Card.Body style={{}}>
                                {(
                                  selectedTracks.map((selectedTracks, i) => {
                                    return (
                                      <div>
                                        <div>
                                        <Container>
                                          <Card>
                                            <Card.Title>{selectedTracks}</Card.Title>
                                          </Card>
                                        </Container>  
                                        </div>
                                      </div>
                                    )
                                  })
                                  )}
                              </Card.Body>
                        </Card>
                        </Container>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_showCartModal}>
                        {selectedPlaylistName}
                    </Button>
                    <Button variant="secondary" onClick={addCartItemsToPlaylist}>
                        Add Items to Playlist
                    </Button>
                    </Modal.Footer>
                </Modal></Stack>
          </InputGroup>
        {handleWindowSize()}
        <Modal 
                      show={showTrackModal} 
                      onHide={handleClose_showTrackModal}
                      style={{textAlign:"center", borderColor:"orange", outlineColor:"orange", color:"orange", borderRadius:'2rem'}}
                      >
                    <Modal.Header style={{ textAlign: 'center', backgroundColor:'black', color:'orange', borderColor:'orange', outlineColor:'orange'}} closeButton>
                    <Modal.Title style={{backgroundColor:'black'}}> {clickedAlbum} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}}>
                    <div>
                      <Card style={{width:'100%',backgroundColor:'black'}}>
                      <Card.Body style={{}}>
                        {isActive && (
                                    tracks.map((track, i) => {
                                      return (
                                        <div>
                                          <div>
                                            <Card
                                            style={{width:'100%',backgroundColor:'black', borderColor:'orange'}}
                                            // onMouseEnter={() => setHoveredTrack(true)}
                                            // onMouseLeave={() => setHoveredTrack(false)}
                                            >
                                              
                                              <Card.Title style={{color:"orange", paddingTop:'.5rem'}}>
                                              {track.name}
                                                <Image
                                                style={{marginLeft:'.5rem', width:"1.5rem", height:"1.5rem"}}
                                                src={addImage}
                                                onClick={addTrackToCartFunction(track.name,track.id)}
                                                />
                                              </Card.Title>
                                            </Card>
                                          </div>
                                          
                                        </div>
                                      )
                                    })
                                    )}
                                </Card.Body>

                                </Card>
                      </div>
                      </Modal.Body>
                    <Modal.Footer style={{backgroundColor:"black",color:'orange', borderColor:'orange', outlineColor:'orange'}}>
                    <Button variant="secondary" onClick={handleClose_showTrackModal}>
                        {selectedPlaylistName}
                    </Button>
                    <Button variant="secondary" onClick={addCartItemsToPlaylist}>
                        Tracks
                    </Button>
                    </Modal.Footer>
                </Modal>
        </Container>
        <BottomGoogleAd/>
      </div>
    );
    
}