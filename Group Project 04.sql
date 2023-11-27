-- Q1
CREATE USER 'Laura Green'@'localhost' IDENTIFIED BY 'Future';

-- Q2
GRANT INSERT ON sakila.film TO 'Laura Green'@'localhost';

-- Q3
ALTER USER 'Laura Green'@'localhost' IDENTIFIED BY 'Happiness';

-- Q4
-- a
-- Create the 'future' database
CREATE DATABASE future;
-- Switch to the 'future' database
USE future;
-- Create the 'personnel' table
CREATE TABLE personnel (
    personID INT,
    Fname VARCHAR(255),
    Lname VARCHAR(255),
    SSN VARCHAR(12),
    roleID INT
);
-- Create the 'role' table
CREATE TABLE role (
    roleID INT,
    role VARCHAR(255)
);
-- Create the 'task' table
CREATE TABLE task (
    taskID INT,
    roleID INT,
    personID INT
);

-- b
-- Insert values into the 'personnel' table
INSERT INTO personnel
VALUES	(1, 'Jack', 'Brown', '000 000 000', 1),
		(2, 'James', 'Fall', '111 111 111', 2);
-- Insert values into the 'role' table
INSERT INTO role
VALUES	(1, 'researcher'),
		(2, 'manager');
-- Insert values into the 'task' table
INSERT INTO task
VALUES	(1, 1, 1),
		(2, 2, 2);

-- c
-- Create the user 'Reza' with the password 'DB'
CREATE USER 'Reza'@'localhost' IDENTIFIED BY 'DB';
-- Grant all privileges on the 'personnel' table to 'Reza'
GRANT ALL PRIVILEGES ON future.personnel TO 'Reza'@'localhost';

-- d
-- Run SELECT on the 'personnel' table with the username 'Reza'
SELECT * FROM personnel;
-- Run SELECT on the 'role' table with the username 'Reza'
SELECT * FROM role;
-- Run SELECT on the 'task' table with the username 'Reza'
SELECT * FROM task;

-- e
-- Run a JOIN query on 'personnel' and 'role' tables with the username 'Reza'
SELECT * FROM personnel
JOIN role ON personnel.roleID = role.roleID;
-- If not successful: Grant SELECT privileges on the 'role' table to 'Reza'
GRANT SELECT ON future.role TO 'Reza'@'localhost';


-- Q5
DROP USER 'Laura Green'@'localhost';