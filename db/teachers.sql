

DROP TABLE IF EXISTS teacher;

CREATE TABLE teacher (
  id INT NOT NULL,
  dept INT,
  name VARCHAR(50),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  PRIMARY KEY (id)
);

CREATE INDEX idx_dept ON teacher(dept);

INSERT INTO teacher (id, dept, name, phone, mobile) VALUES 
  (101, 1, 'Shrivell', '2753', '07986 555 1234'),
  (102, 1, 'Throd', '2754', '07122 555 1920'),
  (103, 1, 'Splint', '2293', NULL),
  (104, NULL, 'Spiregrain', NULL, NULL),
  (105, 2, 'Cutflower', '3212', '07996 555 6574'),
  (106, NULL, 'Deadyawn', '3345', NULL);

DROP TABLE IF EXISTS dept;

CREATE TABLE dept (
  id INT NOT NULL,
  name VARCHAR(50),
  PRIMARY KEY (id)
);

INSERT INTO dept (id, name) VALUES 
  (1, 'Computing'),
  (2, 'Design'),
  (3, 'Engineering');


