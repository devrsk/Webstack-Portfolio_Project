
import React,{useState,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Footer from "./footer"
import AgentLayout from '../components/agentFinder/agentLayout'
import { RealtorContext } from '../context/realtorContext';
import { BuyLayout } from '../components/export';
import RealtorCard from '../containers/realtorcard'
import RealtorImg from '../img/realtorPic.jpeg'

function RealtorContainer() {
    const [searchTermName, setSearchTermName] = useState('');
    const [searchTermLocation, setSearchTermLocation] = useState('');
    const {find_result, find_name} = useContext(RealtorContext)
    // const realtors = "unknown";

    const conditionalRealtor = (searchTermName==='' && searchTermLocation==='') ? 
    <>
    <AgentLayout.FirstSection>
    <p><strong>Find agents in your area.</strong></p>
    <p></p>
    <p>To get started, enter your location or search for a specific agent by name.</p>
    <img src={RealtorImg} width="400px"></img>
    </AgentLayout.FirstSection> </>: <RealtorCard/>; {/*<RealtorCard />; */}
    
    // console.log(searchTermName==='' && searchTermLocation==='')
    return (
        <>
        <div className="HomeList-grid-container">
            <div  style={{width: "80%", margin: "auto"}}>
                <Row>
                    <Col className="w-25">
                        <BuyLayout.Search searchTerm={searchTermName} setSearchTerm={setSearchTermName} find_result = {find_result} placeholder="ZipCode"/>
                    </Col>
                    <Col className="w-25">
                        <BuyLayout.Search searchTerm={searchTermLocation} setSearchTerm={setSearchTermLocation} find_result = {find_name} placeholder="Name"/>
                    </Col>
                </Row>
            </div>
            {conditionalRealtor}
        </div>
        <Footer/>
    </>
    )
}
export default RealtorContainer