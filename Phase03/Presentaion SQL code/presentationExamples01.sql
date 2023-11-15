create database if not exists ProjectPhase04NumberDemo;
use ProjectPhase04NumberDemo;
drop table Example;

CREATE TABLE Example (
myInt int,
myTinyInt tinyint,
mySmallInt smallint,
myMediumInt mediumint,
myDecimal decimal(5,2),
myFloat float
);
insert into Example (myInt, myTinyInt, mySmallInt, myMediumInt, myDecimal, myFloat)
values (8843000, 0, 127, 35000, 444.1, 5.222),
(10, 1, 100, 30, -2.1, 100.2),
(348, 0, 3, 90000, 800.2, -8.2);
select * from Example;
