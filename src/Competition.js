import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button, Col, InputGroup, FormControl, CardGroup, Modal, ButtonGroup, CardDeck} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Adsense from 'react-adsense';
//testing change
export default function UserProfile(){

    const [compSubmissions,setCompSubmissions] = useState([''])
    const [userPlaylists,setUserPlaylists] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const [showSetPlayListModal, set_SetPlayList_ShowModal] = useState(false);
    const handleClose_showSetPlayListModal = () => set_SetPlayList_ShowModal(false);
    const handleShow_showSetPlayListModal = () => set_SetPlayList_ShowModal(true);

    const [showCompPlayListModal, set_CompPlayList_ShowModal] = useState(false);
    const handleClose_showCompPlayListModal = () => set_CompPlayList_ShowModal(false);
    const handleShow_showCompPlayListModal = () => set_CompPlayList_ShowModal(true);

    const [showCompPlayListModalMobile, set_CompPlayList_ShowModalMobile] = useState(false);
    const handleClose_showCompPlayListModalMobile = () => set_CompPlayList_ShowModalMobile(false);
    const handleShow_showCompPlayListModalMobile = () => set_CompPlayList_ShowModalMobile(true);

    const [currentPage, setCurrentPage] = useState(1);

    const [choosePlaylistActive, setChoosePlaylistActive] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isCompActive, setCompIsActive] = useState(false);
    const [currentUserForDelete, setCurrentUserForDelete] = useState([]);
    const [compDoc, setCompDoc] = useState('');
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    var docTracks = [];
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://playlist-backend-6muv.onrender.com/api/competition')
            .then(result => result.json())
            .then(data => setCompSubmissions(data))
            // .then(console.log(compSubmissions[0].playlistsId))
        }
        fetchUsers()
        setCurrentUserForDelete(userId)

    })
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
    },[])

    //Post Playlist to Competition
    async function postCompDoc(){

        var postPlaylistToComp = await fetch('https://playlist-backend-6muv.onrender.com/api/competition/create', {
            method: 'POST',
            body: JSON.stringify({
              "userId": userId,
              "playlistName": sessionStorage.getItem("playlistName"),
              "playlistsId": sessionStorage.getItem("playlistId"),
              "likes": []
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(result => console.log(result.json()))
    }

    //Get Playlist
    async function getUserPlaylist(){
        var playlistParameters={
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
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
        // .then(console.log(userPlaylists))
        .catch(response => console.log(response.json()))
      }

    //Get Comp Submitted Playlist
    async function compPlaylist(){
      setCompIsActive(true)
      var playlistParameters={
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
      }
      console.log(sessionStorage.getItem('token'))
      var getUsersPlaylist = await fetch('https://api.spotify.com/v1/playlists/' + sessionStorage.getItem('compDoc'), playlistParameters)
        .then(response => response.json())
        .then(data => setCompDoc(data))
        console.log(compDoc)
        //   {
        //   const personalPlaylists = data.items.filter(playlist => {
        //     return playlist.owner.id === userId.replaceAll("\"","");
        // });setUserPlaylists(personalPlaylists);
        // }
        // // .then(console.log(userPlaylists))
        // .catch(response => console.log(response.json()))
        console.log("PLAYLIST TRACKS FOUND")
    }
    function setClickedPlaylistButton(userId,playlistsName,playlistsId){
        var executed = false;
        var currentID = "";
        return function(){
          
          if(!executed){
            // if(id==currentID){
            setChoosePlaylistActive(current => !current)
            // }else{
            //   currentID = id
            // }
            console.log("User Name:"+userId)
            console.log("Playlists Name:"+playlistsName)
            console.log("Playlist ID = " + playlistsId)
            alert("SELECTED")
            sessionStorage.setItem("playlistId",playlistsId)
            sessionStorage.setItem("playlistName",playlistsName)
            console.log("TEST"+ sessionStorage.getItem("playlistName") + " " + sessionStorage.getItem("playlistId"))
            
            handleClose_showSetPlayListModal()
            postCompDoc()
          }
        }
      }
      function deleteButtonFunction(id){
        console.log(id)
        const getMethod = fetch("https://playlist-backend-6muv.onrender.com/api/competition/" +id)
        .then(result => console.log(result.json()))

        const deleteMethod = fetch("https://playlist-backend-6muv.onrender.com/api/competition/",{
        method: 'DELETE',
        body: JSON.stringify({
            "id": id
        }),
        headers: {
        'Content-Type': 'application/json'
        }
        }).then(response => console.log(response.json()))
        
      }
      //Like Comp Playlist
    const handleLike = async (userId,id) => {
                var arr = [];
                
                const checkIfLikedAlready = await fetch("https://playlist-backend-6muv.onrender.com/api/competition/" + id)
                .then(result => result.json())
                .then(data => 
                    {
                    if(data.likes == null){
                        console.log("TEST")
                    }else{
                        // console.log(data.likes.indexOf('testLike') )
                        if(data.likes.indexOf(userId) !== -1){
                            console.log("REMOVED LIKE")
                                    const followMethod = fetch("https://playlist-backend-6muv.onrender.com/api/competition/removeLike",{
                                        method: 'PATCH',
                                        body: JSON.stringify({
                                            "userId": userId,
                                            "playlistId": id
                                        }),
                                        headers: {
                                        'Content-Type': 'application/json'
                                        }
                                    })
                                    setIsActive(false)
                            //     }
                            // }catch(err){
                            //     console.log(err)
                            // }
                        }else{
                            console.log("ADDED LIKE")
                            const followMethod = fetch("https://playlist-backend-6muv.onrender.com/api/competition/addLike",{
                                method: 'PATCH',
                                body: JSON.stringify({
                                    "userId": userId,
                                    "playlistId": id
                                }),
                                headers: {
                                'Content-Type': 'application/json'
                                }
                            }
                            )
                            setIsActive(true)
                        }
                    }
                }
                )
                // .then(data => arr.push(data.likes))



        
    }
    function handleNull(data){
        if(data == undefined){
            return "0"
        }else{
            return data.length
        }
    }
    function deleteButton(user,userX){
        if(user == currentUserForDelete){
            return(
            <Button style={{color:"orange",backgroundColor:"black",borderColor:"black"}}onClick={event => deleteButtonFunction(userX)}>
                Delete
            </Button>
            )
        }else{
        }
    }
    function handleCompDocPress(playlist){
      console.log("MADE IT")
      console.log(playlist)
      sessionStorage.setItem('compDoc', playlist)
      handleShow_showCompPlayListModal()
      compPlaylist()
    }
    function handleCompDocPressMobile(playlist){
      console.log("MADE IT")
      console.log(playlist)
      sessionStorage.setItem('compDoc', playlist)
      handleShow_showCompPlayListModalMobile()
      compPlaylist()
    }
    
function handleBigText(){
  if(windowSize.width < 750 ){
    return (
      <>
      <h1 style={{textAlign:"center",fontSize:"1.8rem"}}>The Best Album of the Year</h1>
      <h5 style={{textAlign:"center",color:"gray", fontSize:".75rem",marginBottom:"1.5rem"}}>The Best User Created Album of the Year</h5></>
    )
  }else{
    return(
      <>
      <h1 style={{textAlign:"center",fontSize:"4rem"}}>The Best Album of the Year</h1>
      <h5 style={{textAlign:"center",color:"gray", fontSize:"1rem"}}>The Best User Created Album of the Year</h5>
    </>
    )
  }
}

function handleSubmissionText(){
  if(windowSize.width < 750 ){
    return null
  }else{
    return(
      <div style={{ maxWidth:"50rem"}}>
      <h5 style={{marginBottom:"1.25rem", textAlign:"left", marginTop:'1rem'}}>
        Current Submissions<span style={{marginLeft:"24rem"}}> Payout:
      <span style={{fontSize:"3.5rem",color:"green"}}>$250</span></span></h5>
    </div>
    )
  }
}
function handleSubmitButton(){
  if(windowSize.width < 750 ){
    return (
      <Button style={{marginTop:".2rem",backgroundColor:"#ff914d",color:"black", borderColor:"black", justifyContent:"center", alignIems:"center", display:"flex", textAlign:"center"}} onClick={handleShow_showSetPlayListModal}>
                            Submit a Playlist
                        </Button>
    )
  }else{
    return(
      <Button style={{marginTop:"1.25rem",backgroundColor:"#ff914d",color:"black", borderColor:"black"}} onClick={handleShow_showSetPlayListModal}>
                            Submit a Playlist
                        </Button>
    )
  }
}

function handleGoogleAds(){
  if(windowSize.width < 750 ){
    return (
      <div>

        <Container style={{marginBottom:'5rem', display:"inline-flex", width:"24rem", textAlign:"center"}}>

<div style={{width:"100%"}}>
  {handleSubmissionText()}
  <Col>
    <Row className="flex overflow-auto overflow-y-scroll" style={{height:'20rem'}}>
      {compSubmissions && compSubmissions.map((user,i) => (
          <Card style={{justifyContent:"left", justifyItems:"center", height:"8rem"}} >
                  <Container style={{width:"100%"}}> 
                      <h4 style={{justifySelf:"left", marginTop:"1rem"}}>{compSubmissions[i].playlistName}</h4>
                      <Button 
                      onClick={event => handleCompDocPressMobile(compSubmissions[i].playlistsId)} 
                      style={{marginLeft:"1rem",color:"black", backgroundColor:"white", borderColor:"orange"}}>view</Button>
                      <ButtonGroup style={{float:"right"}}>
                          <Button
                          key={compSubmissions._id} 
                          onClick={event => handleLike(userId,compSubmissions[i]._id)}
                          style={{width:"5rem",
                          backgroundColor: "white", 
                          color:"black",
                          borderColor:"orange"}}
                          >
                          Like {handleNull(compSubmissions[i].likes)}
                          </Button>
                          {deleteButton(compSubmissions[i].userId,compSubmissions[i]._id)}
                      </ButtonGroup>
                  </Container>
          </Card>
      ))}
        {/* <div> */}
        {/* {currentCards.map((card) => (
          <Card key={card.id} title={card.title} image={card.image} />
        ))}
      </div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </button>
      ))} */}
      </Row>
  </Col>
  {handleSubmitButton()}
  </div>
  
</Container>
      </div>
    )
  }else{
    return(
    <div>
      {/* <Adsense.Google
      client='ca-pub-7787464840070054'
      slot='9738875136'
      style={{ width: 500, height: 300, float: 'left' }}
      format=''
  /> */}
  {/* <ins class="adsbygoogle"
  style={{display:"block", width:"20%", height:"40rem"}}
  data-ad-client="ca-pub-7787464840070054"
  data-ad-slot="9738875136"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins> */}
      <Container style={{marginBottom:'5rem', display:"inline-flex", width:"100%", textAlign:"center"}}>

        <div style={{width:"100%"}}>
          {handleSubmissionText()}
          <Col>
            <Row className="flex overflow-auto overflow-y-scroll" style={{height:'25rem'}}>
              {compSubmissions && compSubmissions.map((user,i) => (
                  <Card style={{padding:".5rem",paddingBottom:"1rem", justifyContent:"left", justifyItems:"left"}} >
                          <Container> 
                              <h4 style={{justifySelf:"left"}}>{compSubmissions[i].playlistName}</h4>
                              <Button 
                              onClick={event => handleCompDocPress(compSubmissions[i].playlistsId)} 
                              style={{marginLeft:"1rem",color:"black", backgroundColor:"white", borderColor:"orange"}}>view</Button>
                              <ButtonGroup style={{float:"right"}}>
                                  <Button
                                  key={compSubmissions._id} 
                                  onClick={event => handleLike(userId,compSubmissions[i]._id)}
                                  style={{width:"5rem",
                                  backgroundColor: "white", 
                                  color:"black",
                                  borderColor:"orange"}}
                                  >
                                  Like {handleNull(compSubmissions[i].likes)}
                                  </Button>
                                  {deleteButton(compSubmissions[i].userId,compSubmissions[i]._id)}
                              </ButtonGroup>
                          </Container>
                  </Card>
              ))}
                {/* <div> */}
                {/* {currentCards.map((card) => (
                  <Card key={card.id} title={card.title} image={card.image} />
                ))}
              </div>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))} */}
              </Row>
          </Col>
          {handleSubmitButton()}
          </div>
          
      </Container>
{/* <div style={{maxWidth:"25%", width:"20%", height:"40rem", backgroundColor:"green", marginLeft:"1rem",marginRight:"1rem"}}>Add 2</div> */}
  <ins class="adsbygoogle"
  style={{display:"block", width:"20%", height:"40rem"}}
  data-ad-client="ca-pub-7787464840070054"
  data-ad-slot="9738875136"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
  </div>
    )
  }
}
//show cards with pages
  // const cardsPerPage = 6;
  // const totalPages = Math.ceil(cards.length / cardsPerPage);
  // const indexOfLastCard = currentPage * cardsPerPage;
  // const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    return(
        <div>
            <Navigation/>
            <div style={{marginTop:"8rem", width:"100%"}}>
                    {handleBigText()}
                </div>
                
                <div style={{justifyContent:"center", width:"100%",display:"inline-flex"}}>
                                        
                {handleGoogleAds()}
                    {/* Modal for Set Playlist Button */}
                <Modal show={showSetPlayListModal} onHide={handleClose_showSetPlayListModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Choose a Playlist to Submit</Modal.Title>
                    </Modal.Header>
                        <Container>
                            <Button onClick={getUserPlaylist}>
                              View Your Playlists
                            </Button>
                            <Card style={{width:'17rem'}}>
                              <Card.Body>
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
                                          onClick={setClickedPlaylistButton(userId,userPlaylists.name,userPlaylists.id)}>
                                          Submit
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
                {/* Show submitted playlist tracks */}
                   <Modal show={showCompPlayListModal} onHide={handleClose_showCompPlayListModal} style={{padding:"5rem"}}>
                    <Modal.Header closeButton>
                    <Modal.Title>{compDoc.name}</Modal.Title>
                    </Modal.Header>
                    <Container style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
                    {isCompActive && compDoc.href ? (compDoc.tracks.items.map((items,i) => {
                      return(
                        <Card>
                      <CardGroup>
                      
                      <Card.Img src={items.track.album.images[0].url} style={{maxWidth:"5rem",maxHeight:"5rem"}}/>
                      {/* {console.log(items.track.album.images[0].url)} */}
                      <CardGroup as='div' className='flex-column' style={{maxWidth:"20rem", paddingLeft:"1rem", paddingTop:".08rem"}}>
                        <Card.Title>
                        {items.track.name}
                        </Card.Title>
                        <Card.Text>
                        {items.track.artists[0].name}
                        </Card.Text>  
                         </CardGroup>
                       </CardGroup>       
                    </Card>
                      )
                    })) : null}
                    

                    </Container>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_showCompPlayListModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

{/* FOR MOBILE - MODAL */}
<Modal show={showCompPlayListModalMobile} onHide={handleClose_showCompPlayListModalMobile} style={{width:"24rem", marginLeft:".25rem"}}>
                    <Modal.Header closeButton>
                    <Modal.Title>{compDoc.name}</Modal.Title>
                    </Modal.Header>
                    <Container style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
                    {isCompActive && compDoc.href ? (compDoc.tracks.items.map((items,i) => {
                      return(
                        <Card>
                      <CardGroup style={{display:"flex"}}>
                      
                      <Card.Img src={items.track.album.images[0].url} style={{maxWidth:"5rem",maxHeight:"5rem"}}/>
                      {/* {console.log(items.track.album.images[0].url)} */}
                      <CardGroup as='div' className='flex-column' style={{maxWidth:"20rem", paddingLeft:"1rem", paddingTop:".08rem"}}>
                        
                        <Card.Title>
                        {items.track.name}
                        </Card.Title>
                        <Card.Text>
                        {items.track.artists[0].name}
                        </Card.Text>  
                         </CardGroup>
                       </CardGroup>       
                    </Card>
                      )
                    })) : null}
                    

                    </Container>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose_showCompPlayListModalMobile}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                    
                </div>
                <Footer/>
        </div>
    )
}