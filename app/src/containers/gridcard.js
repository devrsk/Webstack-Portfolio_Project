import React from 'react';
import { Gridcard } from '../components/export';
import DefaultImg from '../img/homeicon.png'
import * as ROUTES from '../constants/routes'
function GridcardContainer(props) {
    return(
        <Gridcard>
            <Gridcard.Base>
                <Gridcard.img src = {DefaultImg} alt = "#">
                    </Gridcard.img>
                <Gridcard.Title>Buy a home</Gridcard.Title>
                <Gridcard.Text>Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</Gridcard.Text>
                <Gridcard.Button to = {ROUTES.BUY}>Search homes</Gridcard.Button>
            </Gridcard.Base>
            <Gridcard.Base>
                <Gridcard.img src = {DefaultImg} alt = "#">
                    </Gridcard.img>
                <Gridcard.Title>Sell a home</Gridcard.Title>
                <Gridcard.Text>Whether you sell with new Zillow Offers™ or take another approach, we’ll help you navigate the path to a successful sale.</Gridcard.Text>
                <Gridcard.Button to = {ROUTES.SELL}>See your options</Gridcard.Button>
            </Gridcard.Base>
            <Gridcard.Base>
                <Gridcard.img src = {DefaultImg} alt = "#">
                    </Gridcard.img>
                <Gridcard.Title>Rent a home</Gridcard.Title>
                <Gridcard.Text>We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</Gridcard.Text>
                <Gridcard.Button to = {ROUTES.RENT}>Find rentals</Gridcard.Button>
            </Gridcard.Base>
        </Gridcard>
    )
}

export default GridcardContainer