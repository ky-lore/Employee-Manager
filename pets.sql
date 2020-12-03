CREATE DATABASE pets_db;

USE pets_db;

CREATE TABLE owners (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone INT NOT NULL
);

CREATE TABLE pets (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    breed VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    ownerId INT,
    FOREIGN KEY (ownerId) REFERENCES owners(id)
);

USE pets_db;

INSERT INTO owners (name, email, phone)
VALUES ('John Doe', 'johndoe@gmail.com', 1234567890), 
('Jane Doe', 'janedoe@gmail.com', 1234567890), 
('Jack Doe', 'jackdoe@gmail.com', 1234567890), 
('Jenny Doe', 'jennydoe@gmail.com', 1234567890);


USE pets_db;

INSERT INTO pets (name, breed, age, ownerId)
VALUES ('Beef', 'chihuahua', 2, 1),
('Chicken', 'chihuahua', 2, 1),
('Pork', 'chihuahua', 2, 1),
('Taco', 'chihuahua', 2, 2),
('Pizza', 'chihuahua', 2, 2),
('Burrito', 'chihuahua', 2, 3),
('Chip', 'chihuahua', 2, null),
('Ham', 'chihuahua', 2, null);

-- Inner Join
USE pets_db;

SELECT owners.name AS owner, owners.email, owners.phone, pets.name, pets.breed, pets.age
FROM owners
INNER JOIN pets
ON  owners.id = pets.ownerId;

-- Left Join
USE pets_db;

SELECT owners.name AS owner, owners.email, owners.phone, pets.name, pets.breed, pets.age
FROM owners
LEFT JOIN pets
ON  owners.id = pets.ownerId;

-- Right Join
USE pets_db;

SELECT owners.name AS owner, owners.email, owners.phone, pets.name, pets.breed, pets.age
FROM owners
RIGHT JOIN pets
ON  owners.id = pets.ownerId;

-- Full Outer Join
USE pets_db;

SELECT owners.name AS owner, owners.email, owners.phone, pets.name, pets.breed, pets.age
FROM owners
LEFT JOIN pets
ON  owners.id = pets.ownerId
UNION
SELECT owners.name AS owner, owners.email, owners.phone, pets.name, pets.breed, pets.age
FROM owners
RIGHT JOIN pets
ON  owners.id = pets.ownerId;
