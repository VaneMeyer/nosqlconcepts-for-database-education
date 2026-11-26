
--AUTHORIZATION postgres;

-- default schema "public"

--CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));
--INSERT INTO users (name) VALUES ('Alice'), ('Bob');

CREATE SCHEMA IF NOT EXISTS students;
SET search_path TO students, public;

---------- Exercise sheet 2 ------------
/* Reset Script evaluation: Blatt 2
 Programmieren von Datenbanken SS 2023
 (Programming and Databases Summer semester 2023)
*/

DROP TABLE IF EXISTS airport CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS plane CASCADE;
DROP TABLE IF EXISTS flightexecution CASCADE;
DROP TABLE IF EXISTS reservation CASCADE;


CREATE TABLE address (
  id int NOT NULL,
  zip_code varchar(10) NOT NULL,
  town varchar(100) NOT NULL,
  street varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ;

INSERT INTO address VALUES 
(1,'13405','Berlin','Flughafen Tegel'),
(2,'40474','Düsseldorf','Flughafenstraße 120'),
(3,'60547','Frankfurt am Main','Frankfurt Flughafen'),
(4,'85356','München','Nordallee 25'), 
(5,'95700','Paris','Paris Charles de Gaulle Airport');


CREATE TABLE airport (
  icao_code varchar(4) NOT NULL,
  airport_name varchar(100) NOT NULL,
  address_id int NOT NULL,
  PRIMARY KEY (icao_code),
  FOREIGN KEY (address_id) REFERENCES address (id)
) ;


INSERT INTO airport VALUES 
('EDDF','Frankfurt am Main',3),
('EDDL','Düsseldorf International',2),
('EDDM','München (Franz Josef Strauß)',4),
('EDDT','Berlin-Tegel (Otto-Lilienthal)',1);


CREATE TABLE customer (
  id int NOT NULL,
  last_name varchar(50) NOT NULL,
  first_name varchar(50) NOT NULL,
  rating int,
  PRIMARY KEY (id)
) ;



INSERT INTO customer VALUES 
(15943155,'Müller','Elias',13),(15946782,'Richter','Thomas',20),(16579435,'Schmidt','Alexander',11),
(28943155,'Weber','Sabrina',16),(31764155,'Koch','Nicole',17),(35941358,'Weber','Sabine',18),(35943143,'Alexander','Daniel',14),
(35943147,'Schmidt','Stefanie',12),(73941738,'Fischer','David',15),(99188655,'Neumann','Alexander',19);




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
(1,15946782,18,'','IBE1684','2024-01-01 10:30:45'),
(2,35943143,12,'','IBE1764','2023-10-26 00:00:00'),
(3,16579435,2,'Die Plätze sollten nebeneinander liegen','IBE3843','2023-10-31 10:30:45'),
(4,15946782,200,'','IBE1684','2024-01-01 10:30:45'),
(5,15946782,15,'','IBE1764','2023-10-26 00:00:00'),
(6,16579435,20,'Die Plätze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45'),
(7,15946782,17,'','IBE1684','2024-01-01 10:30:45'),
(8,73941738,1,'','IBE1764','2023-10-26 00:00:00'),
(9,16579435,22,'Die Plätze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45'),
(10,73941738,41,'','IBE1684','2024-01-01 10:30:45'),
(11,35943143,14,'','IBE1764','2023-12-30 10:30:45'),
(12,35943143,2,'Die Plätze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45'),
(13,35943143,2,'Die Plätze sollten nebeneinander liegen','IBE3843','2023-12-30 10:30:45'),
(14,35943143,20,'Die Plätze sollten nebeneinander liegen','IBE3843','2023-12-31 10:30:45');