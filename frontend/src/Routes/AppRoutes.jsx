import React from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from '../Pages/HomePage';
import About from '../Pages/About'
import Contact from '../Pages/ContactUs'
import Profile from '../Pages/UserProfile'
import DashBoard from '../Pages/UserDashBoard'
import EditUser from '../Pages/EditUser'
import EditProperty from '../Pages/EditProperty'
import Rent from '../Pages/RentProperty'
import Buy from '../Pages/BuyProperty'
import Sell from '../Pages/SellProperty'
import Error404 from '../Pages/ErrorPage'
import PropertyDetails from '../Pages/PageDetails';
import Favourites from '../Pages/FavouritesPage';


function AppRoutes({ setAuth, isAuthenticated }) {

    return (
        <Routes>
            <Route path="*" element={<Error404 />} />

            <Route
                path="/"
                element={
                    <Home isAuthenticated={isAuthenticated} />
                }
            />

            <Route
                path="/profile"
                element={
                    <Profile />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <DashBoard setAuth={setAuth} />
                }
            />

            <Route
                path='/rent'
                element={
                    <Rent />
                }
            />

            <Route
                path='/buy'
                element={
                    <Buy />
                }
            />

            <Route
                path='/sell'
                element={
                    <Sell />
                }
            />


            <Route
                path="/property/:id"
                element={
                    // pass id to the property details page to fetch data from backend
                    <PropertyDetails />
                }
            />

            {/* // TODO : add user profile visit page  */}

            <Route
                path="/about"
                element={
                    <About />
                }
            />

            <Route
                path="/contact"
                element={
                    <Contact />
                }
            />

            <Route
                path="/profile/edit"
                element={
                    <EditUser />
                }
            />

            <Route
                path="/dashboard/editproperty/:id"
                element={
                    <EditProperty />
                }
            />

            <Route
                path="/favourites"
                element={
                    <Favourites />
                }
            />
        </Routes>
    );
}

export default AppRoutes;
