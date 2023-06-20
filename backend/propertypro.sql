-- Create database propertypro
CREATE DATABASE propertypro;

-- Switch to database propertypro
\c propertypro;

-- ACCOUNT table is to store all users account info
CREATE TABLE ACCOUNT (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(200) UNIQUE NOT NULL,
    Email VARCHAR(200) UNIQUE NOT NULL,
    psswd VARCHAR(200) NOT NULL,
    a_type CHAR NOT NULL,
    approved CHAR NOT NULL
);

-- REALTOR table is to store realtor's additional info
CREATE TABLE REALTOR (
    U_ID INT UNIQUE NOT NULL,
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    Email VARCHAR(50) UNIQUE NOT NULL,
    phone CHAR(20) UNIQUE NOT NULL,
    zipcode CHAR(5) NOT NULL,
    sales INT,
    rent INT,
    specialty CHAR NOT NULL,
    PRIMARY KEY (U_ID),
    FOREIGN KEY (U_ID) REFERENCES ACCOUNT (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- FOR_SALE table stores all info about properties listed for sale
CREATE TABLE FOR_SALE (
    S_ID SERIAL PRIMARY KEY,
    Owner_ID INT NOT NULL,
    Realtor_ID INT,
    property_type VARCHAR(20) NOT NULL,
    apt_num VARCHAR(20),
    street VARCHAR(100) NOT NULL,
    city VARCHAR(15) NOT NULL,
    state CHAR(2) NOT NULL,
    zip CHAR(5) NOT NULL,
    sale_status VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    bedroom INT NOT NULL,
    bathroom INT NOT NULL,
    livingroom INT NOT NULL,
    flooring VARCHAR(20) NOT NULL,
    parking BOOLEAN NOT NULL,
    area INT NOT NULL,
    year_built INT NOT NULL,
    description TEXT,
    pic_dir VARCHAR(200) NOT NULL,
    FOREIGN KEY (Owner_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Realtor_ID) REFERENCES REALTOR (U_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Favorite_search
CREATE TABLE favorite_search (
    ID SERIAL PRIMARY KEY,
    U_ID INT NOT NULL,
    search_type CHAR NOT NULL,
    min_price INT,
    max_price INT,
    bedroom INT,
    bathroom INT,
    home_type VARCHAR(20),
    year_built VARCHAR(4),
    flooring VARCHAR(10),
    house_size VARCHAR(10),
    parking BOOLEAN,
    FOREIGN KEY (U_ID) REFERENCES ACCOUNT (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Favorite_home
CREATE TABLE favorite_home (
    U_ID INT NOT NULL,
    home_type CHAR NOT NULL,
    properity_id INT NOT NULL,
    FOREIGN KEY (U_ID) REFERENCES ACCOUNT (ID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- OPEN_HOUSE stores open house time for FOR_SALE properties
CREATE TABLE OPEN_HOUSE (
    S_ID INT NOT NULL,
    from_date TIMESTAMP NOT NULL,
    to_date TIMESTAMP NOT NULL,
    PRIMARY KEY (S_ID),
    FOREIGN KEY (S_ID) REFERENCES FOR_SALE (S_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- BUYER_APPLICATION table stores buyer applications for properties listed for sale
CREATE TABLE BUYER_APPLICATION (
    Buyer_ID INT NOT NULL,
    property_ID INT NOT NULL,
    owner_ID INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    offer_price INT NOT NULL,
    offer_status CHAR NOT NULL,
    main_pic VARCHAR(200) NOT NULL,
    PRIMARY KEY (Buyer_ID, property_ID),
    FOREIGN KEY (Buyer_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (property_ID) REFERENCES FOR_SALE (S_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (owner_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- FOR_RENT table stores all info about properties listed for rental
CREATE TABLE FOR_RENT (
    R_ID SERIAL PRIMARY KEY,
    Owner_ID INT NOT NULL,
    Realtor_ID INT,
    property_type VARCHAR(20) NOT NULL,
    apt_num VARCHAR(20),
    street VARCHAR(100) NOT NULL,
    city VARCHAR(15) NOT NULL,
    state CHAR(2) NOT NULL,
    zip CHAR(5) NOT NULL,
    available_date TIMESTAMP NOT NULL,
    rate INT NOT NULL,
    lease_term INT NOT NULL,
    security_deposit INT NOT NULL,
    bedroom INT NOT NULL,
    bathroom INT NOT NULL,
    livingroom INT NOT NULL,
    parking BOOLEAN NOT NULL,
    flooring VARCHAR(50) NOT NULL,
    area INT NOT NULL,
    year_built INT NOT NULL,
    ammenities TEXT,
    description TEXT,
    pic_dir VARCHAR(200) NOT NULL,
    status CHAR NOT NULL,
    FOREIGN KEY (Owner_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Realtor_ID) REFERENCES REALTOR (U_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- VISIT table stores visits arranged for properties listed for rental by property owner
CREATE TABLE VISIT (
    visitor_ID INT NOT NULL,
    property_ID INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    PRIMARY KEY (visitor_ID, property_ID),
    FOREIGN KEY (visitor_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (property_ID) REFERENCES FOR_RENT (R_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- RENTER_APPLICATION table stores renter applications for properties listed for rental
CREATE TABLE RENTER_APPLICATION (
    RENTER_ID INT NOT NULL,
    property_ID INT NOT NULL,
    owner_ID INT NOT NULL,
    renter_name VARCHAR(50) NOT NULL,
    credit_score INT NOT NULL,
    employer VARCHAR(100),
    annual_salary INT,
    request_status CHAR NOT NULL,
    main_pic VARCHAR(200) NOT NULL,
    PRIMARY KEY (RENTER_ID, property_ID),
    FOREIGN KEY (RENTER_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (property_ID) REFERENCES FOR_RENT (R_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (owner_ID) REFERENCES ACCOUNT (ID) ON UPDATE CASCADE ON DELETE CASCADE
);

