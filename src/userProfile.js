import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';
import FREE from './FREE.png';
import PRO from './vibes.png';

export default function UserProfile(){
    const { id } = useParams()
    const [users,setUsers] = useState([])
    const [friendsIds,setFriendsIds] = useState([])
    var [friends,setFriends] = useState([])
    var [compDocs,setCompDocs] = useState([])
    var [compDocsPlaylistName,setCompDocsPlaylistName] = useState([])
    var userId = sessionStorage.getItem("userId")

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            .then(result => result.json())
            .then(data => setUsers(data))
            // .then(console.log(users))
            // .then(console.log("users from Playlist App Server have been found"))
        }
        fetchUsers()
        
        const getFriends = async () => {
            
            var token = "";
            var demoArr = [];
            for(var i = 0; i<users.length;i++){
                var test = users[i].spotifyToken;
                test = test.substring(33)
                if(id === test){
                    token = users[i]._id
                    const getFriends = await fetch('/api/users/' + token)
                    .then(result => result.json())
                    .then(data => demoArr.push(data.friends))
                }
            }
            // console.log("Demo Arr: "+demoArr);
            setFriendsIds(demoArr[0])
            // console.log("Friends Ids: "+friendsIds)

        }
        getFriends()
        const queryFriends = async () => {
            var test = [];
            for(var i = 0; i<friendsIds.length; i++){
                var user = friendsIds[i];
                const query = await fetch('/api/users/' + user)
                .then(result => result.json())
                .then(data => test.push(data.userId))
            }
            // console.log(test)
            setFriends(test)
        }
        queryFriends()
        
        
    },[users,friendsIds,id]);

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function friendsFilter(){
    var unique = friends.filter(onlyUnique);
    friends = unique;
    }
    friendsFilter()
    let validate;

    if(friends == null){
        validate = <div>Loading...</div>
    }else{
        validate = <Row>
        {friends.map((friends,i) => {return(
            <Card style={{width:'8rem',height:'8rem', paddingTop:'1rem' }} key={friends._id} >
                <Container> 
                    {friends}
                </Container>
            </Card>
        )})}
        </Row>
    }

    async function getSubmissions(){
        var arr = []
        const fetchSubmissions = await fetch("/api/competition")
        .then(response => response.json())
        .then(data => setCompDocs(data))
        for(var i = 0; i<compDocs.length; i++){
            if(compDocs[i].userId == userId){
                arr.push(compDocs[i].playlistName)
            }
        }
        setCompDocsPlaylistName(arr)
    }
    getSubmissions()
    return( 
        
        <div>
        
            <Navigation/>
            <div>
                <Container style={{marginTop:"8rem"}}>
                    <h1>{id} <img style={{width:"7rem"}}src={FREE}/></h1>
                    <h3>Friends</h3>
                    <Container>
                        {/* <Row> */}
                        {validate}
                        {/* <div>Loading</div> */}
                        {/* {friends.map((friends,i) => {return(
                            <Card style={{width:'8rem',height:'8rem', paddingTop:'1rem' }} key={i} >
                                <Container> 
                                    {friends}
                                </Container>
                            </Card>
                        )})} */}
                        {/* </Row> */}
                    </Container>
                    <h3>Current Submissions</h3>
                    <Container>
                        <Row>
                            <Card style={{width:'25rem',height:'18rem', paddingTop:'1rem' }}>
                                {compDocsPlaylistName[0]}
                            </Card>
                        </Row>
                    </Container>
                </Container>
            </div>
        </div>
    )
}
