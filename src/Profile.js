import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, CardGroup, Navbar, Image, Modal, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import FREE from './FREE 2.png';
import PRO from './vibes.png';
import Footer from './Footer';
import crown from './crown.png';

function handleUpgradeButton(){
    window.location.assign("https://playlist-frontend-krmi.onrender.com/Upgrade")
}

export default function Profile(){
    const userAuthToken = sessionStorage.getItem("token");
    var userId = sessionStorage.getItem("userId");
    var userEmail = sessionStorage.getItem("userEmail");
    const userImg = sessionStorage.getItem("imgURL");
    const [userPro, setUserPro] = useState(false);
    console.log(userImg)
    userId = userId.replaceAll("\"","")
    useEffect(() => {
    
        const response = fetch('https://playlist-backend-6muv.onrender.comapi/users/'+ sessionStorage.getItem("userId"))
        .then(result => result.json())
        .then(data => setUserPro(data.paidMember))
        .then(console.log(userPro))
    
    }, [])
    function handleProUser(){
        if(userPro == true){
          return(
            <>
            <h1 style={{textAlign:'center'}}> <img alt='' style={{width:'2.3rem',height:'2.3rem', marginRight:'.5rem'}}src={crown}/>{userId}</h1>
            </>
          )
        }else{
            return(
                <h1>{userId} <span style={{color:"white", fontSize:"2rem", textShadow: '0 0 5px #808080, 0 0 10px #808080, 0 0 15px #808080'}}>FREE</span></h1>
                )
        }
      }
    return(
        
        <div>
            <div style={{width:"100%",height:"100%", textAlign:'center'}}>
                <div>
                    <Navigation/>
                </div>
                <div className="justify-content-center" style={{marginTop:"6rem", textAlign:"center" }}>
                <img src={userImg} alt='...' style={{width:'20rem',borderRadius: "10rem",height:'20rem', marginTop:'2rem', marginBottom:'2rem'}}/>
                    
                     {handleProUser()}
                     <h2>{userEmail}</h2>
                     {/* Need to make userProfile fully functional first */}
                    {/* <Button
                    style={{marginTop:"1rem"}}
                    onClick={event => window.location.assign("https://playlist-frontend-krmi.onrender.comUser/"+userId)}>View public Profile</Button> */}
                    
                </div>
                <div style={{textAlign:"center", marginTop:"1rem"}}>
                    <Button onClick={event => handleUpgradeButton()}>Manage Account</Button>
                </div>
                <div style={{marginTop:"7rem"}}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}