import React, { useEffect, useContext } from 'react';
import { Housecard, Profile } from '../../components/export';
import DefaultImg from '../../img/homeicon.png';
import * as ROUTES from '../../constants/routes';
import { Context } from '../../context/housesContext';
import { RentContext } from '../../context/rentContext';
import Loading from '../../containers/LoadingContainer';

function SaveHome() {
  const { houses, favorite, removeFavorite } = useContext(Context);
  const { rentHouses, rentFavorite, removeRentFavorite } = useContext(RentContext);

  function singlecard(obj, type) {
    const conditional_Remove_Favorite_Function = type === 'S' ? removeFavorite : removeRentFavorite;
    const IMAGE_LINK = `${type === 'S' ? ROUTES.BUY : ROUTES.RENT}/${type === 'S' ? obj.S_ID : obj.R_ID}`;
    const icon = <Housecard.Favorite removeFavorite={conditional_Remove_Favorite_Function} house={obj} type={type} />;
    return (
      <Housecard.Base key={type === 'S' ? obj.S_ID : obj.R_ID}>
        <Housecard.ImageContainer>
          {icon}
        </Housecard.ImageContainer>
        <Housecard.Link to={IMAGE_LINK}>
          <Housecard.Content>
            <Housecard.ImageContainer>
              <Housecard.img src={obj.main_dir ? obj.main_dir : DefaultImg} alt="#" />
            </Housecard.ImageContainer>
            <Housecard.TextContainer>
              <Housecard.Title>
                <p style={{ display: 'inline', color: '#ff8286' }}>{obj.property_type}</p>
                {type === 'S' ? 'For Sale' : 'For Rent'}
              </Housecard.Title>
              <Housecard.Price>{obj.price ? obj.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : null}</Housecard.Price>
              <Housecard.Text>
                <p style={{ display: 'inline', color: '#525252', fontWeight: '600', fontSize: '1rem' }}>{obj.city}</p>
                {obj.state}
              </Housecard.Text>
              <Housecard.Text>{obj.street}</Housecard.Text>
              <Housecard.TextControl>
                <Housecard.NormalText>
                  {obj.bedroom}
                  <p style={{ display: 'inline', color: 'black', fontWeight: '500' }}>bds</p>
                </Housecard.NormalText>
                <Housecard.NormalText>
                  {obj.bathroom}
                  <p style={{ display: 'inline', color: 'black', fontWeight: '500' }}>ba</p>
                </Housecard.NormalText>
                <Housecard.NormalText>
                  {obj.area}
                  <p style={{ display: 'inline', color: 'black', fontWeight: '500' }}>sqft</p>
                </Housecard.NormalText>
              </Housecard.TextControl>
            </Housecard.TextContainer>
          </Housecard.Content>
        </Housecard.Link>
      </Housecard.Base>
    );
  }

  useEffect(() => {
    // fetch user favorite table here
    // fetch(Save_Home).then(response=>response.json()).then(result=>setHouses(result.list))
  }, []);

  if (houses && rentHouses) {
    const cards = houses.map((house) => {
      if (favorite) {
        const A = favorite.find((index) => house.S_ID === index.properity_id && index.home_type === 'h');
        if (A) {
          const B = houses.find((index) => index.S_ID === A.properity_id);
          return singlecard(B, 'S');
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

    const rentcards = rentHouses.map((house) => {
      if (rentFavorite) {
        const A = rentFavorite.find((index) => house.R_ID === index.properity_id && index.home_type === 'r');
        if (A) {
          const B = rentHouses.find((index) => index.R_ID === A.properity_id);
          return singlecard(B, 'R');
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

    if (cards && rentcards) {
      return (
        <Profile>
          <Profile.Text>
            Saved Homes
          </Profile.Text>
          <Profile.CardsContainer>
            {cards}
            {rentcards}
          </Profile.CardsContainer>
        </Profile>
      );
    } else {
      return (
        <Profile>
          <Profile.Text>
            Oops, you don't have any favorited homes yet.
          </Profile.Text>
        </Profile>
      );
    }
  } else if (rentHouses) {
    const rentcards = rentHouses.map((house) => {
      if (rentFavorite) {
        const A = rentFavorite.find((index) => house.R_ID === index.properity_id && index.home_type === 'r');
        if (A) {
          const B = rentHouses.find((index) => index.R_ID === A.properity_id);
          return singlecard(B, 'R');
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

    if (rentcards[0] !== undefined) {
      return (
        <Profile>
          <Profile.Text>
            Saved Homes
          </Profile.Text>
          <Profile.CardsContainer>
            {rentcards}
          </Profile.CardsContainer>
        </Profile>
      );
    } else {
      return (
        <Profile>
          <Profile.Text>
            Oops, you don't have any favorited homes yet.
          </Profile.Text>
        </Profile>
      );
    }
  } else if (houses) {
    const cards = houses.map((house) => {
      if (favorite) {
        const A = favorite.find((index) => house.S_ID === index.properity_id && index.home_type === 'h');
        if (A) {
          const B = houses.find((index) => index.S_ID === A.properity_id);
          return singlecard(B, 'S');
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

    if (cards[0] !== undefined) {
      return (
        <Profile>
          <Profile.Text>
            Saved Homes
          </Profile.Text>
          <Profile.CardsContainer>
            {cards}
          </Profile.CardsContainer>
        </Profile>
      );
    } else {
      return (
        <Profile>
          <Profile.Text>
            Oops, you don't have any favorited homes yet.
          </Profile.Text>
        </Profile>
      );
    }
  } else {
    return <Loading />;
  }
}

export default SaveHome;