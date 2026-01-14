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
 'Schauen Sie sich das Ergebnis nach Ausführung dieses SQL-Befehls an, um den Namen, den Kontinent und die Bevölkerung aller Länder anzuzeigen. (Es wird keine Änderung der Abfrage erwartet.)',
 'SELECT name, continent, population FROM world',
 'SELECT name, continent, population FROM world',
 'Aufgabe 1',
 '1'), 
(2, 3,
 'Zeigen Sie den Namen der Länder an, die eine Bevölkerung von mindestens 200 Millionen haben. 200 Millionen sind 200000000 (8 Nullen).',
 'SELECT name FROM world WHERE population = 64105700',
 'SELECT name FROM world WHERE population >= 200000000;',
 'Aufgabe 2',
 '2'), 
(3, 3,
 'Geben Sie den Namen und das Pro-Kopf-BIP (per capita GDP) der Länder mit einer Bevölkerung von mindestens 200 Millionen an.',
 '',
 'SELECT name, (gdp / population) FROM world WHERE population >= 200000000',
 'Aufgabe 3',
 '3'), 
(4, 3,
 'Zeigt den Namen und die Bevölkerungszahl in Millionen für die Länder des Kontinents „South America“ an. Teilen Sie die Bevölkerung durch 1000000, um die Bevölkerung in Millionen zu erhalten.',
 '',
 'SELECT name, (population / 1000000) FROM world WHERE continent = ''South America'';',
 'Aufgabe 4',
 '4'), 
(5, 3,
 'Zeigen Sie den Namen und die Bevölkerungsanzahl für Frankreich, Deutschland und Italien (France, Germany, Italy) an.',
 '',
 'SELECT name, population FROM world WHERE name in (''France'', ''Germany'', ''Italy'')',
 'Aufgabe 5',
 '5'), 
(6, 3,
 'Zeigen Sie die Länder an, deren Namen das Wort „United“ enthalten.',
 '',
 'SELECT name FROM world WHERE name LIKE ''United%'';',
 'Aufgabe 6',
 '6'), 
(7, 3,
 'Ein Land ist groß, wenn es eine Fläche von mehr als 3 Millionen Quadratkilometern hat oder eine Bevölkerung von mehr als 250 Millionen hat. Zeigen Sie die Länder an, die flächenmäßig oder bevölkerungsmäßig groß sind. Gebe Name, Bevölkerungsanzahl und Gebiet (area) aus.',
 '',
 'SELECT name, population, area FROM world WHERE area > 3000000 OR population > 250000000;',
 'Aufgabe 7',
 '7'), 
(8, 3,
 'Exklusives ODER (XOR nicht unterstützt in PostgreSQL). Zeigen Sie die Länder an, die flächenmäßig groß (mehr als 3 Millionen) oder bevölkerungsreich (mehr als 250 Millionen) sind, aber nicht beides. Gebe Name, Bevölkerungsanzahl und Gebiet (area) aus.',
 '',
 'SELECT name, population, area FROM world WHERE (area > 3000000 AND population <= 250000000) OR (area <= 3000000 AND population > 250000000);',
 'Aufgabe 8',
 '8'), 
(9, 3,
 'Zeigen Sie den Namen und die Bevölkerung in Millionen sowie das GDP in Milliarden für die Länder des Kontinents „South America“ an. Verwenden Sie die ROUND-Funktion, um die Werte mit zwei Dezimalstellen anzuzeigen.',
 '',
 'SELECT name, ROUND(population / 1000000, 2), ROUND(gdp / 1000000000, 2) FROM world WHERE continent = ''South America'';',
 'Aufgabe 9',
 '9'), 
(10, 3,
 'Zeigen Sie den Namen und das GDP der Länder mit einem GDP von mindestens einer Billion (1000000000000; das sind 12 Nullen) an. Runden Sie diesen Wert auf die nächste 1000.',
 '',
 'SELECT name, ROUND(gdp / population, -3) as per_capita_gdp FROM world WHERE gdp >= 1000000000000;',
 'Aufgabe 10',
 '10'), 
(11, 3,
 'Griechenland (Greece) hat die Hauptstadt Athen (Athens). Jede der Zeichenfolgen „Greece“ und „Athens“ besteht aus 6 Zeichen. Zeigen Sie den Namen und die Hauptstadt an, wenn der Name und die Hauptstadt die gleiche Anzahl an Zeichen haben. Mit der LENGTH-Funktion können Sie die Anzahl der Zeichen in einer Zeichenfolge ermitteln.',
 '',
 'SELECT name, capital FROM world WHERE LENGTH(name) = LENGTH(capital);',
 'Aufgabe 11',
 '11'), 
(12, 3,
 'Die Hauptstadt Schwedens ist Stockholm. Beide Wörter beginnen mit dem Buchstaben „S“. Zeigen Sie den Namen und die Hauptstadt an, wobei die Anfangsbuchstaben jedes Eintrags übereinstimmen. Schließen Sie keine Länder ein, in denen Name und Hauptstadt dasselbe Wort sind. Mit der Funktion LEFT können Sie das erste Zeichen isolieren. Sie können <> als NOT EQUALS-Operator verwenden.',
 '',
 'SELECT name, capital FROM world WHERE LEFT(name, 1) = LEFT(capital, 1) AND name <> capital;',
 'Aufgabe 12',
 '12'), 
(13, 3,
 'Equatorial Guinea und Dominican Republic haben alle Vokale (a e i o u) im Namen. Sie zählen nicht, weil ihr Name mehr als ein Wort enthält. Finden Sie das Land, dessen Name alle Vokale und keine Leerzeichen enthält. Sie können die Phrase name NOT LIKE ''%a%'' verwenden, um Zeichen aus Ihren Ergebnissen auszuschließen. In der angezeigten Default Abfrage werden Länder wie die Bahamas und Belarus nicht berücksichtigt, da sie mindestens ein „a“ enthalten.',
 'SELECT name FROM world WHERE name LIKE ''B%'' AND name NOT LIKE ''%a%''',
 'SELECT name FROM world WHERE name LIKE ''%a%'' AND name LIKE ''%e%'' AND name LIKE ''%i%'' AND name LIKE ''%o%'' AND name LIKE ''%u%'' AND name NOT LIKE ''% %'';',
 'Aufgabe 13',
 '13'), 
(1, 4,
 'Listen Sie jeden Ländernamen auf, dessen Bevölkerung größer ist als die von „Russia“.',
 'SELECT name FROM world WHERE population > (SELECT population FROM world WHERE name=''Romania'')',
 'SELECT name FROM world WHERE population > (SELECT population from world WHERE name = ''Russia'');',
 'Aufgabe 1',
 '1'), 
(2, 4,
 'Zeigen Sie die Länder in Europa an, deren GDP pro Kopf größer ist als das vom „United Kingdom“.',
 '',
 'SELECT name FROM world WHERE continent = ''Europe'' AND (gdp / population) > (SELECT (gdp / population) from world WHERE name = ''United Kingdom'');',
 'Aufgabe 2',
 '2'), 
(3, 4,
 'Listen Sie den Namen und den Kontinent aller Länder auf, deren Kontinent entweder Argentina oder Australia als Land enthält. Sortierung alphabetisch nach Ländernamen.',
 '',
 'SELECT name, continent FROM world WHERE continent IN (SELECT continent FROM world WHERE name = ''Argentina'' OR name = ''Australia'') ORDER BY name;',
 'Aufgabe 3',
 '3'), 
(4, 4,
 'Welches Land hat mehr Einwohner als Canada, aber weniger als Poland? Zeigen Sie den Namen und die Bevölkerungsanzahl an.',
 '',
 'SELECT name, population FROM world WHERE population > ( SELECT population FROM world WHERE name = ''Canada'') AND population < ( SELECT population FROM world WHERE name = ''Poland'');',
 'Aufgabe 4',
 '4'), 
(5, 4,
 'Deutschland (80 Millionen Einwohner) ist das bevölkerungsreichste Land Europas. In Österreich (8,5 Millionen Einwohner) leben 11 % der Bevölkerung Deutschlands. Zeigen Sie den Namen und die Bevölkerung jedes Landes in Europa (Europe) an. Zeigen Sie die Bevölkerung als Prozentsatz der Bevölkerung Deutschlands an.',
 '',
 'SELECT name, CONCAT(ROUND((population / (SELECT population FROM world WHERE name = ''Germany'') * 100)), ''%'') FROM world WHERE continent = ''Europe'';',
 'Aufgabe 5',
 '5'), 
(6, 4,
 'Welche Länder haben ein höheres GDP als jedes europäische Land? [Geben Sie nur den Namen an.] (Achtung: Einige Länder haben möglicherweise NULL-Werte für GDP.)',
 '',
 'SELECT name FROM world WHERE gdp > ALL(SELECT gdp FROM world WHERE (continent = ''Europe'') AND (gdp > 0));',
 'Aufgabe 6',
 '6'), 
(7, 4,
 'Finden Sie das flächenmäßig größte Land auf jedem Kontinent und zeigen Sie den Kontinent, den Namen und die Fläche an: Das Beispiel wird als korrelierte oder synchronisierte Unterabfrage bezeichnet.',
 'SELECT continent, name, population FROM world x WHERE population >= ALL (SELECT population FROM world y WHERE y.continent=x.continent AND population>0)',
 'SELECT continent, name, area FROM world AS x WHERE area >= ALL (SELECT area FROM world AS y WHERE y.continent = x.continent AND area > 0);',
 'Aufgabe 7',
 '7'), 
(8, 4,
 'Listen Sie jeden Kontinent und den Namen des Landes auf, das für diesen Kontinent alphabetisch an erster Stelle steht.',
 '',
 'SELECT continent, MIN(name) FROM world GROUP BY continent;',
 'Aufgabe 8',
 '8'), 
(9, 4,
 'Suchen Sie die Kontinente, auf denen alle Länder eine Bevölkerung von <= 25000000 haben. Suchen Sie dann die Namen der Länder, die diesen Kontinenten zugeordnet sind. Geben Sie Name, Kontinent und Bevölkerung aus.',
 '',
 'SELECT name, continent, population FROM world AS x WHERE 25000000 > ALL ( SELECT population FROM world AS y WHERE y.continent = x.continent AND population > 0);',
 'Aufgabe 9',
 '9'), 
(10, 4,
 'In manchen Ländern leben mehr als dreimal so viele Menschen wie in allen Nachbarländern (auf demselben Kontinent). Geben Sie die Länder und Kontinente an.',
 '',
 'SELECT name, continent FROM world AS x WHERE population > ALL ( SELECT population * 3 FROM world as y WHERE y.continent = x.continent AND y.name <> x.name);',
 'Aufgabe 10',
 '10'), 
(1, 5,
 'Zeigen Sie die Gesamtbevölkerungsanzahl der Welt an.',
 '',
 'SELECT SUM(population) FROM world;',
 'Aufgabe 1',
 '1'), 
(2, 5,
 'Listen Sie alle Kontinente auf – jeweils nur einmal.',
 '',
 'SELECT DISTINCT continent FROM world;',
 'Aufgabe 2',
 '2'), 
(3, 5,
 'Geben Sie das gesamte GDP Afrikas an.',
 '',
 'SELECT SUM(gdp) FROM world WHERE continent = ''Africa'';',
 'Aufgabe 3',
 '3'), 
(4, 5,
 'Wie viele Länder haben eine Fläche von mindestens 1.000.000?',
 '',
 'SELECT COUNT(area) FROM world WHERE area >= 1000000;',
 'Aufgabe 4',
 '4'), 
(5, 5,
 'Wie groß ist die Gesamtbevölkerung von (''Estonia'', ''Latvia'', ''Lithuania'')?',
 '',
 'SELECT SUM(population) FROM world WHERE name IN (''Estonia'', ''Latvia'', ''Lithuania'');',
 'Aufgabe 5',
 '5'), 
(6, 5,
 'Zeigen Sie für jeden Kontinent den Kontinent und die Anzahl der Länder des Kontinents an.',
 '',
 'SELECT continent, COUNT(name) FROM world GROUP BY continent;',
 'Aufgabe 6',
 '6'), 
(7, 5,
 'Geben Sie für jeden Kontinent den Kontinent und die Anzahl der Länder mit einer Bevölkerung von mindestens 10 Millionen an.',
 '',
 'SELECT continent, COUNT(name) FROM world WHERE population > 10000000 GROUP BY continent;',
 'Aufgabe 7',
 '7'), 
(8, 5,
 'Listen Sie die Kontinente auf, die eine Gesamtbevölkerung von mindestens 100 Millionen haben.',
 '',
 'SELECT continent FROM world GROUP BY continent HAVING SUM(population) >= 100000000;',
 'Aufgabe 8',
 '8'), 
(1, 6,
 'Das erste Beispiel zeigt ein Tor, das von einem Spieler mit dem Nachnamen ''Bender'' erzielt wurde. Das * bedeutet, dass alle Spalten in der Tabelle aufgelistet werden sollen - eine kürzere Möglichkeit, matchid, teamid, player, gtime zu sagen.

      Ändere es so, dass die matchid und der Spielername für alle Tore, die von Deutschland erzielt wurden, angezeigt werden. Um deutsche Spieler zu identifizieren, prüfe: teamid = ''GER''',
 'SELECT * FROM goal 
    WHERE player LIKE ''%Bender''',
 'SELECT matchid, player
    FROM goal
    WHERE teamid = ''GER'';',
 'Aufgabe 1',
 '1'),
(2, 6,
 'Aus der vorherigen Abfrage kannst du sehen, dass Lars Bender in Spiel 1012 ein Tor erzielt hat. Jetzt wollen wir wissen, welche Teams in diesem Spiel gespielt haben.

      Beachte, dass die Spalte matchid in der goal-Tabelle der Spalte id in der game-Tabelle entspricht. Wir können Informationen über Spiel 1012 finden, indem wir diese Zeile in der game-Tabelle suchen.
      
      Zeige id, stadium, team1, team2 nur für Spiel 1012',
 'SELECT id,stadium,team1,team2
    FROM game',
 'SELECT id,stadium,team1,team2
    FROM game
    WHERE id = 1012;',
 'Aufgabe 2',
 '2'),
(3, 6,
 'Du kannst die beiden Schritte in einer einzigen Abfrage mit einem JOIN kombinieren.

   
    Die FROM-Klausel sagt, dass Daten aus der goal-Tabelle mit denen aus der game-Tabelle zusammengeführt werden sollen. Die ON-Bedingung gibt an, wie man herausfindet, welche Zeilen in game zu welchen Zeilen in goal gehören - die matchid aus goal muss mit der id aus game übereinstimmen. (Wenn wir klarer/spezifischer sein wollten, könnten wir sagen
    ON (game.id=goal.matchid)
    
    Der untenstehende Code zeigt den Spieler (aus goal) und den Stadionnamen (aus der game-Tabelle) für jedes erzielte Tor.
    
    Ändere es so, dass der Spieler, teamid, stadium und mdate für jedes deutsche Tor angezeigt werden.',
 'SELECT player,stadium
    FROM game JOIN goal ON (id=matchid)',
 'SELECT goal.player, goal.teamid, game.stadium, game.mdate
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.teamid = ''GER'';',
 'Aufgabe 3',
 '3'),
(4, 6,
 ' Verwende das gleiche JOIN wie in der vorherigen Frage.

      Zeige team1, team2 und player für jedes Tor, das von einem Spieler namens Mario erzielt wurde (player LIKE ''Mario%'')',
 '',
 'SELECT game.team1, game.team2, goal.player
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.player LIKE ''Mario%'';',
 'Aufgabe 4',
 '4'),
(5, 6,
 'Die Tabelle eteam gibt Details zu jedem Nationalteam, einschließlich des Trainers. Du kannst goal mit eteam verbinden, indem du den Ausdruck goal JOIN eteam on teamid=id verwendest.

      Zeige player, teamid, coach, gtime für alle Tore, die in den ersten 10 Minuten erzielt wurden (gtime<=10)',
 'SELECT player, teamid, gtime
    FROM goal 
   WHERE gtime<=10',
 'SELECT goal.player, goal.teamid, eteam.coach, goal.gtime
      FROM goal
      INNER JOIN eteam
      ON goal.teamid = eteam.id
      WHERE goal.gtime <= 10;',
 'Aufgabe 5',
 '5'),
(6, 6,
 'Um game mit eteam zu verbinden, könntest du entweder
      game JOIN eteam ON (team1=eteam.id) oder game JOIN eteam ON (team2=eteam.id) verwenden.
      
      Beachte, dass, weil id sowohl in game als auch in eteam eine Spalte ist, du eteam.id anstelle von nur id angeben musst.
      
      Liste die Daten der Spiele und den Namen des Teams auf, bei dem ''Fernando Santos'' der Trainer von team1 war.',
 '',
 'SELECT game.mdate, eteam.teamname
    FROM game
    INNER JOIN eteam
    ON game.team1 = eteam.id
    WHERE eteam.coach = ''Fernando Santos'';',
 'Aufgabe 6',
 '6'),
(7, 6,
 'Liste die Spieler für jedes Tor auf, das in einem Spiel erzielt wurde, bei dem das Stadion ''National Stadium, Warsaw'' war.',
 '',
 'SELECT goal.player
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE game.stadium = ''National Stadium, Warsaw'';',
 'Aufgabe 7',
 '7'),
(8, 6,
 'Die Beispielabfrage zeigt alle Tore, die im Viertelfinale Deutschland-Griechenland erzielt wurden.
      Zeige stattdessen die Namen aller Spieler, die über das ganze Turnier hinweg ein Tor gegen Deutschland 
      erzielt haben.',
 'SELECT player, gtime
    FROM game JOIN goal ON matchid = id 
      WHERE (team1=''GER'' AND team2=''GRE'')',
 'SELECT DISTINCT goal.player
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE goal.teamid <> ''GER''
        AND (game.team1 = ''GER'' OR game.team2 = ''GER'');',
 'Aufgabe 8',
 '8'),
(9, 6,
 'Zeige die Namen der Teams und die Gesamtzahl der erzielten Tore für das jeweilige Team. 
      (Teams ohne Tore werden nicht berücksichtigt)',
 'SELECT teamname, player
    FROM eteam JOIN goal ON id=teamid
   ORDER BY teamname',
 'SELECT eteam.teamname, COUNT(goal.teamid)
      FROM goal
      INNER JOIN eteam
      ON eteam.id = goal.teamid
      GROUP BY eteam.teamname;',
 'Aufgabe 9',
 '9'),
(10, 6,
 'Zeige das Stadion und die Anzahl der im jeweiligen Stadion erzielten Tore.',
 '',
 'SELECT game.stadium, COUNT(goal.matchid)
      FROM game
      INNER JOIN goal
      ON game.id = goal.matchid
      GROUP BY game.stadium;',
 'Aufgabe 10',
 '10'),
(11, 6,
 'Für jedes Spiel, an dem Polen (Teamid ''POL'') beteiligt war, zeige die matchid, das Datum und die Anzahl
       der erzielten Tore (soll total_goals im Ergebnis heißen).',
 'SELECT matchid,mdate, team1, team2,teamid
    FROM game JOIN goal ON matchid = id 
   WHERE (team1 = ''POL'' OR team2 = ''POL'')',
 'SELECT
      goal.matchid,
      game.mdate,
      COUNT(goal.matchid) AS total_goals
    FROM game
    INNER JOIN goal ON goal.matchid = game.id
    WHERE game.team1 = ''POL'' OR game.team2 = ''POL''
    GROUP BY goal.matchid, game.mdate;',
 'Aufgabe 11',
 '11'),
(12, 6,
 'Für jedes Spiel, in dem ''GER'' ein Tor erzielt hat, zeige matchid, Spieldatum und die Anzahl der von 
      ''GER'' erzielten Tore (soll german_goals im Ergebnis heißen). 
      (Spiele ohne deutsche Tore werden nicht berücksichtigt)',
 '',
 'SELECT
      goal.matchid,
      game.mdate,
      COUNT(goal.matchid) AS german_goals
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.teamid = ''GER''
    GROUP BY goal.matchid, game.mdate;',
 'Aufgabe 12',
 '12'),
(13, 6,
 '',
 '',
 '',
 'Aufgabe 13',
 '13'),
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

