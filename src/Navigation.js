import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import companyImg from '../src/Tastemakers Basic Logo.png'

const CLIENT_ID = "46a1cee5d9084a10876b12abb9c51208";
const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";

function Navigation() {
  const userAuthToken = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("userId");
  const userImg = sessionStorage.getItem("imgURL");
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

  return (
    <div>
        <Navbar style={{backgroundSize: "0", backgroundColor: "#000000", top:"0",
         position:"fixed",zIndex:"999", width:"100%"}} variant="dark">
          <Container>
          <img src={companyImg} className="img-circle" alt='...' style={{width:'5rem',height:'5rem',marginRight:'2rem'}}/>
            <Navbar.Brand href="/Home">Tastemakers</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/Create">Create</Nav.Link>
              <Nav.Link href="/competition">Competition</Nav.Link>
              <Nav.Link href="/Account">Account</Nav.Link>
              <Nav.Link href="/Logout">Logout</Nav.Link>
              
            </Nav>
            <img src={userImg} className="img-circle" alt='...' style={{width:'5rem',height:'5rem',marginRight:'2rem'}}/>
          </Container>
          
        </Navbar>
    </div>
    
  );
}

export default Navigation;