DROP TABLE IF EXISTS casting;

CREATE TABLE casting (
  movieid INT NOT NULL DEFAULT 0,
  actorid INT NOT NULL DEFAULT 0,
  ord INT NOT NULL DEFAULT 0,
  PRIMARY KEY (movieid, actorid, ord)
);

CREATE INDEX castact_idx ON casting (actorid);
