import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';

const CLIENT_ID = "46a1cee5d9084a10876b12abb9c51208";
const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";

function Navigation() {
  const userAuthToken = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("userId");
  const userImg = sessionStorage.getItem("imgURL");
  console.log(userImg)
  const [accessToken, setAccessToken] = useState("");

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

  //for user image and etc... 
  // function userInfo(){
  //   var userParameters = {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + userAuthToken
  //     }
  //   }
  //   var userData = fetch('https://api.spotify.com/v1/users/' + userId,userParameters)
  //   .then(response => response.json())
  //   // .then(data => { console.log(data.images[0].url)
  //   .then(data => { setUserImg(data.images[0].url)
  //   })
  // }
  // userInfo()
  return (
    
    <div>
      <Navbar bg="dark" variant="dark">
      
        <Container>
        <img src={userImg} className="img-thumbnail" alt='...' style={{width:'5rem',height:'5rem',marginRight:'2rem'}}/>
          <Navbar.Brand href="/Home">Tastemakers</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Create">Create</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <br />
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </div>
  );
}

export default Navigation;