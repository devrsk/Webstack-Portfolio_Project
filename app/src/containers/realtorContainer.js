import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import Footer from './footer';
import AgentLayout from '../components/agentFinder/agentLayout';
import { RealtorContext } from '../context/realtorContext';
import { BuyLayout } from '../components/export';
import RealtorCard from '../containers/realtorcard';
import RealtorImg from '../img/realtorPic.jpeg';

function RealtorContainer() {
  const [searchTermName, setSearchTermName] = useState('');
  const [searchTermLocation, setSearchTermLocation] = useState('');
  const { find_result, find_name } = useContext(RealtorContext);

  const conditionalRealtor =
    searchTermName === '' && searchTermLocation === '' ? (
      <React.Fragment>
        <AgentLayout.FirstSection>
          <p>
            <strong>Find an Agent.</strong>
          </p>
          <p></p>
          <p>
            Get started by entering your Zipcode or you can use the search on the right to Find an agent by Name. 
          </p>
          <img src={RealtorImg} width="800px" alt="Realtor" />
        </AgentLayout.FirstSection>
      </React.Fragment>
    ) : (
      <RealtorCard />
    );

  return (
    <React.Fragment>
      <div className="HomeList-grid-container">
        <div style={{ width: '80%', margin: 'auto' }}>
          <Row>
            <Col className="w-25">
              <BuyLayout.Search
                searchTerm={searchTermName}
                setSearchTerm={setSearchTermName}
                find_result={find_result}
                placeholder="ZipCode"
              />
            </Col>
            <Col className="w-25">
              <BuyLayout.Search
                searchTerm={searchTermLocation}
                setSearchTerm={setSearchTermLocation}
                find_result={find_name}
                placeholder="Name"
              />
            </Col>
          </Row>
        </div>
        {conditionalRealtor}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default RealtorContainer;