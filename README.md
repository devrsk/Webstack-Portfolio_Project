
###PROPERTYPRO - A ALX Final Project
# How to install:
    backend:
        npm i bcrypt
        npm i body-parser
        npm i jsonwebtoken
        npm i nodemon
        npm i multer --save
        npm i nodemailer --save
    frontend:
        npm install react-icons --save
        npm i google-maps-react
        npm install react-bootstrap bootstrap
        npm i contentful
    clean git log:
        git reset --hard

## How to start the project
    Two terminal are needed for the frontend and backend;
    1. cd in to the app folder, in the terminal type: npm start(start the react project) the front end is listed on the port 3000.
    2  cd to the backend folder, enter npm start(start the backend)  the back end is listed on the port 9000
    

# PropertyPro - Everything housing

## Problem Statement
    Develop a web application that lets users buy, sell or rent homes

### Requirements
    1. Administrator - the administrator
    2. User (Renter, Landlord, Buyer, Seller) – Renter and Landlord are specific to rental listings;
    Buyer and Seller are specific to Home Sale listings
    3. Realtor – a real-estate agent who can act on behalf of any type of User 

### Usecase(required)
1. <strong>Register/Login</strong>: 
    Available for all roles
2. <strong>
    Approve/Remove users</strong>: The administrator can approve, reject or remove any users if the
    need arises.
3. <strong>Search</strong>: 
    All types of roles can search for Sale or rental listings - based on zip code or street
    address, and/or other attributes – price range, sqft., #bedrooms, #bathrooms, carpet vs
    wooden flooring, home type (apartment/townhome/attached Single Family Home or Detached
    Single), open/closed parking, other amenities, Year built etc.
4. <strong>Save as Favorites</strong>: 
    Users are able to save Favorite searches and Favorite Homes
5. <strong>Sell</strong>: (Realtor or Seller)
    Upload details of home to be listed
    You could list multiple homes if you are a realtor(acting on behalf of multiple sellers)
    Update status or other details of listing(s)
    Schedule open houses
    Review buyers’ applications and approve/reject
    Remove listing
6. <strong>Buy</strong>: (Buyer or Realtor)
    Submit an application with an offer for the home –an email sent to the Seller/seller’s realtor
7. <strong>Rent out (Realtor or Landlord)</strong>: 
    Add new listing, Upload details of home, Update lease terms,
    Availability date, Security deposit, schedule visits, Review renter’s applications and
    approve/reject, update listing details, remove listing
8. <strong>Rent (Renter)</strong>: 
    Submit an application for the lease, including credit score, employment
    information - an email sent to the Landlord/landlord’s realtor

## Requirements & Features
1. Register/Login (user table)
2. Approve Remove (Admin approve, reject and remove method) (waitlist table)
3. Search: Sale, Rent(zip, price, sqft...) (sell/rent table)
4. Favorites: save search (favorite table)
5. Sell: Add home(home price, sqft,... )(seller, realtor) (sell table)
6. Buy: application form => email (buy application table)
7. Rent: Add/Update listing(rent term, type), print/update application (listing table/application table)
8. Rent: application form (rent application table)
9. UI
10.  Database

## Week 1: 
    Figure out programming framework
    Frontend: React 
    Backend: Express + MySQL
    Learn & Explore about programming languages
    Raw database schema & SQL code for db creation
    Preparing basic knowledge about languages.
    Build up an overall template.
    Frontend: Login.js Signup.js
    Backend: Main.js(for login and signup validation)
    Frontend: 
        Setup UI
        Sign up 
        User page
        Saved homes(favorite?)
        Saved searches(favorite)
        Listings(rent/sell home)
        Account setting(update profile)(function)
    Backend: 
        Rachel for Register
        (user table) (waitlist table) (sell table) (favorite table) (buy application table) (listing table) (rent application table)
        Table fields

## Week 2:
    Frontend: 
        Buy page with house UI
        Sell page with sell by owner form
        Complete User page (favorite, search, listing) 
        Format data from house list => search(filter by zip code, bath, bed, price etc.)
        … prepare for filter agent, open house schedule
    Backend: 
        Register as realtor → Rachel
        Admin reject/remove  → lyn
        Get all house data (buy/rent page) → Lyn
        Search house
        by different keywords → Rachel
        filter home → frontend
        ...prepare for return favorite(save house) list => favorite table, save search, add listing(sell), 

## Week 3:
    Frontend: 
        Rent page with house UI
        Profile page(listing page, saved home, save search, review application) 
        Rentals page(post list page, update page, application page) 
        Agent page 
        Application page open house schedule
    Backend: 
        Search from all sell/rent
        Save as favorite
        Sell
        Upload details of home list 
        Update status/other details of home list 
        Remove listing 
    Schedule open house 
        Review buyer’s application → approve and reject-
    Buy
        Submit application with an offer for the home
        Email sent to landlord/landlord’s realtor
    Rent out
        Upload details of home list
        Update details of home list (lease term, availability date, security deposit)
        Remove listing
        Review renter’s application → approve and reject
        Schedule visit
    Rent
        Submit application for lease (include credit score and employment history)
        Email sent to landlord/landlord’s realtor

