# PROPERTYPRO - An ALX Final Project

This is the README file for the PropertyPro web application, which is the final project for ALX. PropertyPro is an application that allows users to buy, sell, or rent homes.

## Installation

### Backend Dependencies

Run the following commands in your backend terminal:
- npm i bcrypt
- npm i body-parser
- npm i jsonwebtoken
- npm i nodemon
- npm i multer --save
- npm i nodemailer --save

### rontend Dependencies

Run the following commands in your frontend terminal:
- npm install react-icons --save
- npm i google-maps-react
- npm install react-bootstrap bootstrap
- npm i contentful

## Project Setup

To start the project, you need two terminals for the frontend and backend.

## Frontend:
- Change to the app folder in the terminal: '''cd app'''
- Start the React project: '''npm start'''
- *The frontend will be accessible on port 3000.*

## Backend:
- Change to the backend folder in the terminal: '''cd backend'''
- Start the backend server: '''npm start'''
- *The backend will be accessible on port 9000.*


## Problem Statement

The goal of this project is to develop a web application that allows users to buy, sell, or rent homes.

### Requirements

- Administrator - the administrator
- User (Renter, Landlord, Buyer, Seller) – Renter and Landlord are specific to rental listings; Buyer and Seller 
    are specific to home sale listings.
- Realtor – a real estate agent who can act on behalf of any type of user.

### Use Cases (Required)

- Register/Login: Available for all roles.
- Approve/Remove Users: The administrator can approve, reject, or remove any users if needed.
- Search: All types of roles can search for sale or rental listings based on zip code, name, and/or other       
    attributes such as price range, square footage, number of bedrooms, number of bathrooms, flooring type, parking availability, amenities, year built, etc.
- Save as Favorites: Users can save favorite searches and favorite homes.
- Sell: (Realtor or Seller)
        Upload details of homes to be listed.
        Update status or other details of listings.
        Schedule open houses.
        Review buyers' applications and approve/reject.
        Remove listings.
- Buy: (Buyer or Realtor)
        Submit an application with an offer for a home.
        Send an email to the seller/seller's realtor.
- Rent Out: (Realtor or Landlord)
        Add new listings.
        Upload details of homes.
        Update lease terms, availability date, security deposit.
        Schedule visits.
        Review renters' applications and approve/reject.
        Update listing details.
        Remove listings.
- Rent: (Renter)
        Submit an application for a lease, including credit score and employment information.
        Send an email to the landlord/landlord's realtor.

## Features

- Register/Login (user table)
- Approve/Remove Users (admin, waitlist table)
- Search: Sale, Rent (zip code, name and filters) (sell/rent table)
- Sell: Add Home (home price, square footage) (seller, realtor) (sell table)
- Buy: Application Form => Email (buy application table)
- Rent: Add/Update Listing (rent term, type), Update Application (listing table/application table)
- Rent: Application Form (rent application table)
- User Interface
- Database (MySQL)