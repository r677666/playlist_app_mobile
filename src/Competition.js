import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card, Button, Col, InputGroup, FormControl, CardGroup, Modal, ButtonGroup} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

export default function UserProfile(){

    const [compSubmissions,setCompSubmissions] = useState([''])
    const [userPlaylists,setUserPlaylists] = useState([]);
    const userId = sessionStorage.getItem("userId");
    const [showSetPlayListModal, set_SetPlayList_ShowModal] = useState(false);
    const handleClose_showSetPlayListModal = () => set_SetPlayList_ShowModal(false);
    const handleShow_showSetPlayListModal = () => set_SetPlayList_ShowModal(true);
    const [choosePlaylistActive, setChoosePlaylistActive] = useState(false);
    const [selectedPlaylistName, setSelectedPlaylistName] = useState('');
    const [selectedPlaylistID, setSelectedPlaylistID] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [testUserId,setTestUserId] = useState([])
    const [currentDocs, setCurrentDocs] = useState([]);
    const [compDocsLikes, setCompDocsLikes] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/competition')
            .then(result => result.json())
            .then(data => setCompSubmissions(data))
            // .then(console.log(compSubmissions[0].playlistsId))
        }
        fetchUsers()
    })

    //Post Playlist to Competition
    async function postCompDoc(){

        var postPlaylistToComp = await fetch('/api/competition/create', {
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
      function deleteButtonFunction(userId,id){
        const followMethod = fetch("/api/competition/"+id)
        .then( response => response.json())
        .then(data => setTestUserId(data))

        console.log(JSON.stringify(testUserId))
        const useTestId = testUserId.userId;
        console.log(useTestId)
        if(userId == useTestId){
        //     console.log("test")
        // }
        // if(userId == )
        // if(test == userId){
        //     console.log("TEST:"+userId)
        //     console.log("TEST:"+useTestId)
            const deleteMethod = fetch("/api/competition/",{
            method: 'DELETE',
            body: JSON.stringify({
                "docId": id
            }),
            headers: {
            'Content-Type': 'application/json'
            }
            }).then(response => console.log(response.json()))

        }
      }
      //Like Comp Playlist
    const handleLike = async (userId,id) => {
        //if currentDoc
        //then run try catch
        //else 
        //
        
                var arr = [];
                
                const checkIfLikedAlready = await fetch("/api/competition/" + id)
                .then(result => result.json())
                .then(data => 
                    {
                    if(data.likes == null){
                        console.log("TEST")
                    }else{
                        // console.log(data.likes.indexOf('testLike') )
                        if(data.likes.indexOf(userId) !== -1){
                            console.log("REMOVED LIKE")
                                    const followMethod = fetch("/api/competition/removeLike",{
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
                            const followMethod = fetch("/api/competition/addLike",{
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
    return(
        <div>
            <Navigation/>
            <div style={{marginTop:"8rem"}}>
                    <h1>Competition</h1>
                </div>
                <div>
                    <Container>
                        <h3 style={{marginBottom:"1.25rem"}}>Current Submissions</h3>
                        <Col>
                            {compSubmissions && compSubmissions.map((user,i) => (
                                <Card style={{padding:".5rem",paddingBottom:"1rem"}} >
                                        <Container> 
                                            {compSubmissions[i].playlistName}
                                            <ButtonGroup>
                                                <Button
                                                key={compSubmissions._id} 
                                                onClick={event => handleLike(userId,compSubmissions[i]._id)}
                                                style={{width:"5rem",
                                                marginLeft:"48rem", 
                                                backgroundColor: "white", 
                                                color:"black"}}
                                                >
                                                Like {handleNull(compSubmissions[i].likes)}
                                                </Button>
                                                <Button onClick={event => deleteButtonFunction(userId,compSubmissions[i]._id)}>
                                                    Delete
                                                </Button>
                                                {/* {} */}
                                            </ButtonGroup>
                                        </Container>
                                </Card>
                            ))}
                        </Col>
                        <Button style={{marginTop:"1.25rem",backgroundColor:'orange',color:"black",outlineColor:"orange"}} onClick={handleShow_showSetPlayListModal}>
                            Submit a Playlist
                        </Button>
                    </Container>

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

                </div>
                
        </div>
    )
}