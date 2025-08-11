--Admin Table
CREATE TABLE Admin (
    id SERIAL PRIMARY KEY,
    UserName VARCHAR(100) NOT NULL UNIQUE,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PhoneNum VARCHAR(50) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP DEFAULT NOW()
);


-- Role Table
CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);
-- Permission Table
CREATE TABLE permission (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);
-- Role Permission Table
CREATE TABLE rolePermission (
    id SERIAL PRIMARY KEY,
    roleID INT NOT NULL,
    permissionID INT NOT NULL,
    FOREIGN KEY (roleID) REFERENCES Role(id),
    FOREIGN KEY (permissionID) REFERENCES permission(id)
);

-- Company Table
CREATE TABLE Company (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Size VARCHAR(100),
    Industry VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    phoneNum VARCHAR(50) NOT NULL UNIQUE,
    webURL TEXT,
    status TEXT,
    Location TEXT NOT NULL,
    description TEXT
);

-- User Table
CREATE TABLE UserAccount (
    id SERIAL PRIMARY KEY,
    RoleID INT NOT NULL,
    CompanyID INT NOT NULL,
    UserName VARCHAR(100) NOT NULL UNIQUE,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255)NOT NULL,
    Language VARCHAR(50),
    LastLogin TIMESTAMP DEFAULT NOW(),
    status TEXT,
    FOREIGN KEY (RoleID) REFERENCES Role(id),
    FOREIGN KEY (CompanyID) REFERENCES Company(id) ON DELETE CASCADE
);


-- Warehouse Table
CREATE TABLE Warehouse (
    id SERIAL PRIMARY KEY,
    CompanyID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Location TEXT NOT NULL,
    status TEXT,
    FOREIGN KEY (CompanyID) REFERENCES Company(id) ON DELETE CASCADE
);

-- Vendor Table
CREATE TABLE Vendor (
    id SERIAL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PhoneNum VARCHAR(50) NOT NULL,
    Rating NUMERIC(2,1) CHECK (Rating BETWEEN 0.0 AND 9.9)
);

-- Category Table
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE
);

-- Product Table
CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    VendorID INT NOT NULL,
    CategoryID INT NOT NULL,
    CompanyID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Barcode VARCHAR(100) NOT NULL UNIQUE,
    ImageURL TEXT,
    ExpiryDate DATE NOT NULL,
    Description TEXT,
    FOREIGN KEY (VendorID) REFERENCES Vendor(id) ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES Category(id),
    FOREIGN KEY (CompanyID) REFERENCES Company(id) ON DELETE CASCADE -- nerage3 3ala deh
);

-- Stock Table
CREATE TABLE Stock (
    id SERIAL PRIMARY KEY,
    ProductID INT NOT NULL,
    WarehouseID INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity >= 0),
    ExpiryDate DATE NOT NULL,
    BatchNum VARCHAR(100) NOT NULL,
    LocCode VARCHAR(100) NOT NULL,
    last_updated TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (ProductID) REFERENCES Product(id) ON DELETE CASCADE, 
    FOREIGN KEY (WarehouseID) REFERENCES Warehouse(id) -- deh bardo
);

-- Alert Table
CREATE TABLE Alert (
    id SERIAL PRIMARY KEY,
    ProductID INT NOT NULL,
    StockID INT NOT NULL,
    WarehouseID INT NOT NULL,
    Type VARCHAR(50) NOT NULL,
    Channel VARCHAR(50) NOT NULL,
    TriggeredAt TIMESTAMP NOT NULL DEFAULT NOW(),
    Resolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ProductID) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (StockID) REFERENCES Stock(id) ON DELETE CASCADE,
    FOREIGN KEY (WarehouseID) REFERENCES Warehouse(id)
);

-- Log Table
CREATE TABLE Log (
    id SERIAL PRIMARY KEY,
    UserID INT NOT NULL,
    Action VARCHAR(100) NOT NULL,
    ObjectID INT NOT NULL,
    ObjectType VARCHAR(100) NOT NULL,
    Timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    gps_location JSON,
    Note TEXT,
    FOREIGN KEY (UserID) REFERENCES UserAccount(id)
);

-- Report Table
CREATE TABLE Report (
    id SERIAL PRIMARY KEY,
    CompanyID INT NOT NULL,
    Type VARCHAR(100) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE,
    Data TEXT,
    FOREIGN KEY (CompanyID) REFERENCES Company(id)
);

-- Payment Table
CREATE TABLE Payment (
    id SERIAL PRIMARY KEY,
    CompanyID INT NOT NULL,
    Amount NUMERIC(10,2) NOT NULL,
    Status VARCHAR(50) DEFAULT 'Active',
    PaymentMethod VARCHAR(50) NOT NULL,
    ReferenceID VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (CompanyID) REFERENCES Company(id)
);

-- Feature Table
CREATE TABLE Feature (
    id SERIAL PRIMARY KEY UNIQUE,
    Name VARCHAR(100) NOT NULL,
    Description TEXT
);

-- Bundle Table
CREATE TABLE Bundle (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE,
    Price NUMERIC(10,2) NOT NULL,
    Description TEXT
);

-- Bundle Feature Table
CREATE TABLE BundleFeature (
    id SERIAL PRIMARY KEY,
    BundleID INT NOT NULL,
    FeatureID INT NOT NULL,
    FOREIGN KEY (BundleID) REFERENCES Bundle(id),
    FOREIGN KEY (FeatureID) REFERENCES Feature(id)
);

-- Subscription Table
CREATE TABLE Subscription (
    id SERIAL PRIMARY KEY,
    CompanyID INT NOT NULL,
    BundleID INT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Status VARCHAR(50) NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    FOREIGN KEY (CompanyID) REFERENCES Company(id) ON DELETE CASCADE,
    FOREIGN KEY (BundleID) REFERENCES Bundle(id) ON DELETE CASCADE
);

-- Sales Transaction Table
CREATE TABLE SalesTransaction (
    id SERIAL PRIMARY KEY,
    ProductID INT NOT NULL,
    WarehouseID INT NOT NULL,
    Quantity INT NOT NULL,
    PricePerUnit NUMERIC(10,2) NOT NULL,
    TotalAmount NUMERIC(10,2) NOT NULL,
    CustomerName VARCHAR(255) NOT NULL,
    TransactionDate TIMESTAMP NOT NULL DEFAULT NOW(),
    CreatedBy INT,
    FOREIGN KEY (ProductID) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (WarehouseID) REFERENCES Warehouse(id),
    FOREIGN KEY (CreatedBy) REFERENCES UserAccount(id) ON DELETE CASCADE
);

-- Drop Tables
-- DROP TABLE Admin CASCADE;
-- DROP TABLE Role CASCADE;
-- DROP TABLE permission CASCADE; 
-- DROP TABLE rolePermission CASCADE;
-- DROP TABLE Company CASCADE;
-- DROP TABLE UserAccount CASCADE;
-- DROP TABLE Warehouse CASCADE;
-- DROP TABLE Vendor CASCADE;
-- DROP TABLE Category CASCADE;
-- DROP TABLE Product CASCADE;
-- DROP TABLE Stock CASCADE;
-- DROP TABLE Alert CASCADE;
-- DROP TABLE Log CASCADE;
-- DROP TABLE Report CASCADE;
-- DROP TABLE Payment CASCADE;
-- DROP TABLE Feature CASCADE;
-- DROP TABLE Bundle CASCADE;
-- DROP TABLE BundleFeature CASCADE;
-- DROP TABLE Subscription CASCADE;
-- DROP TABLE SalesTransaction CASCADE;

