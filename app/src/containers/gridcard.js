import React from 'react';
import { Gridcard } from '../components/export';
import DefaultImg from '../img/homeicon.png';
import * as ROUTES from '../constants/routes';

function GridcardContainer(props) {
  return (
    <Gridcard>
      <Gridcard.Base>
        <Gridcard.img src={DefaultImg} alt="#" />
        <Gridcard.Title>Buy a home</Gridcard.Title>
        <Gridcard.Text>
        Looking for your dream home? The power is in your hands. With a simple click, you'll gain access to a wide range of properties tailored to your preferences and budget. Explore and find the perfect home that matches your vision. Take the first step towards homeownership.
        </Gridcard.Text>
        <Gridcard.Button to={ROUTES.BUY}>Search homes</Gridcard.Button>
      </Gridcard.Base>
      <Gridcard.Base>
        <Gridcard.img src={DefaultImg} alt="#" />
        <Gridcard.Title>Sell your home</Gridcard.Title>
        <Gridcard.Text>
        Ready to sell your house? We offer the gateway to a hassle-free selling experience. With just a click, you can showcase your property to a vast network of realtors and potential buyers. Start your journey towards a successful sale!
        </Gridcard.Text>
        <Gridcard.Button to={ROUTES.SELL}>See your options</Gridcard.Button>
      </Gridcard.Base>
      <Gridcard.Base>
        <Gridcard.img src={DefaultImg} alt="#" />
        <Gridcard.Title>Rent a home</Gridcard.Title>
        <Gridcard.Text>
        Looking for the perfect rental home? Explore a wide range of rental properties tailored to your preferences. Discover apartments, houses, and more, with various amenities and locations to choose from. Find your ideal home and connect with landlords and realtors. Experience hassle-free renting.
        </Gridcard.Text>
        <Gridcard.Button to={ROUTES.RENT}>Find rentals</Gridcard.Button>
      </Gridcard.Base>
    </Gridcard>
  );
}

export default GridcardContainer;