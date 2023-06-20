import React from 'react';
import './App.css';
import Header from "./containers/header"
import Routers from "./Routers/Routers"
import {UserInfor} from './context/userInfo'

import {HousesProvider} from './context/housesContext'
import {RentProvider} from './context/rentContext'
import {RealtorProvider} from './context/realtorContext'
function App() {
  return (
    <div className="App">
      
      <UserInfor>
          <Header />
          <HousesProvider>
            <RentProvider>
              <RealtorProvider>
                <Routers/>
              </RealtorProvider>
            </RentProvider>  
          </HousesProvider>
       </UserInfor>
    </div>
  );
}

export default App;
