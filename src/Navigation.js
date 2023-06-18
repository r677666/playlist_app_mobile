import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import companyImg from '../src/Tastemakers Basic Logo.png'
import crown from './crown.png';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const CLIENT_ID = "46a1cee5d9084a10876b12abb9c51208";
const CLIENT_SECRET = "af917974b69544beb3c66ec1045f1f73";

function Navigation() {
  const userAuthToken = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("userId");
  const userImg = sessionStorage.getItem("imgURL");
  const [accessToken, setAccessToken] = useState("");
  const [userPro, setUserPro] = useState(false);

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

    const response = fetch('https://playlist-backend-6muv.onrender.com/api/users/'+userId)
      .then(result => result.json())
      .then(data => setUserPro(data.paidMember))
      .then(console.log(userPro))

  }, [])

  function handleNavPic(){
    window.location.assign("https://www.tastemakers.pro/Account")
  }

  function handleProUser(){
    if(userPro == true){
      return(
        <>
        <img className="d-inline-block align-top" alt='' style={{width:'2.3rem',height:'2.3rem', marginRight:'.5rem', marginLeft:'20rem'}}src={crown}/>
        <img onClick={event => handleNavPic()} src={userImg} className="d-inline-block align-top" alt='...' style={{width:'5rem',height:'5rem',borderRadius: "8rem"}}/>
        </>
      )
    }else{
      return(
        <img src={userImg} className="d-inline-block align-top" alt='...' style={{width:'5rem',height:'5rem',borderRadius: "8rem", marginLeft:'22.75rem'}}/>
      )
    }
  }

  return (
    <div>
        <Navbar expand="md"
        style={{backgroundSize: "0", backgroundColor: "#000000", top:"0",
         position:"fixed",zIndex:"999", width:"100%"}} 
         variant="dark">
          <Container>
          <img src={companyImg} className="img-circle" alt='...' style={{width:'5rem',height:'5rem'}}/>
          <h1 style={{color:"orange", fontSize:"1.25rem", marginRight:"1rem", marginTop:"1vh"}}>BETA</h1>
            <Navbar.Brand href="/Home">TASTEMAKERS</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className="me-auto">
                <Nav.Link href="/Home">Home</Nav.Link>
                <Nav.Link href="/Create">Create</Nav.Link>
                <Nav.Link href="/Competition">Competition</Nav.Link>
                <Nav.Link href="/Account">Account</Nav.Link>
                <Nav.Link href="/Logout">Logout</Nav.Link>
                <Nav.Link href="/Upgrade" style={{
                  color:"#FFD700",
                  textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 55px #FFD700, 0 0 75px #FFD700"}}>PRO</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <NavbarCollapse>
            {handleProUser()}
            {/* <img className="d-inline-block align-top" style={{width:'2.3rem',height:'2.3rem', marginRight:'.5rem'}}src={crown}/> */}
            {/* <img src={userImg} className="d-inline-block align-top" alt='...' style={{width:'5rem',height:'5rem',borderRadius: "8rem"}}/> */}
            
            </NavbarCollapse>
          </Container>
          
        </Navbar>
    </div>
    
  );
}

export default Navigation;