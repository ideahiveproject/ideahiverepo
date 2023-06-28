import React from 'react'
import Header from './Navbar/Header'
import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.css';
import teamMember1 from './assets/bg9.png';
import teamMember2 from './assets/bg9.png';
import teamMember3 from './assets/bg9.png';
import teamMember4 from './assets/bg9.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';


const About = () => {
  return (
    <div>
      <Header/>
      <div className="hero-section">
        <h1>Welcome to She Tech</h1>
        <p>A group of talented female software engineers on a mission to transform the tech industry.</p>
      </div>
      <Container className="mt-5">
        <Row>
          <Col>
            <p>Our team is made up of innovators, problem solvers, and creative thinkers who are passionate about using technology to make a positive impact on the world. At She Tech, we're not just building software. We're building a movement. A movement that values diversity, collaboration, and creativity. A movement that challenges the status quo and pushes the boundaries of what's possible. Whether we're designing user interfaces, writing code, or leading teams, we're always striving to make a difference and leave our mark on the world.</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>Meet the Team</h2>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3} className="text-center">
            <Image src={teamMember1} className="profile-image" roundedCircle />
            <h4> Rediet</h4>
            <p> Back End</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in//" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://github.com/" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <Image src={teamMember2} className="profile-image" roundedCircle />
            <h4> Merbebt</h4>
            <p>Front End</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in//" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://github.com/" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <Image src={teamMember3} className="profile-image" roundedCircle />
            <h4>Etsub</h4>
            <p>Back End</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in//" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://github.com/" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </Col>
          <Col md={3} className="text-center">
            <Image src={teamMember4} className="profile-image" roundedCircle />
            <h4>Beti </h4>
            <p>  Front End</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in//" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="https://github.com/" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default About



