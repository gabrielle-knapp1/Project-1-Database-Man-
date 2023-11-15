create database if not exists Warehouse;
use Warehouse;

create table if not exists Accounts(
	username varchar(20) primary key,
    password varchar(20) not null,
    isAdmin bool not null default false,
    firstName varchar(20),
    lastName varchar(20),
    address varchar(45),
    email varchar(45)
);

create table if not exists Providers(
	providerID int primary key,
    name varchar(20),
    email varchar(45)
);

create table if not exists StoragePlaces(
	placeID int primary key,
    aisle int,
    shelf int
);

create table if not exists Items(
	itemID int primary key,
    type varchar(20) not null,
    name varchar(20) not null,
    providerID int,
    stockQuantity int not null default 0,
    placeID int,
    pricePerUnit float not null default 0.00,
    foreign key (providerID) references Providers(providerID),
    foreign key (placeID) references StoragePlaces(placeID)
);

create table if not exists AdminLog(
	logID int primary key,
    adminUsername varchar(20),
    description text,
    timeStamp datetime not null,
    foreign key (adminUsername) references Accounts(username)
);

#Here I initially hit an error- Error Code 1452: Cannot add or update a child row: a foreign key constraint fails
#To get around this, I needed to temporarily turn off the checking process of foreign keys
SET FOREIGN_KEY_CHECKS=0;
create table if not exists Carts(
	username varchar(20),
    itemID int,
    checkOutTime datetime,
    quantity int not null default 0,
    borrowing bool not null default false,
    checkedOut bool not null default false,
    primary key (username, itemID),
    foreign key (username) references Accounts(username),
    foreign key (itemID) references Items(itemID)
);

create table if not exists Favorites(
	favoriteID int primary key,
    username varchar(20),
    itemID int,
    foreign key (username) references Accounts(username),
    foreign key (itemID) references Items(itemID)
);

create table if not exists TransactionLog(
	transactionID int primary key,
    username varchar(20),
    checkoutTime datetime not null,
    expectedDeliveryTime datetime,
    actualDeliveryTime datetime,
    borrowReturnTime datetime,
    borrowState enum("pending", "accepted", "rejected"),
    totalCost float not null default 0.00,
    creditCardNum char(16) not null,
    foreign key (username) references Carts(username)
);

-- Insert sample data into the Accounts table
INSERT INTO Accounts (username, password, isAdmin, firstName, lastName, address, email)
VALUES
    ('user1', 'pass1', false, 'John', 'Doe', '123 Main St', 'john.doe@email.com'),
    ('user2', 'pass2', false, 'Jane', 'Smith', '456 Elm St', 'jane.smith@email.com'),
    ('admin1', 'adminpass', true, 'Admin', 'User', '789 Oak St', 'admin@email.com'),
    ('user3', 'pass3', false, 'Alice', 'Johnson', '101 Maple St', 'alice@email.com'),
    ('user4', 'pass4', false, 'Bob', 'Brown', '555 Pine St', 'bob@email.com'),
    ('user5', 'pass5', false, 'Eve', 'White', '777 Birch St', 'eve@email.com'),
    ('user6', 'pass6', false, 'Charlie', 'Green', '999 Cedar St', 'charlie@email.com'),
    ('user7', 'pass7', false, 'David', 'Lee', '111 Walnut St', 'david@email.com'),
    ('user8', 'pass8', false, 'Grace', 'Taylor', '222 Oak St', 'grace@email.com'),
    ('user9', 'pass9', false, 'Sam', 'Miller', '333 Maple St', 'sam@email.com');

-- Insert sample data into the Providers table
INSERT INTO Providers (providerID, name, email)
VALUES
    (1, 'Provider1', 'provider1@email.com'),
    (2, 'Provider2', 'provider2@email.com'),
    (3, 'Provider3', 'provider3@email.com'),
    (4, 'Provider4', 'provider4@email.com'),
    (5, 'Provider5', 'provider5@email.com'),
    (6, 'Provider6', 'provider6@email.com'),
    (7, 'Provider7', 'provider7@email.com'),
    (8, 'Provider8', 'provider8@email.com'),
    (9, 'Provider9', 'provider9@email.com'),
    (10, 'Provider10', 'provider10@email.com');

-- Insert sample data into the StoragePlaces table
INSERT INTO StoragePlaces (placeID, aisle, shelf)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 1),
    (4, 2, 2),
    (5, 3, 1),
    (6, 3, 2),
    (7, 4, 1),
    (8, 4, 2),
    (9, 5, 1),
    (10, 5, 2);

-- Insert sample data into the Items table
INSERT INTO Items (itemID, type, name, providerID, stockQuantity, placeID, pricePerUnit)
VALUES
    (1, 'Electronics', 'Laptop', 1, 50, 1, 799.99),
    (2, 'Electronics', 'Smartphone', 2, 100, 2, 499.99),
    (3, 'Clothing', 'T-Shirt', 3, 200, 3, 19.99),
    (4, 'Clothing', 'Jeans', 4, 150, 4, 39.99),
    (5, 'Groceries', 'Cereal', 5, 300, 5, 3.99),
    (6, 'Groceries', 'Milk', 6, 500, 6, 2.49),
    (7, 'Books', 'Novel', 7, 30, 7, 12.99),
    (8, 'Books', 'Textbook', 8, 20, 8, 79.99),
    (9, 'Furniture', 'Sofa', 9, 10, 9, 599.99),
    (10, 'Furniture', 'Table', 10, 15, 10, 199.99);

-- Insert sample data into the AdminLog table
INSERT INTO AdminLog (logID, adminUsername, description, timeStamp)
VALUES
    (1, 'admin1', 'Admin logged in', NOW()),
    (2, 'admin1', 'Added new provider', NOW()),
    (3, 'admin1', 'Updated user information', NOW()),
    (4, 'admin1', 'Deleted an item', NOW()),
    (5, 'admin1', 'Logged out', NOW()),
    (6, 'admin1', 'Admin logged in', NOW()),
    (7, 'admin1', 'Added new item', NOW()),
    (8, 'admin1', 'Changed password policy', NOW()),
    (9, 'admin1', 'Performed backup', NOW()),
    (10, 'admin1', 'Admin logged out', NOW());

-- Insert sample data into the Carts table
INSERT INTO Carts (username, itemID, checkOutTime, quantity, borrowing, checkedOut)
VALUES
    ('user1', 1, NOW(), 1, false, false),
    ('user2', 2, NOW(), 2, false, false),
    ('user3', 3, NOW(), 1, true, false),
    ('user4', 4, NOW(), 3, false, true),
    ('user5', 5, NOW(), 2, false, false),
    ('user6', 6, NOW(), 1, false, false),
    ('user7', 7, NOW(), 4, true, false),
    ('user8', 8, NOW(), 1, false, true),
    ('user9', 9, NOW(), 2, false, false),
    ('user10', 10, NOW(), 1, false, false);

-- Insert sample data into the Favorites table
INSERT INTO Favorites (favoriteID, username, itemID)
VALUES
    (1, 'user1', 3),
    (2, 'user1', 5),
    (3, 'user2', 1),
    (4, 'user3', 2),
    (5, 'user3', 4),
    (6, 'user4', 6),
    (7, 'user5', 8),
    (8, 'user6', 10),
    (9, 'user7', 9),
    (10, 'user8', 7);

-- Insert sample data into the TransactionLog table
INSERT INTO TransactionLog (transactionID, username, checkoutTime, expectedDeliveryTime, actualDeliveryTime, borrowReturnTime, borrowState, totalCost, creditCardNum)
VALUES
    (1, 'user1', NOW(), NOW(), NOW(), NOW(), 'pending', 39.97, '1234567812345678'),
    (2, 'user2', NOW(), NOW(), NOW(), NOW(), 'accepted', 999.99, '9876543298765432'),
    (3, 'user3', NOW(), NOW(), NOW(), NOW(), 'rejected', 49.95, '1111222233334444'),
    (4, 'user4', NOW(), NOW(), NOW(), NOW(), 'pending', 99.99, '5555666677778888'),
    (5, 'user5', NOW(), NOW(), NOW(), NOW(), 'accepted', 199.95, '1234567890123456'),
    (6, 'user6', NOW(), NOW(), NOW(), NOW(), 'rejected', 79.99, '9876543210987654'),
    (7, 'user7', NOW(), NOW(), NOW(), NOW(), 'pending', 159.99, '1111222233445566'),
    (8, 'user8', NOW(), NOW(), NOW(), NOW(), 'accepted', 49.95, '8888777766665555'),
    (9, 'user9', NOW(), NOW(), NOW(), NOW(), 'rejected', 29.99, '4444333322221111'),
    (10, 'user10', NOW(), NOW(), NOW(), NOW(), 'pending', 79.99, '2222333344445555');
#Here I turn back on the checking process of foreign keys
SET FOREIGN_KEY_CHECKS=0;

select * from TransactionLog;
select * from Carts;
select * from Accounts;
select * from AdminLog;
select * from Favorites;
select * from Items;
select * from Providers;
select * from StoragePlaces;

#Now I will create my four instances to prove that my constraints protect my database

#This attempts to insert a duplicate PK
INSERT INTO Accounts (username, password, isAdmin, firstName, lastName, address, email)
VALUES ('user1', 'newpass', false, 'New', 'User', '123 New St', 'new.user@email.com');

#This attempts to insert a foreign key violation
#Try to insert an item with a providerID that does not exist in the Providers table
INSERT INTO Items (itemID, type, name, providerID, stockQuantity, placeID, pricePerUnit)
VALUES (11, 'Electronics', 'Camera', 11, 20, 1, 299.99);
select name from Providers where providerID in (select providerID from Items where providerID = 11);

#This attempts to insert an element of the wrong data type
-- Try to insert a non-boolean value in the isAdmin column of the Accounts table
INSERT INTO Accounts (username, password, isAdmin, firstName, lastName, address, email)
VALUES ('user11', 'newpass', 'invalid', 'New', 'User', '123 New St', 'new.user@email.com');

#This attempts to insert a repeated key in a unique key value
-- Try to insert an item with the same itemID as an existing item
INSERT INTO Items (itemID, type, name, providerID, stockQuantity, placeID, pricePerUnit)
VALUES (1, 'Electronics', 'Smartwatch', 2, 50, 2, 199.99);
