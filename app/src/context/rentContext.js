import React, { useState, useEffect } from 'react';
import { DB } from '../constants/DB';

const RentContext = React.createContext();

function RentProvider({ children }) {
  const [rentHouses, setRentHouses] = useState([]);
  const [search, setSearch] = useState([]);
  const [rentFavorite, setRentFavorite] = useState([]);
  const [types, setTypes] = useState('all');
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [parking, setParking] = useState(false);
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(10000);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(3000);
  const [flooring, setFlooring] = useState('all');
  const [year, setYear] = useState('all');
  const [favorite_search_list, setFavorite_search_list] = useState();

  const Rent_Search_URL = `${DB}/rent`;
  const Rent_Favorite_URL = `${DB}/api/favorite/home`;

  const user = JSON.parse(localStorage.getItem('authUser'));
  function refreshPage() {
    window.location.reload();
  }
  useEffect(() => {
    fetch(Rent_Search_URL)
      .then((response) => response.json())
      .then((result) => {
        setRentHouses(result.dataset);
        setSearch(result.dataset);
      });

    if (user) {
      fetch(`${DB}/api/favorite/mine?id=${user.id}`)
        .then((response) => response.json())
        .then((result) => setFavorite_search_list(result.list));

      try {
        fetch(`${DB}/api/favorite/home?id=${user.id}`)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            let Favorite_List = result.list;
            setRentFavorite(Favorite_List);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    filterData();
  }, [
    rentHouses,
    types,
    bed,
    bath,
    parking,
    minRate,
    maxRate,
    minSize,
    maxSize,
    year,
    flooring,
  ]);

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;

    if (name === 'type') {
      setTypes(value);
    }
    if (name === 'bed') {
      setBed(value);
    }
    if (name === 'bath') {
      setBath(value);
    }
    if (name === 'minRate') {
      setMinRate(value);
    }
    if (name === 'maxRate') {
      setMaxRate(value);
    }
    if (name === 'minSize') {
      setMinSize(parseInt(value));
    }
    if (name === 'maxSize') {
      setMaxSize(parseInt(value));
    }
    if (name === 'flooring') {
      setFlooring(value);
    }
    if (name === 'year') {
      setYear(value);
    }
    if (name === 'parking') {
      setParking(value);
    }
  }

  function filterData() {
    if (!rentHouses) {
      return;
    }

    let filteredHouses = rentHouses.filter((house) => {
      if (types !== 'all' && house.property_type !== types) {
        return false;
      }
      if (flooring !== 'all' && house.flooring !== flooring) {
        return false;
      }
      if (bed !== 0 && house.bedroom < bed) {
        return false;
      }
      if (bath !== 0 && house.bathroom < bath) {
        return false;
      }
      if (year !== 'all' && house.year_built < year) {
        return false;
      }
      if (house.rate < minRate || house.rate > maxRate) {
        return false;
      }
      if (house.area < minSize || house.area > maxSize) {
        return false;
      }
      if (parking && !house.parking) {
        return false;
      }
      return true;
    });

    setSearch(filteredHouses);
  }

  async function handleSave(search_type) {
    console.log(user);
    if (user) {
      const SaveSearch_URL = `${DB}/api/search?search_type=${search_type}&uid=${user.id}&min_price=${minRate}&max_price=${maxRate}&bedroom=${
        bed === '0' ? null : bed
      }&bathroom=${bath === '0' ? null : bath}&year_built=${
        year === 'all' ? null : year
      }&parking=${parking}&home_type=${types}&flooring=${
        flooring === 'all' ? null : flooring
      }&house_size=${minSize}`;
      try {
        console.log('save search');

        fetch(SaveSearch_URL)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
      } catch (e) {
        console.log(e);
      }
      refreshPage();
    } else {
      alert('Please sign in to save search');
    }
  }

  async function removeRentFavorite(house, type) {
    if (user) {
      try {
        let res = await fetch(Rent_Favorite_URL, {
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            U_ID: user.id,
            home_type: 'r',
            properity_id: type === 'S' ? house.S_ID : house.R_ID,
          }),
        });
        let result = await res.json();
        if (result && result.success) {
          console.log('successful delete from favorite');
        } else if (result && result.success === false) {
          alert(result.msg);
        }
      } catch (e) {
        console.log(e);
      }
      try {
        fetch(`${DB}/api/favorite/home?id=${user.id}`)
          .then((res) => res.json())
          .then((result) => {
            console.log('after remove', result);
            let Favorite_List = result.list;
            setRentFavorite(Favorite_List);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Please sign in to remove favorite house');
    }
  }

  async function addRentFavorite(house) {
    if (user) {
      try {
        let res = await fetch(Rent_Favorite_URL, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            U_ID: user.id,
            home_type: 'r',
            properity_id: house.R_ID,
          }),
        });
        let result = await res.json();
        if (result && result.success) {
          console.log('successful add to favorite');
        } else if (result && result.success === false) {
          alert(result.msg);
        }
      } catch (e) {
        console.log(e);
      }
      try {
        fetch(`${DB}/api/favorite/home?id=${user.id}`)
          .then((res) => res.json())
          .then((result) => {
            console.log('after add', result);
            let Favorite_List = result.list;
            setRentFavorite(Favorite_List);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Please sign in add favorite house');
    }
  }

  const contextValue = {
    rentHouses,
          handleChange,
          handleSave,
          search,
          favorite_search_list,
          setSearch,
          rentFavorite,
          removeRentFavorite,
          addRentFavorite,
          minSize,
          maxSize,
  };

  return <RentContext.Provider value={contextValue}>{children}</RentContext.Provider>;
}

export { RentProvider, RentContext };