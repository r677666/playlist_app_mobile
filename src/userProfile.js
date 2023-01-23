import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

const UserProfile = () =>{
    const { id } = useParams()
    const [users,setUsers] = useState([])
    const [friendsIds,setFriendsIds] = useState([])
    const [friends,setFriends] = useState([''])
    console.log(friends)
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            .then(result => result.json())
            .then(data => setUsers(data))
            // .then(console.log("users from Playlist App Server have been found"))
        }
        fetchUsers()
        async function getUserFriends(user){
            var token = "";
            for(var i = 0; i<users.length;i++){
                var test = users[i].spotifyToken;
                test = test.substring(33)
                if(user === test){
                    token = users[i]._id
                    const getFriends = await fetch('/api/users/' + token)
                    .then(result => result.json())
                    .then(data => setFriendsIds(data.friends))
                    break
                }
            }
        }
        getUserFriends(id)
        async function queryFriends(friends){
            for(var i = 0; i<friends.length; i++){
                var user = friends[i];
                const query = await fetch('/api/users/' + user)
                .then(result => result.json())
                .then(data => setFriends(data.userId))
            }
        }
        queryFriends(friendsIds)
    },[])

        // async function getUserFriends(user){
        //     var token = "";
        //     for(var i = 0; i<users.length;i++){
        //         var test = users[i].spotifyToken;
        //         test = test.substring(33)
        //         if(user === test){
        //             token = users[i]._id
        //             const getFriends = await fetch('/api/users/' + token)
        //             .then(result => result.json())
        //             .then(data => setFriendsIds(data.friends))
        //             break
        //         }
        //     }
        // }

        // async function queryFriends(friends){
        //     for(var i = 0; i<friends.length; i++){
        //         var user = friends[i];
        //         const query = await fetch('/api/users/' + user)
        //         .then(result => result.json())
        //         .then(data => setFriends(data.userId))
        //     }
        // }
    // getUserFriends(id)
    // queryFriends(friendsIds)
    //https://stackoverflow.com/questions/56838392/how-to-call-an-async-function-inside-a-useeffect-in-react 
    //try this fix
    return( 
        
        <div>
        
            <Navigation/>
            <div>
                <h1>{id}</h1>
                <h2>Friends</h2>
                <Container>
                    <Row>
                    <Card style={{width:'8rem',height:'8rem', paddingTop:'1rem' }}>
                        "Incoming Friend list, isn't working right now"
                        {/* {friends} */}
                    </Card>
                        {/* {friends.map((i) => (
                        <Card style={{width:'20rem',height:'22rem', paddingTop:'1rem' }} key={i} >
                        <Card.Img src={test[i]}/>
                            <Container> 
                                {friends[i]}
                            </Container>
                        </Card>
                    ))} */}
                    </Row>
                </Container>
                <h2>TasteMaker Created Playlists</h2>
            </div>
        </div>
    )
}

export default UserProfile;