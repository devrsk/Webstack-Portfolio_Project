import React, { Component } from 'react'
import {Card, Badge, Button, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import *as ROUTES from '../constants/routes'
import SellLayout from '../components/sell/sell'
import DefaultImg from '../img/homeicon.png'
import Footer from "../containers/footer"
export class Sell extends Component {

    render() {
        return (
            <>
            <div style ={{height :"calc(100% - 90px)", marginBottom:"30vh"}}> 
                <SellLayout.Notice style ={{marginBottom :"2rem"}}>
                    <img src={DefaultImg} alt="Paris"/>
                    <p><strong>Our commitment to safety</strong></p>
                    <p>Whether we're making an offer on your home or connecting you with an agent, we're committed to prioritizing the safety of our customers, communities and employees.</p>
                </SellLayout.Notice>
                
                <div style ={{marginBottom :"2rem"}}>
                    <h1 style={{textAlign: "center"}}>
                        Sell with confidence <Badge variant="secondary">SELL</Badge>
                    </h1>
                    <h5 style={{textAlign: "center"}}>
                        Zillow is making it simpler and safer to sell your home and move forward.
                    </h5>
                </div>
                <div>
                <Row style ={{width:"100%", textAlign:"center"}}>
                    <Col  >
                        <Card style ={{width:"75%" ,position:"relative",left:"25%"}}>
                            <Card.Header>Agent</Card.Header>
                            <Card.Body>
                                <Card.Title>Work with an agent</Card.Title>
                                <Card.Text style ={{width:"75%",margin:"2rem auto"}}>
                                Zillow Premier Agents are among the best in the business. Learn how to pick the right one for you.</Card.Text>
                                <Button variant="outline-primary"><Link to="/agentfinder">Search now</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <Card style ={{width:"75%"}}>
                        <Card.Header>Sell</Card.Header>
                        <Card.Body>
                            <Card.Title>Sell it yourself</Card.Title>
                            <Card.Text style ={{width:"75%",margin:"2rem auto"}}>
                            Reach the largest audience of shoppers with a free Zillow listing. Start by learning how to "sell for sale by owner."
                            </Card.Text>
                            <Button variant="outline-primary"><Link to={ROUTES.SELL_OWNER}>Create a listing</Link></Button>
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </div>   
            </div> 
            <Footer/> 
            </>
        )
    }
}

export default Sell
