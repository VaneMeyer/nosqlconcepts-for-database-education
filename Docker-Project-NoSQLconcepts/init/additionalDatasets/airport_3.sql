
--AUTHORIZATION postgres;

-- default schema "public"

--CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));
--INSERT INTO users (name) VALUES ('Alice'), ('Bob');

CREATE SCHEMA IF NOT EXISTS students;
SET search_path TO students, public;

---------- Exercise sheet 3 ------------
/* Reset Script evaluation: Blatt 3
 Programmieren von Datenbanken SS 2023
 (Programming and Databases Summer semester 2023)
*/

DROP TABLE IF EXISTS address CASCADE;
CREATE TABLE address (
  id int NOT NULL,
  zip_code varchar(10) NOT NULL,
  town varchar(100) NOT NULL,
  street varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO address VALUES 
(1,'13405','Berlin','Flughafen Tegel'),
(2,'40474','Duesseldorf','Flughafenstrasse 120'),
(3,'60547','Frankfurt am Main','Frankfurt Flughafen'),
(4,'85356','Muenchen','Nordallee 25'), 
(5,'95700','Paris','Paris Charles de Gaulle Airport'),
(6,'60325','Frankfurt am Main','Robert-Mayer Str. 10');

DROP TABLE IF EXISTS airport CASCADE;
CREATE TABLE airport (
  icao_code varchar(4) NOT NULL,
  airport_name varchar(100) NOT NULL,
  address_id int NOT NULL,
  PRIMARY KEY (icao_code),
  FOREIGN KEY (address_id) REFERENCES address (id)
) ;


INSERT INTO airport VALUES 
('EDDF','Frankfurt am Main',3),
('EDDL','Duesseldorf International',2),
('EDDM','Muenchen (Franz Josef Strauss)',4),
('EDDT','Berlin-Tegel (Otto-Lilienthal)',1);

DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
  id int NOT NULL,
  last_name varchar(50) NOT NULL,
  first_name varchar(50) NOT NULL,
  rating int,
  PRIMARY KEY (id)
) ;

INSERT INTO person VALUES 
(15943155,'Mueller','Elias',13),(15946782,'Richter','Thomas',20),(16579435,'Schmidt','Alexander',11),
(28943155,'Weber','Sabrina',16),(31764155,'Koch','Nicole',17),(35941358,'Weber','Sabine',18),(35943143,'Alexander','Daniel',14),
(35943147,'Schmidt','Stefanie',12),(73941738,'Fischer','David',15),(99188655,'Neumann','Alexander',19),
(1,' Angela','Merkel', 2),
(2,'Mer','Angela', 3),
(3,'merkel','Angela', 4),
(4,'Merlin','Angela', 5),
(5,'Test_b',' Angela ', 6),
(6,'Test_b',' Anaela ', 7),
(7,'Test_b',' Aa ', 8),
(8,'Test_b',' Aaa ', 9),
(9,'Test_b','    Aaa    ', 10),
(10,'Test_d','3', 10),
(11,'Test_d','3', 10),
(12,'Test_d','3', 10),
(13,'Test_d','2', 10),
(14,'Test_d','2', 10);

DROP TABLE IF EXISTS customer CASCADE;
CREATE TABLE customer (
  id int NOT NULL,
  credit decimal(10,2), 
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES person (id)
) ;

INSERT INTO customer VALUES 
(15943155, 1000.8),
(15946782, 999.99),
(16579435, 580),
(5, 0),
(2, 0),
(3, 0),
(4, 0),
(73941738, 17), 
(35943143, 9);

DROP TABLE IF EXISTS customer_vip CASCADE;
CREATE TABLE customer_vip (
  id int NOT NULL,
  comment varchar(500) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES customer (id)
) ;

INSERT INTO customer_vip VALUES 
(15943155,'Ehem. Bundeskanzlerin'),
(15946782,'Klimaschutzaktivistin');

DROP TABLE IF EXISTS plane CASCADE;
CREATE TABLE plane (
  id int NOT NULL,
  no_seats int NOT NULL,
  type varchar(100) NOT NULL,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO plane VALUES 
(1,555,'Airbus','Airbus A380'),
(2,85,'Fokker','Fokker F100'),
(3,162,'Boeing','Boeing 737'),
(4,380,'Airbus','Airbus A340'),
(5,8,'Airbus','Airbus Mini');

DROP TABLE IF EXISTS pilot CASCADE;
CREATE TABLE pilot (
  id int NOT NULL,
  licence_valid_till date,
  comment varchar(100),
  address_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (address_id) REFERENCES address (id),
  FOREIGN KEY (id) REFERENCES person (id)
) ;

INSERT INTO pilot VALUES 
(28943155, '2023-12-31','fliegt gerne Langstrecke', 6);

DROP TABLE IF EXISTS flightexecution CASCADE;
CREATE TABLE flightexecution (
  flight_no varchar(7) NOT NULL,
  departure_date_time_utc timestamp NOT NULL,
  icao_code_origin varchar(4) NOT NULL,
  icao_code_destination varchar(4) NOT NULL,
  plane_id int NOT NULL,
  flight_duration_minutes int NOT NULL,
  PRIMARY KEY (flight_no,departure_date_time_utc),
  FOREIGN KEY (plane_id) REFERENCES plane (id),
  FOREIGN KEY (icao_code_origin) REFERENCES airport (icao_code),
  FOREIGN KEY (icao_code_destination) REFERENCES airport (icao_code)
) ;

INSERT INTO flightexecution VALUES 
('IBE1684','2024-10-24 10:30:45','EDDT','EDDF',2,400),
('IBE1764','2023-10-26 00:00:00','EDDL','EDDT',1,180),
('IBE1846','2023-09-30 10:30:45','EDDF','EDDL',3,160),
('IBE3843','2023-10-31 10:30:45','EDDF','EDDM',5,120),
('IBE1684','2024-01-01 10:30:45','EDDT','EDDF',2,400),
('IBE1764','2023-12-30 10:30:45','EDDL','EDDT',5,180),
('IBE1846','2023-12-31 10:30:45','EDDF','EDDL',3,160),
('IBE3843','2023-12-31 10:30:45','EDDF','EDDM',5,400),
('IBE3843','2023-12-30 10:30:45','EDDF','EDDM',4,400);

DROP TABLE IF EXISTS reservation CASCADE;
CREATE TABLE reservation (
  id int NOT NULL,
  customer_id int NOT NULL,
  no_reserved_seats int NOT NULL,
  comment varchar(1000) DEFAULT NULL,
  flight_no varchar(7) NOT NULL,
  departure_date_time_utc timestamp NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customer (id),
  FOREIGN KEY (flight_no, departure_date_time_utc) REFERENCES flightexecution (flight_no, departure_date_time_utc)
) ;

INSERT INTO reservation VALUES 
(1,15946782,18,'','IBE1684','2024-01-01 10:30:45');
INSERT INTO reservation VALUES
(3,16579435,2,'Die Plaetze sollten nebeneinander liegen','IBE3843','2023-10-31 10:30:45');
INSERT INTO reservation VALUES
(4,15946782,200,'','IBE1684','2024-01-01 10:30:45');
INSERT INTO reservation VALUES 
(5,15946782,15,'','IBE1764','2023-10-26 00:00:00');
INSERT INTO reservation VALUES
(6,16579435,20,'Die Plaetze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45');
INSERT INTO reservation VALUES
(7,15946782,17,'','IBE1684','2024-01-01 10:30:45');
INSERT INTO reservation VALUES
(9,16579435,22,'Die Plaetze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45');
INSERT INTO reservation VALUES
(10,73941738,41,'','IBE1684','2024-01-01 10:30:45');
INSERT INTO reservation VALUES
(11,35943143,14,'','IBE1764','2023-12-30 10:30:45');
INSERT INTO reservation VALUES
(12,35943143,2,'Die Plaetze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45');
INSERT INTO reservation VALUES
(13,35943143,2,'Die Plaetze sollten nebeneinander liegen','IBE3843','2023-12-30 10:30:45');
INSERT INTO reservation VALUES
(14,35943143,20,'Die Plaetze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45');