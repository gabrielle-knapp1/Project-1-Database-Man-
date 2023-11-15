create database Warehouse;
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
    foreign key (providerID) references Providers(providerID) on update cascade on delete restrict,
    foreign key (placeID) references StoragePlaces(placeID) on update cascade on delete restrict
);

create table if not exists AdminLog(
	logID int primary key,
    adminUsername varchar(20),
    description text,
    timeStamp datetime not null,
    foreign key (adminUsername) references Accounts(username) on update cascade on delete restrict
);

create table if not exists Carts(
	username varchar(20),
    itemID int,
    checkOutTime datetime,
    quantity int not null default 0,
    borrowing bool not null default false,
    checkedOut bool not null default false,
    primary key (username, itemID),
    foreign key (username) references Accounts(username) on update cascade on delete restrict,
    foreign key (itemID) references Items(itemID) on update cascade on delete restrict
);

create table if not exists Favorites(
	favoriteID int primary key,
    username varchar(20),
    itemID int,
    foreign key (username) references Accounts(username) on update cascade on delete restrict,
    foreign key (itemID) references Items(itemID) on update cascade on delete restrict
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
    foreign key (username) references Carts(username) on update cascade on delete restrict
);