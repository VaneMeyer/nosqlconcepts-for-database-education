
--AUTHORIZATION postgres;

-- default schema "public"

--CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));
--INSERT INTO users (name) VALUES ('Alice'), ('Bob');

CREATE SCHEMA IF NOT EXISTS students;
SET search_path TO students, public;

---------- Exercise sheet 1 ------------
/* Reset Script evaluation: Blatt 1
 Programmieren von Datenbanken SS 2023
 (Programming and Databases Summer semester 2023)
*/

DROP TABLE IF EXISTS flightexecution CASCADE;
DROP TABLE IF EXISTS airport CASCADE;

CREATE TABLE airport (
  icao_code varchar(4) NOT NULL,
  airport_name varchar(100) NOT NULL,
  no_runways int,
  PRIMARY KEY (icao_code)
);

INSERT INTO airport VALUES ('CYYZ','Toronto Pearson International Airport', 5),
('EDDF','Frankfurt am Main', 4),
('EDDL','Düsseldorf International', 7),
('EDDM','München (Franz Josef Strauß)', 3),
('EGLC','London City Airport', -5),
('ENGM','Flughafen Oslo-Gardermoen', 2);

CREATE TABLE flightexecution (
  flight_no varchar(7) NOT NULL,
  departure_date date NOT NULL,
  icao_code_origin varchar(4) NOT NULL,
  icao_code_destination varchar(4) NOT NULL,
  plane_id int NOT NULL,
  flight_duration_minutes int,
  PRIMARY KEY (flight_no, departure_date)
  );