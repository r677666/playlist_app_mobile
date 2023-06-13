import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Stack, Card, CardGroup, Navbar, Image, Modal, Col, Collapse, Accordion } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import crown from './crown.png';
import goldOk from './gold_ok.png';
import grayOk from './gray_ok.png'
import { Link } from 'react-router-dom';
// import Stripe from "stripe";

export default function Upgrade(){
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');
    const [userPro, setUserPro] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const stripe = new Stripe("sk_test_51Mdh79DtWk2E47D2T8ZzQnNWdiE1mXZETGEtr5kmP0TXKE1D4E0IB2xD8OXd0LIMeVLxIwydqJhBRJpuhFwbKfLS00YhbtWKpA");
    // const [customer, setCustomer] = useState(null);

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
      }, []);

      useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get('success')) {
          setSuccess(true);
          setSessionId(query.get('session_id'));
          updateUserProStatus()
        }
    
        if (query.get('canceled')) {
          setSuccess(false);
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }

        // useEffect(() => {
        //   stripe.customers.list({ email })
        //     .then((customers) => {
        //       if (customers.data.length > 0) {
        //         setCustomer(customers.data[0]);
        //       }
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //     });
        // }, [email]);

        function updateUserProStatus(){
            // console.log("TESTING SUCCESSFUL")
            // const changeUserProStatus = async () => {
                const response = fetch('http://localhost:8000/api/users/updateProStatus',{
                    method: 'PATCH',
                    body: JSON.stringify({
                      "userId": sessionStorage.getItem("userId"),
                      "paidMember":true
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(response => console.log(response.json()))
                  .then(console.log("Success Scription in DB"))
                // .then(console.log(compSubmissions[0].playlistsId))
            // }
        }
        function successOrMessage(){
            if (!success && message === '') {
              return console.log("Failed to Subscribe")
            } else if (success && sessionId !== '') {
              return handleShow()
            } else {
              return <Message message={message} />;
            }
          }
          successOrMessage();
      }, [sessionId]);

      useEffect(() => {
    
        const response = fetch('http://localhost:8000/api/users/'+ sessionStorage.getItem("userId"))
        .then(result => result.json())
        .then(data => setUserPro(data.paidMember))
        .then(console.log(userPro))
    
    }, [])
    
      const Message = ({ message }) => (
        <section>
          <p>{message}</p>
        </section>
      );
    function handleWindowSize(){
        if(windowSize.width < 765){
            return 'vertical'
        }else{
            return 'horizontal'
        }
    }
    function handleCardSize(){
        if(windowSize.width < 765){
            return '30rem'
        }else{
            return '30rem'
        }
    }
    function handleManageButton(){
    //  window.location.assign("https://billing.stripe.com/p/login/test_eVaaFXcPrayi6hWcMM")
    window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSeh8SZ2oHX19Es-thaSu5ijEPDyOYQGR4QMbgt5wvnE5e-KRQ/viewform?vc=0&c=0&w=1&flr=0")
    }
    function handleProUser(){
      if(userPro == true){
        return(
            <div>
              {/* <form action="/create-portal-session" method="POST">
                    <input
                      type="hidden"
                      id="session-id"
                      name="session_id"
                      value={sessionId}
                    /> */}
                  <Button
                  onClick={event => handleManageButton()}
                  id="create-customer-portal-session" type="submit" 
                  style={{marginBottom:".25rem", color:"#ff914d",backgroundColor:"black", borderColor:"black", paddingLeft:"2rem",paddingRight:"2rem",marginTop:'.75rem'}}
                  >
                  Manage
                      
                  </Button>
                  {/* </form> */}
            </div>
        )
      }else{
          return(
            <form action="/create-checkout-session" method="POST">
                                {/* Add a hidden field with the lookup_key of your Price */}
                                <input type="hidden" name="lookup_key" value="proMembership" />
                                <Button
                                id="checkout-and-portal-button" type="submit"
                                style={{marginBottom:".25rem", color:"#ff914d",backgroundColor:"black", borderColor:"black", paddingLeft:"2rem",paddingRight:"2rem",marginTop:'.75rem'}}
                                >
                                    Upgrade
                                </Button>
                                </form>
          )
      }
    }
    return(
        <div>
            <Navigation/>
            <h1 style={{marginTop:"8rem",textAlign:"center", marginBottom:"2.5rem"}}> Upgrade To PRO </h1>
            <div>
            <Container className='d-flex justify-content-center text-center'>
                <Stack direction={handleWindowSize()}>
                    <Card style={{width:handleCardSize(),height:'32rem', paddingTop:'.5rem', marginRight:'1rem',borderRadius: "1rem",backgroundColor:'black',borderColor:'#dbdbdb', marginLeft:'1rem'}}>
                            <Card.Title style={{fontSize:'2rem', color:'orange'}}>Free</Card.Title>
                        <hr style={{marginBottom: '0', marginTop:'1rem'}}/>
                            <Card.Body className='text-center' style={{backgroundColor:'white'}}> 
                                <Card.Text style={{marginTop:'1rem', fontSize:'2rem'}}>
                                {/* This is here for design consistency */}
                                    $0 / month
                                </Card.Text>
                                <Card.Text>
                                    <img src={grayOk} alt='...'/>
                                    Ability to View Other's created playlist
                                </Card.Text>
                                <Card.Text>
                                    <img src={grayOk} alt='...'/>
                                    Access to Playlist Creation
                                </Card.Text>
                                <Card.Text>
                                    <img src={grayOk} alt='...'/>
                                    Created Playlist Added to Spotify Account
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    <Card style={{display:'center',width:'30rem',height:'32rem', paddingTop:'1rem',borderRadius: "1rem", backgroundColor:'black',borderColor:'#dbdbdb'}}>
                        <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <img style={{width:'2.3rem',height:'2.3rem', marginRight:'.5rem'}}src={crown}/>
                        <Card.Title style={{fontSize:'2rem', marginTop:'.35rem', marginBottom:'.25rem',color:"#FFD700", marginRight:'1.5rem',fontSize:'2rem',
                        textShadow: "0 0 0px #fff, 0 0 1px #fff, 0 0 5px #fff, 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 55px #FFD700, 0 0 75px #FFD700"
                        }}>PRO</Card.Title>
                        </Container>
                     <hr style={{marginBottom: '0', marginTop:'1rem'}}/>
                     <Card.Body className='text-center' style={{backgroundColor:'white'}}>
                                <Card.Text style={{marginTop:'1rem', fontSize:'2rem'}}>
                                    $4.99 / month
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Removes Ads from the Website
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Submit to Weekly Competition
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Vote for next Artist and/or Playlist Genre
                                </Card.Text>
                                <Card.Text>
                                    <img src={goldOk}/>
                                    Chance to Win the Golden Vinyl
                                </Card.Text>
                                
                                {handleProUser()}
                            </Card.Body>
                     </Card>
                </Stack>
            </Container>
            </div>
            <div style={{marginTop:'4rem'}}>
                <Footer/>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body> Successful, Welcome to Tastemakers</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}