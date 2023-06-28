import React, { useState, useEffect } from 'react';
import { DB } from '../constants/DB'

const Context = React.createContext();
function HousesProvider({ children }) {
  const user = JSON.parse(localStorage.getItem('authUser'));
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [types, setTypes] = useState('all');
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [parking, setParking] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(3000);
  const [flooring, setFoorling] = useState('all');
  const [year, setYear] = useState('all');
  const [favorite_search_list, setFavorite_search_list] = useState([]);

  const Search_URL = `${DB}/house`;
  const Favorite_Home_URL = `${DB}/api/favorite/home`;

  useEffect(() => {
    fetch(Search_URL)
      .then((response) => response.json())
      .then((result) => {
        setHouses(result.dataset);
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
            setFavorite(Favorite_List);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    filterData();
  }, [
    houses,
    types,
    bed,
    bath,
    parking,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    year,
    flooring,
  ]);

  function find_result(input) {
    if (!input) {
      setSearch(houses);
    } else {
      input = input.toString().toLowerCase();
      const array = houses.filter(
        (house) =>
          house.Owner_ID.toString().toLowerCase().includes(input) ||
          house.city.toString().toLowerCase().includes(input)
      );
      setSearch(array);
    }
  }


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
    if (name === 'minPrice') {
      setMinPrice(value);
    }
    if (name === 'maxPrice') {
      setMaxPrice(value);
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
    let filteredHouses = houses.filter((house) => {
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
      if (house.price < minPrice || house.price > maxPrice) {
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
    // console.log(search_type,types, bed, bath, parking, minPrice, maxPrice, minSize, maxSize, year);
    console.log(user)
    if (user) {
      // const SaveSearch_URL = `${DB}/api/search?search_type=${search_type}&uid=${user.id}&min_price=${minPrice}&max_price=${maxPrice}&house_size=${maxSize}&parking=${parking}&home_type=${types=="all"?null:types}&bedroom=${bed=="0"?null:bed}&bathroom=${bath=="0"?null:bath}&year_built=${year=="all"?null:year}`
      const SaveSearch_URL = `${DB}/api/search?search_type=${search_type}&uid=${user.id}&min_price=${minPrice}&max_price=${maxPrice}&bedroom=${bed === "0" ? null : bed}&bathroom=${bath === "0" ? null : bath}&year_built=${year === "all" ? null : year}&parking=${parking}&home_type=${types}&flooring=${flooring === "all" ? null : flooring}&house_size=${minSize}`
      // console.log(SaveSearch_URL)
      // &parking=${parking}&home_type=${types}&flooring=${flooring=="all"?null:flooring}&house_size=${minSize}`
      try {
        console.log("save search");

        fetch(SaveSearch_URL).then(res => res.json()).then(result => {
          console.log(result);
        })
      } catch (e) {
        console.log(e);
      }
      refreshPage()
    } else {
      alert("Please sign in to save search")
    }
  }

  async function removeFavorite(house, type) {
    if (user) {
      try {
        let res = await fetch(Favorite_Home_URL, {
          method: 'delete',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            U_ID: user.id,
            home_type: "h",
            properity_id: (type === "S" ? house.S_ID : house.R_ID),
          })
        });
        let result = await res.json();
        // console.log(result);
        if (result && result.success) {
          console.log("successful delete from favorite");
        } else if (result && result.success === false) {
          alert(result.msg);
        }
      } catch (e) {
        console.log(e);
      }
      // const update = favorite.filter()
      try {
        // console.log("favorite");
        fetch(`${DB}/api/favorite/home?id=${user.id}`).then(res => res.json()).then(result => {
          console.log(result);
          let Favorite_List = result.list;
          setFavorite(Favorite_List);
        })
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please sign in to remove favorite house")
    }
  }
  function refreshPage() {
    window.location.reload(false);
  }
  async function deleteFavorite_Search(obj) {
    if (user) {
      console.log(obj.ID)
      try {
        let res = await fetch(`${DB}/api/favorite/search?ID=${obj.ID}`, {
          method: 'delete',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

        });
        let result = await res.json();
        // console.log(result);
        if (result && result.success) {
          console.log("successful delete from favorite search");
          // console.log(result)
          refreshPage()

        } else if (result && result.success === false) {
          alert(result.msg);
        }
      } catch (e) {
        console.log(e);
      }


    }
    else {
      alert("Please sign in to delete saved search")
    }
  }
  async function addFavorite(house) {
    // console.log(user)
    if (user) {
      try {
        let res = await fetch(Favorite_Home_URL, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            U_ID: user.id,
            home_type: "h",
            properity_id: house.S_ID,
          })
        });
        let result = await res.json();
        // console.log(result);
        if (result && result.success) {
          console.log("successful add to favorite");
        } else if (result && result.success === false) {
          alert(result.msg);
        }
      } catch (e) {
        console.log(e);
      }
      try {
        // console.log("favorite");
        fetch(`${DB}/api/favorite/home?id=${user.id}`).then(res => res.json()).then(result => {
          console.log(result);
          let Favorite_List = result.list;
          setFavorite(Favorite_List);
        })
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please sign in add favorite house")
    }

  }
  return (
    <>
      <Context.Provider value={{
        houses, setHouses, handleChange, handleSave, find_result, search, setSearch, removeFavorite, addFavorite, favorite, minSize, maxSize, favorite_search_list, deleteFavorite_Search
      }}>
        {children}
      </Context.Provider>
    </>
  )
}

export { HousesProvider, Context };