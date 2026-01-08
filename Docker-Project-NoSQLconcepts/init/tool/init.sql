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
(1,  'SELECT basics',           'Daten: World', 'basics',            'World', true, false),
(2,  'SELECT names',            'Daten: World', 'names',             'World', true, false),
(3,  'SELECT from World',       'Daten: World', 'selectfromworld',   'World', true, false),
(4,  'SELECT within SELECT',    'Daten: World', 'selectwithinselect','World', true, false),
(5,  'SUM and COUNT',           'Daten: World', 'sumandcount',       'World', true, false),
(6, 'The JOIN operation',      'Daten: Euro 2012', 'joinoperation',     'Euro', true, false),
(7, 'More JOIN operations',    'Daten: Movie', 'morejoinoperations','Movie', true, false),
(8, 'Using Null',              'Daten: Teachers and Departments', 'usingnull',         'Teachers', true, false),
(9, 'Self join',               'Daten: Edinburgh Buses', 'selfjoin',          'Buses', true, false)


ON CONFLICT (area_id) DO NOTHING;

-- Table: tool.task_statements

DROP TABLE IF EXISTS tool.task_statements;

CREATE TABLE IF NOT EXISTS tool.task_statements
(
    statement_id integer NOT NULL,
    area_id integer NOT NULL,
    statement_text text COLLATE pg_catalog."default" NOT NULL,
    default_query text COLLATE pg_catalog."default",
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
(statement_id, area_id, statement_text, default_query, solution_query, subtasknumber, tasknumber)
VALUES
(1, 1,
 'Das Beispiel verwendet eine WHERE-Klausel, um die Bevölkerung (population) von Frankreich (France) anzuzeigen. Beachten Sie, dass Zeichenfolgen in einfachen Anführungszeichen stehen sollten. Ändern Sie das folgende SQL Statement, um die Bevölkerung Deutschlands (Germany) anzuzeigen',
 'SELECT population FROM world WHERE name = ''France'';',
 'SELECT population FROM world WHERE name = ''Germany'';',
 'Aufgabe 1',
 '1'),
(2, 1,
 'Überprüfung einer Liste: Das Wort IN ermöglicht es uns zu überprüfen, ob ein Element in einer Liste vorhanden ist. Das folgende Beispiel zeigt den Namen (name) und die Bevölkerung (population) für die Länder Brasilien (Brazil), Russland (Russia), Indien (India) und China. Zeigen Sie den Namen und die Bevölkerung für Schweden (Sweden), Norwegen (Norway) und Dänemark (Denmark) an.',
 'SELECT name, population FROM world WHERE name IN (''Brazil'', ''Russia'', ''India'', ''China'');',
 'SELECT name, population FROM world WHERE name IN (''Sweden'', ''Norway'', ''Denmark'');',
 'Aufgabe 2',
 '2'),
(3, 1,
 'Welche Länder sind weder zu klein noch zu groß? Mittels BETWEEN lässt sich Bereichsprüfung durchführen (der angegebene Bereich schließt die Grenzwerte mit ein). Das folgende Beispiel zeigt Länder mit einer Fläche (area) von 250.000-300.000 km². Passen Sie es an, um das Land und die Fläche für Länder mit einer Fläche zwischen 200.000 und 250.000 zu zeigen.',
 'SELECT name, area FROM world WHERE area BETWEEN 250000 AND 300000;',
 'SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000;',
 'Aufgabe 3',
 '3'),
(1, 2,
 'Du kannst WHERE name LIKE ''B%'' verwenden, um die Länder zu finden, die mit ''B'' beginnen. Das % ist ein Platzhalter, der zu beliebigen Zeichen passen kann. Finde das Land, das mit Y beginnt.',
 'SELECT name FROM world WHERE name LIKE ''F%''',
 'SELECT name FROM world WHERE name LIKE ''Y%'';',
 'Aufgabe 1',
 '1'), 
(2, 2,
 'Finde die Länder, die mit Y enden.',
 'SELECT name FROM world WHERE name LIKE ''T%'' ',
 'SELECT name FROM world WHERE name LIKE ''%Y'';',
 'Aufgabe 2', 
 '2'), 
(3, 2,
 'Luxemburg hat ein x im Namen - ebenso wie ein anderes Land. Liste beide auf. Finde die Länder, die den Buchstaben x enthalten. ',
 'SELECT name FROM world WHERE name LIKE ''T%'' ',
 'SELECT name FROM world WHERE name LIKE ''%x%'';',
 'Aufgabe 3',
 '3'), 
(4, 2,
 'Iceland, Switzerland enden mit ''land'' - aber gibt es noch andere? Finde die Länder, die mit ''land'' enden. ',
 'SELECT name FROM world WHERE name LIKE ''T%'' ',
 'SELECT name FROM world WHERE name LIKE ''%land'';',
 'Aufgabe 4',
 '4'), 
(5, 2,
 'Columbia beginnt mit einem C und endet mit ia - es gibt zwei weitere Länder wie dieses. Finde die Länder, die mit C beginnen und mit ia enden. ',
 'SELECT name FROM world WHERE name LIKE ''T%'' ',
 'SELECT name FROM world WHERE name LIKE ''C%ia'';',
 'Aufgabe 5',
 '5'), 
(6, 2,
 'Greece hat ein doppeltes e - wer hat ein doppeltes o? Finde das Land, das oo im Namen hat. ',
 'SELECT name FROM world WHERE name LIKE ''%ee%'' ',
 'SELECT name FROM world WHERE name LIKE ''%oo%'';',
 'Aufgabe 6',
 '6'), 
(7, 2,
 'Die Bahamas haben drei a - wer noch? Finde die Länder, die drei oder mehr a im Namen haben. ',
 'SELECT name FROM world WHERE name LIKE ''T%'' ',
 'SELECT name FROM world WHERE name LIKE ''%a%a%a%'';',
 'Aufgabe 7',
 '7'), 
(8, 2,
 'India und Angola haben ein ''n'' als zweiten Buchstaben. Du kannst den Unterstrich als Platzhalter für ein einzelnes Zeichen verwenden. Gebe nun die Länder aus, deren zweiter Buchstabe ''t'' ist.',
 'SELECT name FROM world WHERE name LIKE ''_n%'' ORDER BY name ',
 'SELECT name FROM world WHERE name LIKE ''_t%'' ORDER BY name;',
 'Aufgabe 8',
 '8'), 
(9, 2,
 'Lesotho und Moldowa haben beide zwei ''o'' im Namen, die von zwei anderen Zeichen getrennt sind. Finde die Länder, die zwei ''o'' im Namen haben, die von zwei anderen Zeichen getrennt sind. ',
 'SELECT name FROM world WHERE name LIKE ''_n%''',
 'SELECT name FROM world WHERE name LIKE ''%o__o%'';',
 'Aufgabe 9',
 '9'), 
(10, 2,
 'Kuba und Togo haben Namen mit vier Buchstaben. Finde die Länder, die genau vier Buchstaben im Namen haben. ',
 'SELECT name FROM world WHERE name LIKE ''Cu%''',
 'SELECT name FROM world WHERE name LIKE ''____'';',
 'Aufgabe 10',
 '10'), 
(11, 2,
 'Die Hauptstadt von Luxemburg ist Luxemburg. Finde alle Länder, in denen der Name der Hauptstadt (capital) dem Namen des Landes (name) entspricht. ',
 'SELECT name, capital, continent FROM world WHERE name LIKE ''%x%''',
 'SELECT name FROM world WHERE name = capital;',
 'Aufgabe 11',
 '11'), 
(12, 2,
 'Die Hauptstadt von Mexiko ist Mexiko City. Finde alle Länder, in denen die Hauptstadt (capital) den Namen des Landes zusammen mit ''City'' enthält. ',
 'SELECT name, concat(name, ''town'') FROM world WHERE name LIKE ''%ina%'' ',
 'SELECT name FROM world WHERE capital = CONCAT(name, '' City'');',
 'Aufgabe 12',
 '12'), 
(13, 2,
 'Finde die Hauptstadt und den Namen, bei denen die Hauptstadt den Namen des Landes enthält. ',
 '',
 'SELECT capital, name FROM world WHERE capital LIKE CONCAT(''%'', name, ''%'');',
 'Aufgabe 13',
 '13'), 
(14, 2,
 'Finde die Hauptstadt und den Namen, bei denen die Hauptstadt eine Erweiterung des Landesnamens ist. Du solltest Mexico City einschließen, da es länger ist als Mexico. Du solltest Luxemburg nicht einschließen, da die Hauptstadt denselben Namen wie das Land hat. ',
 '',
 'SELECT capital, name FROM world WHERE capital LIKE CONCAT(name, ''%'') AND capital <> name;',
 'Aufgabe 14',
 '14'), 
(15, 2,
 'Die Hauptstadt von Monaco ist Monaco-Ville: Dies ist der Name Monaco mit der Erweiterung ''-Ville''. Zeige den Namen und die Erweiterung, bei denen die Hauptstadt eine richtige (nicht leere) Erweiterung des Landesnamens ist. Du kannst die SQL-Funktion REPLACE verwenden. ',
 '',
 'SELECT name, SUBSTRING(capital, LENGTH(name) + 1, LENGTH(capital)) as ext FROM world WHERE capital LIKE CONCAT(name, ''%'') AND capital <> name;',
 'Aufgabe 15',
 '15'),
(1, 3,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1'), 
(1, 4,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1'), 
(1, 5,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1'), 
(1, 6,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1'),
(1, 7,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1'), 
(1, 8,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1'), 
(1, 9,
 'Testaufgabe',
 '',
 '',
 'Aufgabe 1',
 '1');

