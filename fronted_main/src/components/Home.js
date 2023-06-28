import React from 'react'
// import Header from './Header'
import { Container, Row, Col, Image } from "react-bootstrap";
import cartoon1 from "./assets/investment.png";
import cartoon2 from "./assets/dynamic.png";
import cartoon3 from "./assets/empowerment.png";
import cartoon4 from "./assets/acc.png";
import cartoon5 from "./assets/help.png";

import cartoon6 from "./assets/inovation.png";
import cartoon7 from "./assets/partner4.png";
import cartoon8 from "./assets/communication.png";

import bgImage from "./assets/bg9.png";
import "./styles.css";
import Header from './Navbar/Header';


const Home = () => {

  return (
    <div>
      <Header/>





      {/* <div className="video-background">
      <YouTube videoId="GvBgPBVcjEM" opts={opts} onReady={handlePlayerReady} />
      {isReady && (
        <div className="content">
          <h1>Hello World</h1>
          <p>This is a video background example in React</p>
        </div>
      )}
    </div> */}




      {/* <div className="video-background">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=GvBgPBVcjEM"
        playing
        muted
        loop
        width="100%"
        height="100%"
      />
      <div className="content">
        <h1>Hello World</h1>
        <p>This is a video background example in React</p>
      </div>
    </div> */}


      <div className="bg-image"  style={{ backgroundImage: `url(${bgImage})`, width: "100%",height:"600px" }}>
        <div className="bg-overlay">
          <Container>
            <Row className="justify-content-center text-right">
              <Col>
                <h1 className="display-3 text-black mt-3 mb-4 justify-content-right text-right">
                  Why post pictures when you can post ideas?
                </h1>
              </Col>
            </Row>
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <p className="lead text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  auctor, elit at posuere tristique, elit velit tincidunt lacus,
                  vel eleifend ligula enim vel magna. Etiam congue velit quis
                  nisi malesuada, vel gravida quam faucibus.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

  

<Container className="mt-5">
  <Row className="justify-content-center text-center">
    <Col md={5}>
      <h2 className="mb-4">Our Features</h2>
    </Col>
  </Row>
  <Row className="justify-content-center text-center">
    <Col md={2} className="d-flex flex-column feature-item">
      <Image src={cartoon1} fluid className="mb-2" />
      <h4>I</h4>
      <p>
        Investment Opportunities:<br></br>
         IDEAHIVE offers a wealth of investment opportunities for investors looking to grow their portfolios and support innovative ideas.
      </p>
    </Col>
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon2} fluid className="mb-2" />
      <h4>D</h4>
      <p>
        Dynamic Dashboard:<br></br>
         IDEAowners can easily manage their ideas and track their progress using IDEAHIVE's dynamic dashboard.
      </p>
    </Col>
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon3} fluid className="mb-2" />
      <h4>E</h4>
      <p>
        Empowered IDEAowners:<br></br>
         IDEAHIVE empowers IDEAowners by providing them with the tools and resources 
         they need to refine their ideas and make them more attractive to investors.
      </p>
    </Col>
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon4} fluid className="mb-2" />
      <h4>A</h4>
      <p>
        Accessible Support:<br></br>
         IDEAHIVE provides accessible support to both IDEAowners and investors.
      </p>
    </Col>
  </Row>
  <Row className="justify-content-center text-center">
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon5} fluid className="mb-2" />
      <h4>H</h4>
      <p>
        Helpful Community: <br></br>
        IDEAHIVE's community of IDEAowners and investors is supportive and collaborative, providing valuable feedback and insights to help ideas flourish.
      </p>
    </Col>
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon6} fluid className="mb-2" />
      <h4>I</h4>
      <p>
        Innovative Ideas:<br></br>
         IDEAHIVE is a hub for innovative ideas, with a diverse range of concepts spanning industries and sectors.
      </p>
    </Col>
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon7} fluid className="mb-2" />
      <h4>V</h4>
      <p>
        Valuable Partnerships: 
        <br></br>IDEAHIVE helps foster valuable partnerships between IDEAowners and investors, forming connections that can lead to long-term success.
      </p>
    </Col>
    <Col md={3} className="d-flex flex-column feature-item">
      <Image src={cartoon8} fluid className="mb-2" />
      <h4>E</h4>
      <p>
        Effective Communication:
        <br></br> IDEAHIVE facilitates effective communication between IDEAowners and investors, ensuring that both parties are on the same page and can work together seamlessly.
      </p>
    </Col>
  </Row>
</Container>





        <Row className="mt-5">
          <Col md={4} className="order-md-2">
            <h3>Benefits of Posting Ideas</h3>
            <ul>
              <li>Benefit 1</li>
              <li>Benefit 2</li>
              <li>Benefit 3</li>
              <li>Benefit 4</li>
              <li>Benefit 5</li>
            </ul>
          </Col>
          {/* <Col md={4}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor, elit at posuere tristique, elit velit tincidunt lacus, vel
              eleifend ligula enim vel magna. Etiam congue velit quis nisi
              malesuada, vel gravida quam faucibus. In hac habitasse platea
              dictumst. Aliquam erat volutpat. Suspendisse potenti. Sed auctor,
              elit at posuere tristique, elit velit tincidunt lacus, vel
              eleifend ligula enim vel</p>
              </Col> */}
              </Row>
          {/* </Container> */}
          <div id="sidebar">
  <h4>Slide 6: How to post your idea on IdeaPost</h4>
  <p>"Posting your idea on IdeaPost is easy and free!"</p>
  <ol>
    <li>Step 1: "Create an account and fill out your profile"</li>
    <li>Step 2: "Write a catchy headline and a brief description of your idea"</li>
    <li>Step 3: "Add tags and categories to help users find your idea"</li>
    <li>Step 4: "Wait for interested investors to contact you!"</li>
  </ol>
</div>

 </div>
  )
}

export default Home;


    