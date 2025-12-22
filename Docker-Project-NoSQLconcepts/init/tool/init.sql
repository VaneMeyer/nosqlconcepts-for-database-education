CREATE SCHEMA IF NOT EXISTS private 
AUTHORIZATION tooluser;

CREATE SCHEMA IF NOT EXISTS tool 
AUTHORIZATION tooluser;


-- Table: private.users

DROP TABLE IF EXISTS private.users;

CREATE TABLE IF NOT EXISTS private.users
(
    user_name text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default", -- better use hashed password
    email_id text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    CONSTRAINT user_name_uniq UNIQUE (user_name)
);

-- first tool admin user: after login create new admin user and login with new admin to delete test admin user
INSERT INTO private.users( 
 user_name, password, email_id, role) 
 VALUES ('test', '1234', 'example', 'admin'); --TODO env?

-- Table: tool.task_areas

 DROP TABLE IF EXISTS tool.task_areas;

CREATE TABLE IF NOT EXISTS tool.task_areas
(
    area_id integer NOT NULL,
    area_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descr character varying COLLATE pg_catalog."default",
    link character varying COLLATE pg_catalog."default",
    endpoint character varying COLLATE pg_catalog."default",
    is_active boolean,
    feedback_on boolean,
    CONSTRAINT task_areas_pkey PRIMARY KEY (area_id)
);

INSERT INTO tool.task_areas
(
    area_id,
    area_name,
    descr,
    link,
    endpoint,
    is_active,
    feedback_on
)
VALUES
(1,  'SELECT basics',           NULL, 'basics',            'PostgreSQL', true, false),
(2,  'SELECT names',            NULL, 'names',             'PostgreSQL', true, false),
(3,  'SELECT Quiz',             NULL, 'selectquiz',        'PostgreSQL', true, false),
(4,  'SELECT from World',       NULL, 'selectfromworld',   'PostgreSQL', true, false),
(5,  'BBC Quiz',                NULL, 'bbcquiz',           'PostgreSQL', true, false),
(6,  'SELECT within SELECT',    NULL, 'selectwithinselect','PostgreSQL', true, false),
(7,  'Nested SELECT Quiz',      NULL, 'nestedselectquiz',  'PostgreSQL', true, false),
(8,  'SUM and COUNT',           NULL, 'sumandcount',       'PostgreSQL', true, false),
(9,  'SUM and COUNT Quiz',      NULL, 'sumandcountquiz',   'PostgreSQL', true, false),
(10, 'The JOIN operation',      NULL, 'joinoperation',     'PostgreSQL', true, false),
(11, 'JOIN Quiz',               NULL, 'joinquiz',          'PostgreSQL', true, false),
(12, 'More JOIN operations',    NULL, 'morejoinoperations','PostgreSQL', true, false),
(13, 'JOIN Quiz 2',             NULL, 'joinquiz2',         'PostgreSQL', true, false),
(14, 'Using Null',              NULL, 'usingnull',         'PostgreSQL', true, false),
(15, 'Using Null Quiz',         NULL, 'usingnullquiz',     'PostgreSQL', true, false),
(16, 'Self join',               NULL, 'selfjoin',          'PostgreSQL', true, false),
(17, 'Self join Quiz',          NULL, 'selfjoinquiz',      'PostgreSQL', true, false)

ON CONFLICT (area_id) DO NOTHING;

-- Table: tool.task_statements

DROP TABLE IF EXISTS tool.task_statements;

CREATE TABLE IF NOT EXISTS tool.task_statements
(
    statement_id integer NOT NULL,
    area_id integer NOT NULL,
    statement_text text COLLATE pg_catalog."default" NOT NULL,
    solution_query text COLLATE pg_catalog."default",
    topic text COLLATE pg_catalog."default",
    subtasknumber text COLLATE pg_catalog."default",
    maxtime text COLLATE pg_catalog."default",
    hint text COLLATE pg_catalog."default",
    tasknumber text COLLATE pg_catalog."default",
    CONSTRAINT task_statements_pkey PRIMARY KEY (statement_id, area_id),
    CONSTRAINT task_statements_area_id_fkey FOREIGN KEY (area_id)
        REFERENCES tool.task_areas (area_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 1,
 'Ändern Sie das SQL-Statement, um die Bevölkerung Deutschlands anzuzeigen.',
 'SELECT population FROM world WHERE name = ''Germany'';',
 '1'),
(2, 1,
 'Zeigen Sie den Namen und die Bevölkerung für Schweden, Norwegen und Dänemark an.',
 'SELECT name, population FROM world WHERE name IN (''Sweden'', ''Norway'', ''Denmark'');',
 '2'),
(3, 1,
 'Zeigen Sie das Land und die Fläche für Länder mit einer Fläche zwischen 200.000 und 250.000.',
 'SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000;',
 '3');

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 2,
 'Finde das Land, das mit Y beginnt.',
 'SELECT name FROM world WHERE name LIKE ''Y%'';',
 '1'),
(2, 2,
 'Finde die Länder, die mit Y enden.',
 'SELECT name FROM world WHERE name LIKE ''%Y'';',
 '2'),
(3, 2,
 'Liste die Länder auf, die den Buchstaben x enthalten.',
 'SELECT name FROM world WHERE name LIKE ''%x%'';',
 '3'),
(4, 2,
 'Finde die Länder, die mit land enden.',
 'SELECT name FROM world WHERE name LIKE ''%land'';',
 '4');


INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 4,
 'Zeigen Sie den Namen, den Kontinent und die Bevölkerung aller Länder an.',
 'SELECT name, continent, population FROM world;',
 '1'),
(2, 4,
 'Zeigen Sie die Länder mit mindestens 200 Millionen Einwohnern.',
 'SELECT name FROM world WHERE population >= 200000000;',
 '2'),
(3, 4,
 'Zeigen Sie Name und Pro-Kopf-BIP für Länder mit mindestens 200 Millionen Einwohnern.',
 'SELECT name, (gdp / population) FROM world WHERE population >= 200000000;',
 '3');

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 6,
 'Zeigen Sie Länder mit einer Bevölkerung größer als die von Russland.',
 'SELECT name FROM world WHERE population > (SELECT population FROM world WHERE name = ''Russia'');',
 '1'),
(2, 6,
 'Zeigen Sie europäische Länder mit höherem Pro-Kopf-BIP als das Vereinigte Königreich.',
 'SELECT name FROM world WHERE continent = ''Europe'' AND (gdp / population) > (SELECT gdp / population FROM world WHERE name = ''United Kingdom'');',
 '2');



INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 8,
 'Zeigen Sie die Gesamtbevölkerungsanzahl der Welt an.',
 'SELECT SUM(population) FROM world;',
 '1'),
(2, 8,
 'Listen Sie alle Kontinente auf – jeweils nur einmal.',
 'SELECT DISTINCT continent FROM world;',
 '2'),
(3, 8,
 'Geben Sie das gesamte GDP Afrikas an.',
 'SELECT SUM(gdp) FROM world WHERE continent = ''Africa'';',
 '3');

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 10,
 'Zeigen Sie matchid und Spielernamen für alle Tore von Deutschland.',
 'SELECT matchid, player FROM goal WHERE teamid = ''GER'';',
 '1'),
(2, 10,
 'Zeigen Sie Stadion und Teams für Spiel 1012.',
 'SELECT id, stadium, team1, team2 FROM game WHERE id = 1012;',
 '2');

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 12,
 'Listen Sie Filme aus dem Jahr 1962 auf.',
 'SELECT id, title FROM movie WHERE yr = 1962;',
 '1'),
(2, 12,
 'Geben Sie das Erscheinungsjahr von Citizen Kane aus.',
 'SELECT yr FROM movie WHERE title = ''Citizen Kane'';',
 '2');

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 14,
 'Listen Sie Lehrende ohne Abteilung auf.',
 'SELECT name FROM teacher WHERE dept IS NULL;',
 '1'),
(2, 14,
 'Zeigen Sie alle Lehrenden inklusive Abteilungen (LEFT JOIN).',
 'SELECT teacher.name, dept.name FROM teacher LEFT JOIN dept ON teacher.dept = dept.id;',
 '2');

INSERT INTO tool.task_statements
(statement_id, area_id, statement_text, solution_query, tasknumber)
VALUES
(1, 16,
 'Wie viele Stops sind in der Datenbank?',
 'SELECT COUNT(*) FROM stops;',
 '1'),
(2, 16,
 'Finde die ID für den Stop Craiglockhart.',
 'SELECT id FROM stops WHERE name = ''Craiglockhart'';',
 '2');

