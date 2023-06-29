import React, { useState, useEffect } from 'react';
import { DB } from '../constants/DB';

const RealtorContext = React.createContext();

function RealtorProvider({ children }) {
  const [realtors, setRealtors] = useState();
  const [search, setSearch] = useState();

  const Search_URL = `${DB}/api/realtor/zip?keyword`;

  useEffect(() => {
    fetch(Search_URL)
      .then((response) => response.json())
      .then((result) => setRealtors(result.list));
  }, [search, Search_URL]); // Include Search_URL in the dependency array

  function find_result(input) {
    if (!input) {
      setSearch(realtors);
    } else {
      const array = realtors.filter((realtor) => realtor.zipcode === input);
      setSearch(array);
    }
  }

  function find_name(input) {
    if (!input) {
      setSearch(realtors);
    } else {
      const array = realtors.filter(
        (realtor) => realtor.Fname === input || realtor.Lname === input
      );
      setSearch(array);
    }
  }

  return (
    <>
      <RealtorContext.Provider
        value={{
          realtors,
          find_result,
          search,
          find_name,
        }}
      >
        {children}
      </RealtorContext.Provider>
    </>
  );
}

export { RealtorProvider, RealtorContext };