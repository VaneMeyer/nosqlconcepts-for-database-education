DROP TABLE IF EXISTS goal;

CREATE TABLE goal (
  matchid INT NOT NULL DEFAULT 0,
  teamid VARCHAR(3),
  player VARCHAR(100),
  gtime INT NOT NULL DEFAULT 0,
  PRIMARY KEY (matchid, gtime)
);
