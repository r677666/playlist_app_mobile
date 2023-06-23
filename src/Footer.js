import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import mainLogo from '../src/Tastemakers Main Logo (1).png'

export default function Footer() {
  return (
    <div style={{backgroundColor:"#FFFCFC"}}>
    <MDBFooter bgColor='#ff914d' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <img src={mainLogo} style={{maxWidth:"10rem", marginBottom:"2rem"}} />
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Tastemakers
              </h6>
              <p>
                Get paid to Play(list)
              </p>
              
            </MDBCol>

            <MDBCol md="1" lg="2" xl="1" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/Home' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='/Competition' className='text-reset'>
                  Competition
                </a>
              </p>
              <p>
                <a href='/Account' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='mailto:tastemakers.official.llc@gmail.com' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="2" lg="3" xl="2" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-3'>Contact</h6>
              <p>
                {/* <MDBIcon icon="home" className="me-3" /> */}
                Delaware, OH, 43015
              </p>
              <p>
                {/* <MDBIcon icon="envelope" className="me-3" /> */}
                tastemakers.official.llc@gmail.com
              </p>
              {/* <p> */}
                {/* <MDBIcon icon="phone" className="me-3" />  */}
                {/* + 614 271 1109 */}
              {/* </p> */}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: '#ff914d' }}>
        © 2023 Copyright:    
        <a className='text-reset fw-bold' href='https://www.tastemakers.pro/'>
          TasteMakers.pro
        </a>
      </div>
    </MDBFooter>
    </div>
  );
}