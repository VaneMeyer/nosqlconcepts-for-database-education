DROP TABLE IF EXISTS actor;

CREATE TABLE actor (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) DEFAULT NULL
);

CREATE INDEX actorname_idx ON actor (name);
