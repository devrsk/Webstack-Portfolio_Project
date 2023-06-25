import React, { Component } from 'react';
import { Card, Badge, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import SellLayout from '../components/sell/sell';
import DefaultImg from '../img/homeicon.png';
import Footer from '../containers/footer';

class Sell extends Component {
  render() {
    return (
      <div style={{ height: 'calc(100% - 90px)', marginBottom: '30vh' }}>
        <SellLayout.Notice style={{ marginBottom: '2rem' }}>
          <img src={DefaultImg} alt="Paris" />
          <p>
            <strong>Your Safety First: Our Pledge to Protect Customers, Communities, and Employees</strong>
          </p>
          <p>
          At our core, safety is paramount. Whether we're presenting an enticing offer for your home or facilitating connections with trusted agents, our unwavering commitment revolves around safeguarding the well-being of our valued customers, fostering secure communities, and protecting the welfare of our dedicated employees.
          </p>
        </SellLayout.Notice>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ textAlign: 'center' }}>
          <Badge variant="secondary">SELL</Badge> with confidence 
          </h1>
          <h5 style={{ textAlign: 'center' }}>
          Unlock Simplicity and Safety: PropertyPro's Solution for Effortless Home Selling and Smooth Transitions.
          </h5>
        </div>

        <Container>
          <Row style={{ textAlign: 'center' }}>
            <Col md={6} style={{ marginBottom: '2rem' }}>
              <Card style={{ width: '100%' }}>
                <Card.Header>Agent</Card.Header>
                <Card.Body>
                  <Card.Title>Work with an agent</Card.Title>
                  <Card.Text style={{ margin: '2rem auto' }}>
                    Unlocking Excellence: Choose Your Perfect Real Estate Partner with PropertyPro Agents.
                  </Card.Text>
                  <Button variant="outline-primary">
                    <Link to="/agentfinder">Search now</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} style={{ marginBottom: '2rem' }}>
              <Card style={{ width: '100%' }}>
                <Card.Header>Sell</Card.Header>
                <Card.Body>
                  <Card.Title>Sell it yourself</Card.Title>
                  <Card.Text style={{ margin: '2rem auto' }}>
                    Expand Your Reach: Gain Maximum Exposure for Your Property with a Complimentary PropertyPro Listing, Reaching a Vast Audience of Potential Buyers.
                  </Card.Text>
                  <Button variant="outline-primary">
                    <Link to={ROUTES.SELL_OWNER}>Create a Listing</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Sell;