import { Housecard } from '../components/export';
import React, { useContext } from 'react';
import DefaultImg from '../img/homeicon.png';
import * as ROUTES from '../constants/routes';
import { Context } from '../context/housesContext';

function Housecards({ props }) {
  const { houses, search, favorite, addFavorite, removeFavorite } = useContext(Context);

  function singlecard(obj, favorite) {
    const type = 'S';
    const icon = favorite ? (
      <Housecard.Favorite removeFavorite={removeFavorite} house={obj} type={type} />
    ) : (
      <Housecard.NotFavorite addFavorite={addFavorite} house={obj} />
    );

    return (
      <Housecard.Base key={obj.S_ID}>
        <Housecard.ImageContainer>{icon}</Housecard.ImageContainer>
        <Housecard.Link to={`${ROUTES.BUY}/${obj.S_ID}`}>
          <Housecard.Content>
            <Housecard.ImageContainer>
              <Housecard.img src={obj.main_dir ? obj.main_dir : DefaultImg} alt="#" />
            </Housecard.ImageContainer>
            <Housecard.TextContainer>
              <Housecard.Title>
                <p style={{ display: 'inline', color: '#ff8286' }}>{obj.property_type}</p> For Sale
              </Housecard.Title>
              <Housecard.Price>
                {obj.price ? obj.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null}
              </Housecard.Price>
              <Housecard.Text>
                <p style={{ display: 'inline', color: '#525252', fontWeight: '600', fontSize: '1rem' }}>
                  {obj.city}
                </p>{' '}
                {obj.state}
              </Housecard.Text>
              <Housecard.Text>{obj.street}</Housecard.Text>
              <Housecard.TextControl>
                <Housecard.NormalText>
                  {obj.bedroom} <p style={{ display: 'inline', color: 'black', fontWeight: '500' }}>bds</p>
                </Housecard.NormalText>
                <Housecard.NormalText>
                  {obj.bathroom} <p style={{ display: 'inline', color: 'black', fontWeight: '500' }}>ba</p>
                </Housecard.NormalText>
                <Housecard.NormalText style={{ borderRight: '0' }}>
                  {obj.area} <p style={{ display: 'inline', color: 'black', fontWeight: '500' }}>sqft</p>
                </Housecard.NormalText>
              </Housecard.TextControl>
            </Housecard.TextContainer>
          </Housecard.Content>
        </Housecard.Link>
      </Housecard.Base>
    );
  }

  if (houses && !search) {
    const cards = houses.map((house) => {
      if (favorite !== undefined && favorite) {
        const checkFavorite = favorite.find(
          (item) => item.properity_id === house.S_ID && item.home_type === 'h'
        );
        const A = checkFavorite ? true : false;
        return singlecard(house, A);
      } else {
        const C = false;
        return singlecard(house, C);
      }
    });
    return (
      <>
        <Housecard>{cards}</Housecard>
      </>
    );
  } else if (houses && search) {
    if (search.length === 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Housecard.Error>No Data in Data Base</Housecard.Error>
        </div>
      );
    } else if (search.length !== 0) {
      const cards = search.map((house) => {
        if (favorite !== undefined && favorite) {
          const checkFavorite = favorite.find((item) => item.properity_id === house.S_ID);
          const A = checkFavorite ? true : false;
          return singlecard(house, A);
        } else {
          const C = false;
          return singlecard(house, C);
        }
      });
      return (
        <>
          <Housecard>{cards}</Housecard>
        </>
      );
    }
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <Housecard.Error>No Data in Data Base</Housecard.Error>
      </div>
    );
  }
}

export default Housecards;