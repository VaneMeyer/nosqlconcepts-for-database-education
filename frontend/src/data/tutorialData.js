//Aufgabenstellungen aus dem Englischen übersetzt von https://www.sqlzoo.net/wiki/
//Lösungen basierend auf https://github.com/MERatio/sql_zoo?tab=readme-ov-file

import React from "react";

export const topics = [
  { name: "SELECT basics", link: "basics" },
  { name: "SELECT names", link: "names" },
  { name: "SELECT Quiz", link: "selectquiz" },
  { name: "SELECT from World", link: "selectfromworld" },
  { name: "BBC Quiz", link: "bbcquiz" },
  { name: "SELECT within SELECT", link: "selectwithinselect" },
  { name: "Nested SELECT Quiz", link: "nestedselectquiz" },
  { name: "SUM and COUNT", link: "sumandcount" },
  { name: "SUM and COUNT Quiz", link: "sumandcountquiz" },
  { name: "The JOIN operation", link: "joinoperation" },
  { name: "JOIN Quiz", link: "joinquiz" },
  { name: "More JOIN operations", link: "morejoinoperations" },

  /*{ name: "Using Null", link: "usingnull" },
  { name: "Numeric Examples", link: "numericexamples" },
  { name: "Window function", link: "windowfunction" },
  { name: "Self join", link: "selfjoin" },
  { name: "Self join Quiz", link: "selfjoinquiz" }, */
];

export const basicsTasks = [
  {
    description:
      "Aufgabe 1: Das Beispiel verwendet eine WHERE-Klausel, um die Bevölkerung von „Frankreich“ anzuzeigen. Beachten Sie, dass Zeichenfolgen in einfachen Anführungszeichen stehen sollten. Ändern Sie das folgende SQL Statement, um die Bevölkerung Deutschlands (Germany) anzuzeigen",
    defaultQuery: "SELECT population FROM world WHERE name = 'France'",
    solution: "SELECT population FROM world WHERE name = 'Germany'",
  },
  {
    description:
      "Aufgabe 2: Überprüfung einer Liste: Das Wort IN ermöglicht es uns zu überprüfen, ob ein Element in einer Liste vorhanden ist. Das folgende Beispiel zeigt den Namen und die Bevölkerung für die Länder 'Brasilien', 'Russland', 'Indien' und 'China'. Zeigen Sie den Namen und die Bevölkerung für 'Schweden', 'Norwegen' und 'Dänemark' ('Sweden', 'Norway' and 'Denmark') an.",
    defaultQuery:
      "SELECT name, population FROM world WHERE name IN ('Brazil', 'Russia', 'India', 'China');",
    solution:
      "SELECT name, population FROM world WHERE name IN ('Sweden', 'Norway', 'Denmark');",
  },
  {
    description:
      "Aufgabe 3: Welche Länder sind weder zu klein noch zu groß? Mittels BETWEEN lässt sich Bereichsprüfung durchführen (der angegebene Bereich schließt die Grenzwerte mit ein). Das folgende Beispiel zeigt Länder mit einer Fläche von 250.000-300.000 km². Passen Sie es an, um das Land und die Fläche für Länder mit einer Fläche zwischen 200.000 und 250.000 zu zeigen.",
    defaultQuery:
      "SELECT name, area FROM world WHERE area BETWEEN 250000 AND 300000",
    solution:
      "SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000;",
  },
];
export const namesTasks = [
  {
    description:
      "Aufgabe 1: Du kannst WHERE name LIKE 'B%' verwenden, um die Länder zu finden, die mit 'B' beginnen. Das % ist ein Platzhalter, der zu beliebigen Zeichen passen kann. Finde das Land, das mit Y beginnt.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'F%'",
    solution: "SELECT name FROM world WHERE name LIKE 'Y%';",
  },
  {
    description: "Aufgabe 2: Finde die Länder, die mit Y enden.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
    solution: "SELECT name FROM world WHERE name LIKE '%Y';",
  },
  {
    description:
      "Aufgabe 3: Luxemburg hat ein x - ebenso wie ein anderes Land. Liste beide auf. Finde die Länder, die den Buchstaben x enthalten.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
    solution: "SELECT name FROM world WHERE name LIKE '%x%';",
  },
  {
    description:
      "Aufgabe 4: Iceland, Switzerland enden mit 'land' - aber gibt es noch andere? Finde die Länder, die mit 'land' enden.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
    solution: "SELECT name FROM world WHERE name LIKE '%land';",
  },
  {
    description:
      "Aufgabe 5: Columbia beginnt mit einem C und endet mit ia - es gibt zwei weitere Länder wie dieses. Finde die Länder, die mit C beginnen und mit ia enden.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
    solution: "SELECT name FROM world WHERE name LIKE 'C%ia';",
  },
  {
    description:
      "Aufgabe 6: Greece hat ein doppeltes e - wer hat ein doppeltes o? Finde das Land, das oo im Namen hat.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE '%ee%'",
    solution: "SELECT name FROM world WHERE name LIKE '%oo%';",
  },
  {
    description:
      "Aufgabe 7: Die Bahamas haben drei a - wer noch? Finde die Länder, die drei oder mehr a im Namen haben.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
    solution: "SELECT name FROM world WHERE name LIKE '%a%a%a%';",
  },
  {
    description:
      "Aufgabe 8: India und Angola haben ein 'n' als zweites Zeichen. Du kannst den Unterstrich als Platzhalter für ein einzelnes Zeichen verwenden.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE '_n%' ORDER BY name",
    solution: "SELECT name FROM world WHERE name LIKE '_t%' ORDER BY name;",
  },
  {
    description:
      "Aufgabe 9: Lesotho und Moldowa haben beide zwei 'o'-Zeichen, die von zwei anderen Zeichen getrennt sind. Finde die Länder, die zwei 'o'-Zeichen haben, die von zwei anderen Zeichen getrennt sind.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE '_n%'",
    solution: "SELECT name FROM world WHERE name LIKE '%o__o%';",
  },
  {
    description:
      "Aufgabe 10: Kuba und Togo haben Namen mit vier Buchstaben. Finde die Länder, die genau vier Buchstaben im Namen haben.",
    defaultQuery: "SELECT name FROM world WHERE name LIKE 'Cu%'",
    solution: "SELECT name FROM world WHERE name LIKE '____';",
  },
  {
    description:
      "Aufgabe 11:  Die Hauptstadt von Luxemburg ist Luxemburg. Zeige alle Länder, in denen die Hauptstadt denselben Namen wie das Land hat. Finde das Land, in dem der Name der Hauptstadt (capital) dem Namen des Landes (name) entspricht.",
    defaultQuery:
      "SELECT name, capital, continent FROM world WHERE name LIKE '%x%'",
    solution: "SELECT name FROM world WHERE name = capital;",
  },
  {
    description:
      "Aufgabe 12:  Die Hauptstadt von Mexiko ist Mexiko City. Zeige alle Länder, in denen die Hauptstadt den Namen des Landes zusammen mit dem Wort 'City' enthält. Finde das Land, in dem die Hauptstadt (capital) den Namen des Landes zusammen mit 'City' enthält.",
    defaultQuery:
      "SELECT name, concat(name, 'town') FROM world WHERE name LIKE '%ina%'",
    solution: "SELECT name FROM world WHERE capital = CONCAT(name, ' City');",
  },
  {
    description:
      "Aufgabe 13:  Finde die Hauptstadt und den Namen, bei denen die Hauptstadt den Namen des Landes enthält.",
    defaultQuery: "",
    solution:
      "SELECT capital, name FROM world WHERE capital LIKE CONCAT('%', name, '%');",
  },
  {
    description:
      "Aufgabe 14:  Finde die Hauptstadt und den Namen, bei denen die Hauptstadt eine Erweiterung des Landesnamens ist. Du solltest Mexico City einschließen, da es länger ist als Mexico. Du solltest Luxemburg nicht einschließen, da die Hauptstadt denselben Namen wie das Land hat.",
    defaultQuery: "",
    solution:
      "SELECT capital, name FROM world WHERE capital LIKE CONCAT(name, '%') AND capital <> name;",
  },
  {
    description:
      "Aufgabe 15:  Die Hauptstadt von Monaco ist Monaco-Ville: Dies ist der Name Monaco und die Erweiterung ist -Ville. Zeige den Namen und die Erweiterung, bei denen die Hauptstadt eine richtige (nicht leere) Erweiterung des Landesnamens ist. Du kannst die SQL-Funktion REPLACE verwenden.",
    defaultQuery: "",
    solution:
      "SELECT name, SUBSTRING(capital, LENGTH(name) + 1, LENGTH(capital)) as ext FROM world WHERE capital LIKE CONCAT(name, '%') AND capital <> name;",
  },
];

export const selectfromworldTasks = [
  {
    description:
      "Aufgabe 1: Beobachten Sie das Ergebnis der Ausführung dieses SQL-Befehls, um den Namen, den Kontinent und die Bevölkerung aller Länder anzuzeigen.",
    defaultQuery: "SELECT name, continent, population FROM world",
    solution: "SELECT name, continent, population FROM world",
  },
  {
    description:
      "Aufgabe 2: Zeigen Sie den Namen der Länder an, die eine Bevölkerung von mindestens 200 Millionen haben. 200 Millionen sind 200000000, es gibt acht Nullen.",
    defaultQuery: "SELECT name FROM world WHERE population = 64105700",
    solution: "SELECT name FROM world WHERE population >= 200000000;",
  },
  {
    description:
      "Aufgabe 3: Geben Sie den Namen und das Pro-Kopf-BIP (per capita GDP) der Länder mit einer Bevölkerung von mindestens 200 Millionen an.",
    defaultQuery: "",
    solution:
      "SELECT name, (gdp / population) FROM world WHERE population >= 200000000",
  },
  {
    description:
      "Aufgabe 4: Zeigt den Namen und die Bevölkerungszahl in Millionen für die Länder des Kontinents „South America“ an. Teilen Sie die Bevölkerung durch 1000000, um die Bevölkerung in Millionen zu erhalten.",
    defaultQuery: "",
    solution:
      "SELECT name, (population / 1000000) FROM world WHERE continent = 'South America';",
  },
  {
    description:
      "Aufgabe 5: Zeigen Sie den Namen und die Bevölkerungsanzahl für Frankreich, Deutschland und Italien (France, Germany, Italy) an.",
    defaultQuery: "",
    solution:
      "SELECT name, population FROM world WHERE name in ('France', 'Germany', 'Italy')",
  },
  {
    description:
      "Aufgabe 6: Zeigt die Länder an, deren Namen das Wort „United“ enthalten.",
    defaultQuery: "",
    solution: "SELECT name FROM world WHERE name LIKE 'United%';",
  },
  {
    description:
      "Aufgabe 7: Zwei Möglichkeiten, groß zu sein: Ein Land ist groß, wenn es eine Fläche von mehr als 3 Millionen Quadratkilometern hat oder eine Bevölkerung von mehr als 250 Millionen hat. Zeigen Sie die Länder an, die flächenmäßig oder bevölkerungsmäßig groß sind. Gebe Name, Bevölkerungsanzahl und Gebiet (area) aus.",
    defaultQuery: "",
    solution:
      "SELECT name, population, area FROM world WHERE area > 3000000 OR population > 250000000;",
  },
  {
    description:
      "Aufgabe 8: Exklusives ODER (XOR not existing in PostgreSQL). Zeigen Sie die Länder an, die flächenmäßig groß (mehr als 3 Millionen) oder bevölkerungsreich (mehr als 250 Millionen) sind, aber nicht beides. Gebe Name, Bevölkerungsanzahl und Gebiet (area) aus.",
    defaultQuery: "",
    solution:
      "SELECT name, population, area FROM world WHERE (area > 3000000 AND population <= 250000000) OR (area <= 3000000 AND population > 250000000);",
  },
  {
    description:
      "Aufgabe 9: Zeigen Sie den Namen und die Bevölkerung in Millionen sowie das GDP in Milliarden für die Länder des Kontinents „South America“ an. Verwenden Sie die ROUND-Funktion, um die Werte mit zwei Dezimalstellen anzuzeigen.",
    defaultQuery: "",
    solution:
      "SELECT name, ROUND(population / 1000000, 2), ROUND(gdp / 1000000000, 2) FROM world WHERE continent = 'South America';",
  },
  {
    description:
      "Aufgabe 10: Zeigen Sie den Namen und das GDP der Länder mit einem GDP von mindestens einer Billion (1000000000000; das sind 12 Nullen) an. Runden Sie diesen Wert auf die nächste 1000.",
    defaultQuery: "",
    solution:
      "SELECT name, ROUND(gdp / population, -3) as per_capita_gdp FROM world WHERE gdp >= 1000000000000;",
  },
  {
    description:
      "Aufgabe 11: Griechenland (Greece) hat die Hauptstadt Athen (Athens). Jede der Zeichenfolgen „Greece“ und „Athens“ besteht aus 6 Zeichen. Zeigen Sie den Namen und die Hauptstadt an, wenn der Name und die Hauptstadt die gleiche Anzahl an Zeichen haben. Mit der LENGTH-Funktion können Sie die Anzahl der Zeichen in einer Zeichenfolge ermitteln",
    defaultQuery: "",
    solution:
      "SELECT name, capital FROM world WHERE LENGTH(name) = LENGTH(capital);",
  },
  {
    description:
      "Aufgabe 12: Die Hauptstadt Schwedens ist Stockholm. Beide Wörter beginnen mit dem Buchstaben „S“. Zeigen Sie den Namen und die Hauptstadt an, wobei die Anfangsbuchstaben jedes Eintrags übereinstimmen. Schließen Sie keine Länder ein, in denen Name und Hauptstadt dasselbe Wort sind. Mit der Funktion LEFT können Sie das erste Zeichen isolieren. Sie können <> als NOT EQUALS-Operator verwenden.",
    defaultQuery: "",
    solution:
      "SELECT name, capital FROM world WHERE LEFT(name, 1) = LEFT(capital, 1) AND name <> capital;",
  },
  {
    description:
      "Aufgabe 13: Equatorial Guinea und Dominican Republic haben alle Vokale (a e i o u) im Namen. Sie zählen nicht, weil ihr Name mehr als ein Wort enthält. Finden Sie das Land, dessen Name alle Vokale und keine Leerzeichen enthält. Sie können die Phrase name NOT LIKE '%a%' verwenden, um Zeichen aus Ihren Ergebnissen auszuschließen. In der angezeigten Default Abfrage werden Länder wie die Bahamas und Belarus nicht berücksichtigt, da sie mindestens ein „a“ enthalten.",
    defaultQuery:
      "SELECT name FROM world WHERE name LIKE 'B%' AND name NOT LIKE '%a%'",
    solution:
      "SELECT name FROM world WHERE name LIKE '%a%' AND name LIKE '%e%' AND name LIKE '%i%' AND name LIKE '%o%' AND name LIKE '%u%' AND name NOT LIKE '% %';",
  },
];
export const selectwithinselectTasks = [
  {
    description:
      "Aufgabe 1: Listen Sie jeden Ländernamen auf, dessen Bevölkerung größer ist als die von „Russia“.",
    defaultQuery:
      "SELECT name FROM world WHERE population > (SELECT population FROM world WHERE name='Romania')",
    solution:
      "SELECT name FROM world WHERE population > (SELECT population from world WHERE name = 'Russia');",
  },
  {
    description:
      "Aufgabe 2: Zeigen Sie die Länder in Europa an, deren GDP größer ist als „United Kingdom“.",
    defaultQuery: "",
    solution:
      "SELECT name FROM world WHERE continent = 'Europe' AND (gdp / population) > (SELECT (gdp / population) from world WHERE name = 'United Kingdom');",
  },
  {
    description:
      "Aufgabe 3: Listen Sie den Namen und den Kontinent der Länder auf, die entweder Argentina oder Australia enthalten. Sortierung nach Ländernamen.",
    defaultQuery: "",
    solution:
      "SELECT name, continent FROM world WHERE continent IN (SELECT continent FROM world WHERE name = 'Argentina' OR name = 'Australia') ORDER BY name;",
  },
  {
    description:
      "Aufgabe 4: Welches Land hat mehr Einwohner als Canada, aber weniger als Poland? Zeigen Sie den Namen und die Bevölkerungsanzahl an.",
    defaultQuery: "",
    solution:
      "SELECT name, population FROM world WHERE population > ( SELECT population FROM world WHERE name = 'Canada') AND population < ( SELECT population FROM world WHERE name = 'Poland');",
  },
  {
    description:
      "Aufgabe 5: Deutschland (80 Millionen Einwohner) ist das bevölkerungsreichste Land Europas. In Österreich (8,5 Millionen Einwohner) leben 11 % der Bevölkerung Deutschlands. Zeigen Sie den Namen und die Bevölkerung jedes Landes in Europa (Europe) an. Zeigen Sie die Bevölkerung als Prozentsatz der Bevölkerung Deutschlands an.",
    defaultQuery: "",
    solution:
      "SELECT name, CONCAT(ROUND((population / (SELECT population FROM world WHERE name = 'Germany') * 100)), '%') FROM world WHERE continent = 'Europe';",
  },
  {
    description:
      "Aufgabe 6: Welche Länder haben ein höheres GDP als jedes andere Land in Europa? [Geben Sie nur den Namen an.] (Einige Länder haben möglicherweise NULL-Werte für GDP.)",
    defaultQuery: "",
    solution:
      "SELECT name FROM world WHERE gdp > ALL(SELECT gdp FROM world WHERE (continent = 'Europe') AND (gdp > 0));",
  },
  {
    description:
      "Aufgabe 7: Finden Sie das flächenmäßig größte Land auf jedem Kontinent und zeigen Sie den Kontinent, den Namen und die Fläche an: Das Beispiel wird als korrelierte oder synchronisierte Unterabfrage bezeichnet.",
    defaultQuery:
      "SELECT continent, name, population FROM world x WHERE population >= ALL (SELECT population FROM world y WHERE y.continent=x.continent AND population>0)",
    solution:
      "SELECT continent, name, area FROM world AS x WHERE area >= ALL (SELECT area FROM world AS y WHERE y.continent = x.continent AND area > 0);",
  },
  {
    description:
      "Aufgabe 8: Listen Sie jeden Kontinent und den Namen des Landes auf, das alphabetisch an erster Stelle steht.",
    defaultQuery: "",
    solution: "SELECT continent, MIN(name) FROM world GROUP BY continent;",
  },
  {
    description:
      "Aufgabe 9: Suchen Sie die Kontinente, auf denen alle Länder eine Bevölkerung von <= 25000000 haben. Suchen Sie dann die Namen der Länder, die diesen Kontinenten zugeordnet sind. Geben Sie Name, Kontinent und Bevölkerung aus.",
    defaultQuery: "",
    solution:
      "SELECT name, continent, population FROM world AS x WHERE 25000000 > ALL ( SELECT population FROM world AS y WHERE y.continent = x.continent AND population > 0);",
  },
  {
    description:
      "Aufgabe 10: In manchen Ländern leben mehr als dreimal so viele Menschen wie in allen Nachbarländern (auf demselben Kontinent). Geben Sie die Länder und Kontinente an.",
    defaultQuery: "",
    solution:
      "SELECT name, continent FROM world AS x WHERE population > ALL ( SELECT population * 3 FROM world as y WHERE y.continent = x.continent AND y.name <> x.name);",
  },
];
export const sumandcountTasks = [
  {
    description:
      "Aufgabe 1: Zeigen Sie die Gesamtbevölkerungsanzahl der Welt an.",
    defaultQuery: "SELECT SUM(population) FROM world",
    solution: "SELECT SUM(population) FROM world;",
  },
  {
    description:
      "Aufgabe 2: Listen Sie alle Kontinente auf – jeweils nur einmal.",
    defaultQuery: "",
    solution: "SELECT DISTINCT continent FROM world;",
  },
  {
    description: "Aufgabe 3: Geben Sie das gesamte GDP Afrikas an",
    defaultQuery: "",
    solution: "SELECT SUM(gdp) FROM world WHERE continent = 'Africa';",
  },
  {
    description:
      "Aufgabe 4: Wie viele Länder haben eine Fläche von mindestens 1.000.000?",
    defaultQuery: "",
    solution: "SELECT COUNT(area) FROM world WHERE area >= 1000000;",
  },
  {
    description:
      "Aufgabe 5: Wie groß ist die Gesamtbevölkerung von ('Estonia', 'Latvia', 'Lithuania')?",
    defaultQuery: "",
    solution:
      "SELECT SUM(population) FROM world WHERE name IN ('Estonia', 'Latvia', 'Lithuania');",
  },
  {
    description:
      "Aufgabe 6: Zeigen Sie für jeden Kontinent den Kontinent und die Anzahl der Länder an.",
    defaultQuery: "",
    solution: "SELECT continent, COUNT(name) FROM world GROUP BY continent;",
  },
  {
    description:
      "Aufgabe 7: Geben Sie für jeden Kontinent den Kontinent und die Anzahl der Länder mit einer Bevölkerung von mindestens 10 Millionen an.",
    defaultQuery: "",
    solution:
      "SELECT continent, COUNT(name) FROM world WHERE population > 10000000 GROUP BY continent;",
  },
  {
    description:
      "Aufgabe 8: Listen Sie die Kontinente auf, die eine Gesamtbevölkerung von mindestens 100 Millionen haben.",
    defaultQuery: "",
    solution:
      "SELECT continent FROM world GROUP BY continent HAVING SUM(population) >= 100000000;",
  },
];
/* export const joinoperationTasks = [
  {
    description:
      `1. The first example shows the goal scored by a player with the last name 'Bender'. The * says to list all the columns in the table - a shorter way of saying matchid, teamid, player, gtime

      Modify it to show the matchid and player name for all goals scored by Germany. To identify German players, check for: teamid = 'GER'`,
    defaultQuery: `SELECT * FROM goal 
    WHERE player LIKE '%Bender'`,
    solution: `SELECT matchid, player
    FROM goal
    WHERE teamid = 'GER';`,
  },
  {
    description:
      `2. From the previous query you can see that Lars Bender's scored a goal in game 1012. Now we want to know what teams were playing in that match.

      Notice in the that the column matchid in the goal table corresponds to the id column in the game table. We can look up information about game 1012 by finding that row in the game table.
      
      Show id, stadium, team1, team2 for just game 1012`,
    defaultQuery: `SELECT id,stadium,team1,team2
    FROM game`,
    solution: `SELECT id,stadium,team1,team2
    FROM game
    WHERE id = 1012;`,
  },
  {
    description: `3. You can combine the two steps into a single query with a JOIN.

    SELECT *
      FROM game JOIN goal ON (id=matchid)
    The FROM clause says to merge data from the goal table with that from the game table. The ON says how to figure out which rows in game go with which rows in goal - the matchid from goal must match id from game. (If we wanted to be more clear/specific we could say
    ON (game.id=goal.matchid)
    
    The code below shows the player (from the goal) and stadium name (from the game table) for every goal scored.
    
    Modify it to show the player, teamid, stadium and mdate for every German goal.`,
    defaultQuery: `SELECT player,stadium
    FROM game JOIN goal ON (id=matchid)`,
    solution: `SELECT goal.player, goal.teamid, game.stadium, game.mdate
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.teamid = 'GER';`,
  },
  {
    description:
      `4. Use the same JOIN as in the previous question.

      Show the team1, team2 and player for every goal scored by a player called Mario player LIKE 'Mario%'`,
    defaultQuery: "",
    solution: `SELECT game.team1, game.team2, goal.player
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.player LIKE 'Mario%';`,
  },
  {
    description:
      `5. The table eteam gives details of every national team including the coach. You can JOIN goal to eteam using the phrase goal JOIN eteam on teamid=id

      Show player, teamid, coach, gtime for all goals scored in the first 10 minutes gtime<=10`,
    defaultQuery: `SELECT player, teamid, gtime
    FROM goal 
   WHERE gtime<=10`,
    solution:
      `SELECT goal.player, goal.teamid, eteam.coach, goal.gtime
      FROM goal
      INNER JOIN eteam
      ON goal.teamid = eteam.id
      WHERE goal.gtime <= 10;`,
  },
  {
    description:
      `6. To JOIN game with eteam you could use either
      game JOIN eteam ON (team1=eteam.id) or game JOIN eteam ON (team2=eteam.id)
      
      Notice that because id is a column name in both game and eteam you must specify eteam.id instead of just id
      
      List the dates of the matches and the name of the team in which 'Fernando Santos' was the team1 coach.`,
    defaultQuery: "",
    solution: `SELECT game.mdate, eteam.teamname
    FROM game
    INNER JOIN eteam
    ON game.team1 = eteam.id
    WHERE eteam.coach = 'Fernando Santos';`,
  },
  {
    description:
     `7. List the player for every goal scored in a game where the stadium was 'National Stadium, Warsaw'`,
    defaultQuery: "",
    solution:
      `SELECT goal.player
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE game.stadium = 'National Stadium, Warsaw';`,
  },
  {
    description:
      `8. The example query shows all goals scored in the Germany-Greece quarterfinal.
      Instead show the name of all players who scored a goal against Germany.`,
    defaultQuery: `SELECT player, gtime
    FROM game JOIN goal ON matchid = id 
      WHERE (team1='GER' AND team2='GRE')`,
    solution:
      `SELECT DISTINCT goal.player
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE goal.teamid <> 'GER'
        AND (game.team1 = 'GER' OR game.team2 = 'GER');`,
  },
  {
    description:
      `9. Show teamname and the total number of goals scored.
      COUNT and GROUP BY`,
    defaultQuery: `SELECT teamname, player
    FROM eteam JOIN goal ON id=teamid
   ORDER BY teamname`,
    solution:
      `SELECT eteam.teamname, COUNT(goal.teamid)
      FROM goal
      INNER JOIN eteam
      ON eteam.id = goal.teamid
      GROUP BY eteam.teamname;`,
  },
  {
    description:
      `10. Show the stadium and the number of goals scored in each stadium.`,
    defaultQuery: ``,
    solution:
      `SELECT game.stadium, COUNT(goal.matchid)
      FROM game
      INNER JOIN goal
      ON game.id = goal.matchid
      GROUP BY game.stadium;`,
  },
  {
    description:
      `11. For every match involving 'POL', show the matchid, date and the number of goals scored.`,
    defaultQuery: `SELECT matchid,mdate, team1, team2,teamid
    FROM game JOIN goal ON matchid = id 
   WHERE (team1 = 'POL' OR team2 = 'POL')`,
    solution:
      `SELECT goal.matchid, game.mdate, COUNT(goal.matchid)
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE game.team1 = 'POL' OR game.team2 = 'POL'
      GROUP BY goal.matchid;`,
  },
  {
    description:
      `12. For every match where 'GER' scored, show matchid, match date and the number of goals scored by 'GER'`,
    defaultQuery: ``,
    solution:
      `SELECT goal.matchid, game.mdate, COUNT(goal.matchid) AS german_goals
      FROM game
      INNER JOIN goal
      ON game.id = goal.matchid
      WHERE goal.teamid = 'GER'
      GROUP BY goal.matchid;`,
  },
  {
    description:
      `13. List every match with the goals scored by each team as shown. This will use "CASE WHEN" which has not been explained in any previous exercises. ${<table><th><td>mdate</td><td>team1</td><td>score1</td><td>team2</td><td>score2</td></th><tr><td>1 July 2012</td><td>ESP</td><td>4</td><td>ITA</td><td>0</td></tr><tr><td>10 June 2012</td><td>ESP</td><td>1</td><td>ITA</td><td>1</td></tr><tr><td>10 June 2012</td><td>IRL</td><td>1</td><td>CRO</td><td>3</td></tr><tr>...</tr></table>}Notice in the query given every goal is listed. If it was a team1 goal then a 1 appears in score1, otherwise there is a 0. You could SUM this column to get a count of the goals scored by team1. Sort your result by mdate, matchid, team1 and team2.`,
    defaultQuery: `SELECT mdate,
    team1,
    CASE WHEN teamid=team1 THEN 1 ELSE 0 END score1
    FROM game JOIN goal ON matchid = id
  `,
    solution:
      `SELECT
      game.mdate,
      game.team1,
      SUM(CASE WHEN goal.teamid = game.team1 THEN 1 ELSE 0 END) AS score1,
      game.team2,
      SUM(CASE WHEN goal.teamid = game.team2 THEN 1 ELSE 0 END) AS score2
    FROM game
    LEFT JOIN goal
    ON game.id = goal.matchid
    GROUP BY game.id, game.mdate
    ORDER BY game.mdate, goal.matchid, game.team1, game.team2`,
  },
]; */
const tableStyle = {
  borderCollapse: 'collapse',
 
};

const thTdStyle = {
  border: '1px solid black',
  padding: '8px',
};
export const joinoperationTasks = [
  {
    description:
      `1. Das erste Beispiel zeigt ein Tor, das von einem Spieler mit dem Nachnamen 'Bender' erzielt wurde. Das * bedeutet, dass alle Spalten in der Tabelle aufgelistet werden sollen - eine kürzere Möglichkeit, matchid, teamid, player, gtime zu sagen.

      Ändere es so, dass die matchid und der Spielername für alle Tore, die von Deutschland erzielt wurden, angezeigt werden. Um deutsche Spieler zu identifizieren, prüfe: teamid = 'GER'`,
    defaultQuery: `SELECT * FROM goal 
    WHERE player LIKE '%Bender'`,
    solution: `SELECT matchid, player
    FROM goal
    WHERE teamid = 'GER';`,
  },
  {
    description:
      `2. Aus der vorherigen Abfrage kannst du sehen, dass Lars Bender in Spiel 1012 ein Tor erzielt hat. Jetzt wollen wir wissen, welche Teams in diesem Spiel gespielt haben.

      Beachte, dass die Spalte matchid in der goal-Tabelle der Spalte id in der game-Tabelle entspricht. Wir können Informationen über Spiel 1012 finden, indem wir diese Zeile in der game-Tabelle suchen.
      
      Zeige id, stadium, team1, team2 nur für Spiel 1012`,
    defaultQuery: `SELECT id,stadium,team1,team2
    FROM game`,
    solution: `SELECT id,stadium,team1,team2
    FROM game
    WHERE id = 1012;`,
  },
  {
    description: `3. Du kannst die beiden Schritte in einer einzigen Abfrage mit einem JOIN kombinieren.

    SELECT *
      FROM game JOIN goal ON (id=matchid)
    Die FROM-Klausel sagt, dass Daten aus der goal-Tabelle mit denen aus der game-Tabelle zusammengeführt werden sollen. Die ON-Bedingung gibt an, wie man herausfindet, welche Zeilen in game zu welchen Zeilen in goal gehören - die matchid aus goal muss mit der id aus game übereinstimmen. (Wenn wir klarer/spezifischer sein wollten, könnten wir sagen
    ON (game.id=goal.matchid)
    
    Der untenstehende Code zeigt den Spieler (aus goal) und den Stadionnamen (aus der game-Tabelle) für jedes erzielte Tor.
    
    Ändere es so, dass der Spieler, teamid, stadium und mdate für jedes deutsche Tor angezeigt werden.`,
    defaultQuery: `SELECT player,stadium
    FROM game JOIN goal ON (id=matchid)`,
    solution: `SELECT goal.player, goal.teamid, game.stadium, game.mdate
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.teamid = 'GER';`,
  },
  {
    description:
      `4. Verwende das gleiche JOIN wie in der vorherigen Frage.

      Zeige team1, team2 und player für jedes Tor, das von einem Spieler namens Mario erzielt wurde (player LIKE 'Mario%')`,
    defaultQuery: "",
    solution: `SELECT game.team1, game.team2, goal.player
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.player LIKE 'Mario%';`,
  },
  {
    description:
      `5. Die Tabelle eteam gibt Details zu jedem Nationalteam, einschließlich des Trainers. Du kannst goal mit eteam verbinden, indem du den Ausdruck goal JOIN eteam on teamid=id verwendest.

      Zeige player, teamid, coach, gtime für alle Tore, die in den ersten 10 Minuten erzielt wurden (gtime<=10)`,
    defaultQuery: `SELECT player, teamid, gtime
    FROM goal 
   WHERE gtime<=10`,
    solution:
      `SELECT goal.player, goal.teamid, eteam.coach, goal.gtime
      FROM goal
      INNER JOIN eteam
      ON goal.teamid = eteam.id
      WHERE goal.gtime <= 10;`,
  },
  {
    description:
      `6. Um game mit eteam zu verbinden, könntest du entweder
      game JOIN eteam ON (team1=eteam.id) oder game JOIN eteam ON (team2=eteam.id) verwenden.
      
      Beachte, dass, weil id sowohl in game als auch in eteam eine Spalte ist, du eteam.id anstelle von nur id angeben musst.
      
      Liste die Daten der Spiele und den Namen des Teams auf, bei dem 'Fernando Santos' der Trainer von team1 war.`,
    defaultQuery: "",
    solution: `SELECT game.mdate, eteam.teamname
    FROM game
    INNER JOIN eteam
    ON game.team1 = eteam.id
    WHERE eteam.coach = 'Fernando Santos';`,
  },
  {
    description:
     `7. Liste die Spieler für jedes Tor auf, das in einem Spiel erzielt wurde, bei dem das Stadion 'National Stadium, Warsaw' war.`,
    defaultQuery: "",
    solution:
      `SELECT goal.player
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE game.stadium = 'National Stadium, Warsaw';`,
  },
  {
    description:
      `8. Die Beispielabfrage zeigt alle Tore, die im Viertelfinale Deutschland-Griechenland erzielt wurden.
      Zeige stattdessen die Namen aller Spieler, die ein Tor gegen Deutschland erzielt haben.`,
    defaultQuery: `SELECT player, gtime
    FROM game JOIN goal ON matchid = id 
      WHERE (team1='GER' AND team2='GRE')`,
    solution:
      `SELECT DISTINCT goal.player
      FROM game
      INNER JOIN goal
      ON goal.matchid = game.id
      WHERE goal.teamid <> 'GER'
        AND (game.team1 = 'GER' OR game.team2 = 'GER');`,
  },
  {
    description:
      `9. Zeige teamname und die Gesamtzahl der erzielten Tore.
      COUNT und GROUP BY`,
    defaultQuery: `SELECT teamname, player
    FROM eteam JOIN goal ON id=teamid
   ORDER BY teamname`,
    solution:
      `SELECT eteam.teamname, COUNT(goal.teamid)
      FROM goal
      INNER JOIN eteam
      ON eteam.id = goal.teamid
      GROUP BY eteam.teamname;`,
  },
  {
    description:
      `10. Zeige das Stadion und die Anzahl der in jedem Stadion erzielten Tore.`,
    defaultQuery: ``,
    solution:
      `SELECT game.stadium, COUNT(goal.matchid)
      FROM game
      INNER JOIN goal
      ON game.id = goal.matchid
      GROUP BY game.stadium;`,
  },
  {
    description:
      `11. Für jedes Spiel, an dem 'POL' beteiligt war, zeige matchid, Datum und die Anzahl der erzielten Tore.`,
    defaultQuery: `SELECT matchid,mdate, team1, team2,teamid
    FROM game JOIN goal ON matchid = id 
   WHERE (team1 = 'POL' OR team2 = 'POL')`,
    solution:
      `SELECT
      goal.matchid,
      game.mdate,
      COUNT(goal.matchid) AS total_goals
    FROM game
    INNER JOIN goal ON goal.matchid = game.id
    WHERE game.team1 = 'POL' OR game.team2 = 'POL'
    GROUP BY goal.matchid, game.mdate;
    `,
  },
  {
    description:
      `12. Für jedes Spiel, in dem 'GER' ein Tor erzielt hat, zeige matchid, Spieldatum und die Anzahl der von 'GER' erzielten Tore.`,
    defaultQuery: ``,
    solution:
      `SELECT
      goal.matchid,
      game.mdate,
      COUNT(goal.matchid) AS german_goals
    FROM game
    INNER JOIN goal
    ON game.id = goal.matchid
    WHERE goal.teamid = 'GER'
    GROUP BY goal.matchid, game.mdate;
    `,
  },
  {
    description:
    (
      <>
        <p>13. Liste jedes Spiel mit den Toren auf, die von jedem Team erzielt wurden. Dies wird "CASE WHEN" verwenden, das in den vorherigen Übungen nicht erklärt wurde.</p>
        <p>
          Beachte, dass in der angegebenen Abfrage jedes Tor aufgelistet ist. Wenn es ein team1-Tor war, erscheint eine 1 in score1, andernfalls eine 0. Du könntest diese Spalte summieren, um eine Zählung der von team1 erzielten Tore zu erhalten. Sortiere dein Ergebnis nach mdate, matchid, team1 und team2.
        </p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>mdate</th>
              <th style={thTdStyle}>team1</th>
              <th style={thTdStyle}>score1</th>
              <th style={thTdStyle}>team2</th>
              <th style={thTdStyle}>score2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={thTdStyle}>1 July 2012</td>
              <td style={thTdStyle}>ESP</td>
              <td style={thTdStyle}>4</td>
              <td style={thTdStyle}>ITA</td>
              <td style={thTdStyle}>0</td>
            </tr>
            <tr>
              <td style={thTdStyle}>10 June 2012</td>
              <td style={thTdStyle}>ESP</td>
              <td style={thTdStyle}>1</td>
              <td style={thTdStyle}>ITA</td>
              <td style={thTdStyle}>1</td>
            </tr>
            <tr>
              <td style={thTdStyle}>10 June 2012</td>
              <td style={thTdStyle}>IRL</td>
              <td style={thTdStyle}>1</td>
              <td style={thTdStyle}>CRO</td>
              <td style={thTdStyle}>3</td>
            </tr>
            <tr>
              <td style={thTdStyle}>...</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
    defaultQuery: `SELECT mdate,
    team1,
    CASE WHEN teamid=team1 THEN 1 ELSE 0 END score1
    FROM game JOIN goal ON matchid = id
  `,
    solution:
      `SELECT
      game.mdate,
      game.team1,
      SUM(CASE WHEN goal.teamid = game.team1 THEN 1 ELSE 0 END) AS score1,
      game.team2,
      SUM(CASE WHEN goal.teamid = game.team2 THEN 1 ELSE 0 END) AS score2
    FROM game
    LEFT JOIN goal
    ON game.id = goal.matchid
    GROUP BY game.id, game.mdate, game.team1, game.team2
    ORDER BY game.mdate, game.team1, game.team2;
    `,
  },
];
export const morejoinoperationsTasks = [
  {
    description:
      `1. Liste die Filme auf, bei denen das Jahr (yr) 1962 ist [Zeige id, title].`,
    defaultQuery: `SELECT id, title
    FROM movie
    WHERE yr=1962`,
    solution: `SELECT id, title
    FROM movie
    WHERE yr = 1962;`,
  },
  {
    description:
      `2. Gebe das Jahr (yr) von 'Citizen Kane' aus.`,
    defaultQuery: ``,
    solution: `SELECT yr
    FROM movie
    WHERE title = 'Citizen Kane';`,
  },
  {
    description: `3. Liste alle Star Trek-Filme auf, einschließlich id, title und yr (alle diese Filme enthalten die Wörter "Star Trek" im Titel). Ordne die Ergebnisse nach Jahr (yr).`,
    defaultQuery: ``,
    solution: `SELECT id, title, yr
    FROM movie
    WHERE title LIKE '%Star Trek%'
    ORDER BY yr;`,
  },
  {
    description:
      `4. Welche id hat der Schauspieler 'Glenn Close'?`,
    defaultQuery: "",
    solution: `SELECT id
    FROM actor
    WHERE name = 'Glenn Close';`,
  },
  {
    description:
      `5. Was ist die id des Films 'Casablanca'`,
    defaultQuery: ``,
    solution:
      `SELECT id
      FROM movie
      WHERE title = 'Casablanca';`,
  },
  {
    description:
      `6. Gebe die Castliste für 'Casablanca' aus.

      Nutze movieid=11768, (oder den Ausgabewert aus vorheriger Frage)`,
    defaultQuery: "",
    solution: `SELECT actor.name AS casablanca_cast_list
    FROM movie
    INNER JOIN casting
    ON movie.id = casting.movieid
    INNER JOIN actor
    ON casting.actorid = actor.id
    WHERE casting.movieid = (
      SELECT id
      FROM movie
      WHERE title = 'Casablanca'
      );`,
  },
  {
    description:
     `7. Gebe die Castliste des Films 'Alien' aus`,
    defaultQuery: "",
    solution:
      `SELECT actor.name AS alien_cast_list
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.movieid = (
        SELECT id
        FROM movie
        WHERE title = 'Alien'
        );`,
  },
  {
    description:
      `8. Liste die Filme auf, in denen 'Harrison Ford' auftaucht`,
    defaultQuery: ``,
    solution:
      `SELECT movie.title
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.actorid = (
        SELECT id
        FROM actor
        WHERE name = 'Harrison Ford'
        );`,
  },
  {
    description:
      `9. Liste die Filme auf, in denen 'Harrison Ford' mitgespielt hat - jedoch nicht in der Hauptrolle. [Hinweis: Das Feld "ord" in der Besetzung gibt die Position des Schauspielers an. Wenn ord=1, dann ist dieser Schauspieler in der Hauptrolle.]`,
    defaultQuery: ``,
    solution:
      `SELECT movie.title
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.actorid = (
        SELECT id
        FROM actor
        WHERE name = 'Harrison Ford'
        )
        AND casting.ord <> 1;`,
  },
  {
    description:
      `10. Liste die Filme zusammen mit dem Hauptdarsteller für alle Filme aus dem Jahr 1962 auf.`,
    defaultQuery: ``,
    solution:
      `SELECT
      movie.title,
      (CASE WHEN casting.ord = 1 THEN actor.name END) AS name
    FROM movie
    INNER JOIN casting
    ON movie.id = casting.movieid
    INNER JOIN actor
    ON casting.actorid = actor.id
    WHERE movie.yr = 1962
     AND (CASE WHEN casting.ord = 1 THEN actor.name END) IS NOT NULL;`,
  },
  {
    description:
      `11. Welche waren die geschäftigsten Jahre für 'Rock Hudson'? Zeige das Jahr und die Anzahl der Filme, die er in jedem Jahr gemacht hat, in dem er mehr als 2 Filme gedreht hat.`,
    defaultQuery: `SELECT yr,COUNT(title) FROM
    movie JOIN casting ON movie.id=movieid
          JOIN actor   ON actorid=actor.id
  WHERE name='Doris Day'
  GROUP BY yr
  HAVING COUNT(title) > 1`,
    solution:
      `SELECT yr, COUNT(movie.title)
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE actor.name = 'Rock Hudson'
      GROUP BY movie.yr
      HAVING COUNT(movie.title) > 2;`,
  },
  {
    description:
      `12. Liste den Filmtitel und den Hauptdarsteller für alle Filme auf, in denen 'Julie Andrews' mitgespielt hat.`,
    defaultQuery: `SELECT movieid FROM casting
    WHERE actorid IN (
      SELECT id FROM actor
      WHERE name='Julie Andrews')
    `,
    solution:
      `SELECT
      movie.title,
      (CASE WHEN casting.ord = 1 THEN actor.name END) as leading_actor
    FROM movie
    INNER JOIN casting
    ON movie.id = casting.movieid
    INNER JOIN actor
    ON casting.actorid = actor.id
    WHERE (CASE WHEN casting.ord = 1 THEN actor.name END) IS NOT NULL
      AND casting.movieid IN (
        SELECT casting.movieid
        FROM casting
        INNER JOIN actor
        ON casting.actorid = actor.id
        WHERE actor.name = 'Julie Andrews'
      );`,
  },
  {
    description:
    `13. Erhalte eine Liste der Schauspieler in alphabetischer Reihenfolge, die mindestens 15 Hauptrollen hatten.`,
    defaultQuery: `
  `,
    solution:
      `SELECT actor.name
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      GROUP BY actor.name
      HAVING SUM(CASE WHEN casting.ord = 1 THEN 1 ELSE 0 END) >= 15;`,
  },
  {
    description:
    `14. Liste die Filme, die im Jahr 1978 veröffentlicht wurden, geordnet nach der Anzahl der Schauspieler in der Besetzung und dann nach dem Titel.`,
    defaultQuery: `
  `,
    solution:
      `SELECT movie.title, COUNT(actor.id) as actors
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE movie.yr = 1978
      GROUP BY movie.title
      ORDER BY actors DESC, movie.title;`,
  },
  {
    description:
    `15. Liste alle Personen auf, die mit 'Art Garfunkel' zusammengearbeitet haben.`,
    defaultQuery: `
  `,
    solution:
      `SELECT DISTINCT actor.name
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.movieid IN (
        SELECT casting.movieid
        FROM casting
        INNER JOIN actor
        ON casting.actorid = actor.id
        WHERE actor.name = 'Art Garfunkel'
      )
        AND actor.name <> 'Art Garfunkel';`,
  },
];
/* export const morejoinoperationsTasks = [
  {
    description:
      `1. List the films where the yr is 1962 [Show id, title]`,
    defaultQuery: `SELECT id, title
    FROM movie
    WHERE yr=1962`,
    solution: `SELECT id, title
    FROM movie
    WHERE yr = 1962;`,
  },
  {
    description:
      `2. Give year of 'Citizen Kane'.`,
    defaultQuery: ``,
    solution: `SELECT yr
    FROM movie
    WHERE title = 'Citizen Kane';`,
  },
  {
    description: `3. List all of the Star Trek movies, include the id, title and yr (all of these movies include the words Star Trek in the title). Order results by year.`,
    defaultQuery: ``,
    solution: `SELECT id, title, yr
    FROM movie
    WHERE title LIKE '%Star Trek%'
    ORDER BY yr;`,
  },
  {
    description:
      `4. What id number does the actor 'Glenn Close' have?`,
    defaultQuery: "",
    solution: `SELECT id
    FROM actor
    WHERE name = 'Glenn Close';`,
  },
  {
    description:
      `5. What is the id of the film 'Casablanca'`,
    defaultQuery: ``,
    solution:
      `SELECT id
      FROM movie
      WHERE title = 'Casablanca';`,
  },
  {
    description:
      `6. Obtain the cast list for 'Casablanca'.

      what is a cast list?
      Use movieid=11768, (or whatever value you got from the previous question)`,
    defaultQuery: "",
    solution: `SELECT actor.name AS casablanca_cast_list
    FROM movie
    INNER JOIN casting
    ON movie.id = casting.movieid
    INNER JOIN actor
    ON casting.actorid = actor.id
    WHERE casting.movieid = (
      SELECT id
      FROM movie
      WHERE title = 'Casablanca'
      );`,
  },
  {
    description:
     `7. Obtain the cast list for the film 'Alien'`,
    defaultQuery: "",
    solution:
      `SELECT actor.name AS alien_cast_list
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.movieid = (
        SELECT id
        FROM movie
        WHERE title = 'Alien'
        );`,
  },
  {
    description:
      `8. List the films in which 'Harrison Ford' has appeared`,
    defaultQuery: ``,
    solution:
      `SELECT movie.title
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.actorid = (
        SELECT id
        FROM actor
        WHERE name = 'Harrison Ford'
        );`,
  },
  {
    description:
      `9. List the films where 'Harrison Ford' has appeared - but not in the starring role. [Note: the ord field of casting gives the position of the actor. If ord=1 then this actor is in the starring role]`,
    defaultQuery: ``,
    solution:
      `SELECT movie.title
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.actorid = (
        SELECT id
        FROM actor
        WHERE name = 'Harrison Ford'
        )
        AND casting.ord <> 1;`,
  },
  {
    description:
      `10. List the films together with the leading star for all 1962 films.`,
    defaultQuery: ``,
    solution:
      `SELECT
      movie.title,
      (CASE WHEN casting.ord = 1 THEN actor.name END) AS name
    FROM movie
    INNER JOIN casting
    ON movie.id = casting.movieid
    INNER JOIN actor
    ON casting.actorid = actor.id
    WHERE movie.yr = 1962
     AND (CASE WHEN casting.ord = 1 THEN actor.name END) IS NOT NULL;`,
  },
  {
    description:
      `11. Which were the busiest years for 'Rock Hudson', show the year and the number of movies he made each year for any year in which he made more than 2 movies.`,
    defaultQuery: `SELECT yr,COUNT(title) FROM
    movie JOIN casting ON movie.id=movieid
          JOIN actor   ON actorid=actor.id
  WHERE name='Doris Day'
  GROUP BY yr
  HAVING COUNT(title) > 1`,
    solution:
      `SELECT yr, COUNT(movie.title)
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE actor.name = 'Rock Hudson'
      GROUP BY movie.yr
      HAVING COUNT(movie.title) > 2;`,
  },
  {
    description:
      `12. List the film title and the leading actor for all of the films 'Julie Andrews' played in.`,
    defaultQuery: `SELECT movieid FROM casting
    WHERE actorid IN (
      SELECT id FROM actor
      WHERE name='Julie Andrews')
    `,
    solution:
      `SELECT
      movie.title,
      (CASE WHEN casting.ord = 1 THEN actor.name END) as leading_actor
    FROM movie
    INNER JOIN casting
    ON movie.id = casting.movieid
    INNER JOIN actor
    ON casting.actorid = actor.id
    WHERE (CASE WHEN casting.ord = 1 THEN actor.name END) IS NOT NULL
      AND casting.movieid IN (
        SELECT casting.movieid
        FROM casting
        INNER JOIN actor
        ON casting.actorid = actor.id
        WHERE actor.name = 'Julie Andrews'
      );`,
  },
  {
    description:
    `13. Obtain a list, in alphabetical order, of actors who've had at least 15 starring roles.`,
    defaultQuery: `
  `,
    solution:
      `SELECT actor.name
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      GROUP BY actor.name
      HAVING SUM(CASE WHEN casting.ord = 1 THEN 1 ELSE 0 END) >= 15;`,
  },
  {
    description:
    `14. List the films released in the year 1978 ordered by the number of actors in the cast, then by title.`,
    defaultQuery: `
  `,
    solution:
      `SELECT movie.title, COUNT(actor.id) as actors
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE movie.yr = 1978
      GROUP BY movie.title
      ORDER BY actors DESC, movie.title;`,
  },
  {
    description:
    `15. List all the people who have worked with 'Art Garfunkel'.`,
    defaultQuery: `
  `,
    solution:
      `SELECT DISTINCT actor.name
      FROM movie
      INNER JOIN casting
      ON movie.id = casting.movieid
      INNER JOIN actor
      ON casting.actorid = actor.id
      WHERE casting.movieid IN (
        SELECT casting.movieid
        FROM casting
        INNER JOIN actor
        ON casting.actorid = actor.id
        WHERE actor.name = 'Art Garfunkel'
      )
        AND actor.name <> 'Art Garfunkel';`,
  },
]; */


//Quizzes

export const selectquizQuestions = [
  {
    id: 1,
    question: "Wähle den Code, der die folgende Tabelle erzeugt:",
    imageUrl: (
      <table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
        <tr>
          <th style={{ border: "1px solid black" }}>name</th>
          <th style={{ border: "1px solid black" }}>population</th>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Bahrain</td>
          <td style={{ border: "1px solid black" }}>1234571</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Swaziland</td>
          <td style={{ border: "1px solid black" }}>1220000</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black" }}>Timor-Leste</td>
          <td style={{ border: "1px solid black" }}>1066409</td>
        </tr>
      </table>
    ),
    options: [
      {
        id: 1,
        text: "FROM world SELECT name, population BETWEEN 1000000 AND 1250000",
        imageUrl: "",
      },
      {
        id: 2,
        text: "FROM name, population WHERE population BETWEEN 1000000 AND 1250000 SELECT world",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name, population FROM world WHERE population BETWEEN 1000000 AND 1250000",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT population BETWEEN 1000000 AND 1250000 FROM world",
        imageUrl: "",
      },
      {
        id: 5,
        text: "WHERE population BETWEEN 1000000 AND 1250000 SELECT name, population FROM world",
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "Wählen Sie das Ergebnis aus, das Sie mit diesem Code erhalten würden: ",
    imageUrl: 'SELECT name, population FROM world WHERE name LIKE "Al%"',
    options: [
      {
        id: 1,
        text: (
          <div>
            <p>Tabelle A</p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Algeria</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <p>Tabelle B</p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>%bania</td>
                <td style={{ border: "1px solid black" }}>3200000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>%geria</td>
                <td style={{ border: "1px solid black" }}>32900000</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <p>Tabelle C</p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Al</td>
                <td style={{ border: "1px solid black" }}>0</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <p>Tabelle D</p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
                <td style={{ border: "1px solid black" }}>3200000</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <p>Tabelle E</p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
                <td style={{ border: "1px solid black" }}>3200000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Algeria</td>
                <td style={{ border: "1px solid black" }}>32900000</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 3,
    question:
      "Wählen Sie den Code aus, der die Länder anzeigt, die auf A oder L enden",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name FROM world WHERE name LIKE 'a%' AND name LIKE 'l%'",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name FROM world WHERE name LIKE 'a%' OR name LIKE 'l%'",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name FROM world WHERE name LIKE '%a' AND name LIKE '%l'",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name FROM world WHERE name LIKE '%a' OR 'l%'",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name FROM world WHERE name LIKE '%a' OR name LIKE '%l'",
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 4,
    question:
      "Wählen Sie das Ergebnis aus, das Sie mit diesem Code erhalten würden: ",
    imageUrl:
      "SELECT name,length(name) FROM world WHERE length(name)=5 and region='Europe'",
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>length(name)</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Benin</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Lybia</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Egypt</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>length(name)</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Italy</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Egypt</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Spain</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>length(name)</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Italy</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Malta</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Spain</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>length(name)</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Italy</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>France</td>
                <td style={{ border: "1px solid black" }}>6</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Spain</td>
                <td style={{ border: "1px solid black" }}>5</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>length(name)</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Sweden</td>
                <td style={{ border: "1px solid black" }}>6</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Norway</td>
                <td style={{ border: "1px solid black" }}>6</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                <td style={{ border: "1px solid black" }}>6</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question:
      "Wählen Sie das Ergebnis aus, das Sie mit diesem Code erhalten würden: SELECT name, area*2 FROM world WHERE population = 64000 ",
    imageUrl: (
      <div>
        <p>Betrachten Sie dabei die folgende Tabelle:</p>
        <table
          style={{ borderCollapse: "collapse", border: "1px solid black" }}
        >
          <tr>
            <th style={{ border: "1px solid black" }}>name</th>
            <th style={{ border: "1px solid black" }}>continent</th>
            <th style={{ border: "1px solid black" }}>area</th>
            <th style={{ border: "1px solid black" }}>population</th>
            <th style={{ border: "1px solid black" }}>gdp</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Afghanistan</td>
            <td style={{ border: "1px solid black" }}>South Asia</td>
            <td style={{ border: "1px solid black" }}>652225</td>
            <td style={{ border: "1px solid black" }}>26000000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Albania</td>
            <td style={{ border: "1px solid black" }}>Europe</td>
            <td style={{ border: "1px solid black" }}>28728</td>
            <td style={{ border: "1px solid black" }}>3200000</td>
            <td style={{ border: "1px solid black" }}>6656000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Algeria</td>
            <td style={{ border: "1px solid black" }}>Middle East</td>
            <td style={{ border: "1px solid black" }}>2400000</td>
            <td style={{ border: "1px solid black" }}>32900000</td>
            <td style={{ border: "1px solid black" }}>75012000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Andorra</td>
            <td style={{ border: "1px solid black" }}>Europe</td>
            <td style={{ border: "1px solid black" }}>468</td>
            <td style={{ border: "1px solid black" }}>64000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
          </tr>
        </table>
      </div>
    ),
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>234</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>468</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>936</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>4680</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>936</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
                <td style={{ border: "1px solid black" }}>57456</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 6,
    question:
      "Wählen Sie den Code aus, der die Länder mit einer Fläche (area) von mehr als 50.000 und einer Bevölkerung von weniger als 1.000.000 anzeigt",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name, area, population FROM world WHERE area < 50000 AND population < 10000000",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name, area, population FROM world WHERE area < 50000 AND population > 10000000",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name, area, population FROM world WHERE area > 50000 AND population < 10000000",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name, area, population FROM world WHERE area > 50000 AND population > 10000000",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name, area, population FROM world WHERE area = 50000 AND population = 10000000",
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 7,
    question:
      "Wählen Sie den Code aus, der die Bevölkerungsdichte von China, Australia, Nigeria und France anzeigt",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name, area/population FROM world WHERE name IN ('China', 'Nigeria', 'France', 'Australia')",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name, area/population FROM world WHERE name LIKE ('China', 'Nigeria', 'France', 'Australia')",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name, population/area FROM world WHERE name IN ('China', 'Nigeria', 'France', 'Australia')",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name, population/area FROM world WHERE name LIKE ('China', 'Nigeria', 'France', 'Australia')",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name, population FROM world WHERE name IN ('China', 'Nigeria', 'France', 'Australia')",
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
];

export const BBCquizQuestions = [
  {
    id: 1,
    question:
      "Wählen Sie den Code aus, der die Namen der Länder angibt, die mit U beginnen",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name FROM world WHERE name BEGIN with U",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name FROM world WHERE name LIKE '%U'",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name FROM world WHERE name LIKE '%u%'",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name FROM world WHERE name LIKE U",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name FROM world WHERE name LIKE 'U%'",
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 2,
    question:
      "Wählen Sie den Code aus, der nur die Bevölkerungsanzahl (population) des Vereinigten Königreichs (United Kingdom) anzeigt?",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT population FROM 'United Kingdom'",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name FROM world WHERE population = 'United Kingdom'",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT FROM world WHERE population IN 'United Kingdom'",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT population FROM world WHERE name = 'United Kingdom'",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT population FROM world WHERE 'United Kingdom' IN name",
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 3,
    question:
      "Wählen Sie die Antwort aus, die das Problem mit diesem SQL-Code zeigt – das gewünschte Ergebnis sollte der Kontinent Frankreichs (France) sein:",
    imageUrl: "SELECT continent FROM world WHERE 'name' = 'France'",
    options: [
      {
        id: 1,
        text: "continent should be 'continent'",
        imageUrl: "",
      },
      {
        id: 2,
        text: "'name' should be name",
        imageUrl: "",
      },
      {
        id: 3,
        text: `'France' should be "France"`,
        imageUrl: "",
      },
      {
        id: 4,
        text: "'France' should be France",
        imageUrl: "",
      },
      {
        id: 5,
        text: "= should be IN",
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question:
      "Wählen Sie das Ergebnis aus, das man mit dem folgenden Code erhalten würde: SELECT name, population / 10  FROM world WHERE population < 10000",
    imageUrl: (
      <div>
        <p>Betrachten Sie dabei die folgende Tabelle:</p>
        <table
          style={{ borderCollapse: "collapse", border: "1px solid black" }}
        >
          <tr>
            <th style={{ border: "1px solid black" }}>name</th>
            <th style={{ border: "1px solid black" }}>continent</th>
            <th style={{ border: "1px solid black" }}>area</th>
            <th style={{ border: "1px solid black" }}>population</th>
            <th style={{ border: "1px solid black" }}>gdp</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Afghanistan</td>
            <td style={{ border: "1px solid black" }}>South Asia</td>
            <td style={{ border: "1px solid black" }}>652225</td>
            <td style={{ border: "1px solid black" }}>26000000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Albania</td>
            <td style={{ border: "1px solid black" }}>Europe</td>
            <td style={{ border: "1px solid black" }}>28728</td>
            <td style={{ border: "1px solid black" }}>3200000</td>
            <td style={{ border: "1px solid black" }}>6656000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Algeria</td>
            <td style={{ border: "1px solid black" }}>Middle East</td>
            <td style={{ border: "1px solid black" }}>2400000</td>
            <td style={{ border: "1px solid black" }}>32900000</td>
            <td style={{ border: "1px solid black" }}>75012000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Andorra</td>
            <td style={{ border: "1px solid black" }}>Europe</td>
            <td style={{ border: "1px solid black" }}>468</td>
            <td style={{ border: "1px solid black" }}>64000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Brazil</td>
            <td style={{ border: "1px solid black" }}>South America</td>
            <td style={{ border: "1px solid black" }}>8550000</td>
            <td style={{ border: "1px solid black" }}>182800000 </td>
            <td style={{ border: "1px solid black" }}>564852000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Colombia</td>
            <td style={{ border: "1px solid black" }}>South America</td>
            <td style={{ border: "1px solid black" }}>1140000</td>
            <td style={{ border: "1px solid black" }}>45600000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Nauru</td>
            <td style={{ border: "1px solid black" }}>Asia-Pacific</td>
            <td style={{ border: "1px solid black" }}>21</td>
            <td style={{ border: "1px solid black" }}>9900</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Uzbekistan</td>
            <td style={{ border: "1px solid black" }}>Central Asia</td>
            <td style={{ border: "1px solid black" }}>447000</td>
            <td style={{ border: "1px solid black" }}>26000000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
          </tr>
        </table>
      </div>
    ),
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>6400</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Nauru</td>
                <td style={{ border: "1px solid black" }}>9900</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
                <td style={{ border: "1px solid black" }}>64000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Nauru</td>
                <td style={{ border: "1px solid black" }}>9900</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Nauru</td>
                <td style={{ border: "1px solid black" }}>99</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Nauru</td>
                <td style={{ border: "1px solid black" }}>990</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Nauru</td>
                <td style={{ border: "1px solid black" }}>9900</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 5,
    question:
      "Wählen Sie den Code aus, der den Namen (name) und die Bevölkerung (population) von Ländern in Europa (Europe) und Asien (Asia) anzeigt",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name FROM world WHERE continent IN ('Europe', 'Asia')",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name, population FROM world WHERE continent IN ('Europe', 'Asia')",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name, population FROM world WHERE name IN (Europe Asia)",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name, population FROM world WHERE name IS ('Europe', 'Asia')",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name, population FROM world WHERE continent = ('Europe', 'Asia')",
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Wählen Sie den Code aus, der zwei Zeilen ergeben würde",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name FROM world WHERE name = 'Cuba'",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name FROM world WHERE name = 'Cuba' AND name = 'Togo'",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name FROM world WHERE name EITHER ('Cuba', 'Togo')",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name FROM world WHERE name IN ('Cuba', 'Togo')",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name FROM WHERE name IS 'Mali'",
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 7,
    question:
      "Wählen Sie das Ergebnis aus, das man mit diesem Code erhalten würde: SELECT name FROM world WHERE continent = 'South America' AND population > 40000000",
    imageUrl: (
      <div>
        <p>Betrachten Sie dabei die folgende Tabelle:</p>
        <table
          style={{ borderCollapse: "collapse", border: "1px solid black" }}
        >
          <tr>
            <th style={{ border: "1px solid black" }}>name</th>
            <th style={{ border: "1px solid black" }}>continent</th>
            <th style={{ border: "1px solid black" }}>area</th>
            <th style={{ border: "1px solid black" }}>population</th>
            <th style={{ border: "1px solid black" }}>gdp</th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Afghanistan</td>
            <td style={{ border: "1px solid black" }}>South Asia</td>
            <td style={{ border: "1px solid black" }}>652225</td>
            <td style={{ border: "1px solid black" }}>26000000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Albania</td>
            <td style={{ border: "1px solid black" }}>Europe</td>
            <td style={{ border: "1px solid black" }}>28728</td>
            <td style={{ border: "1px solid black" }}>3200000</td>
            <td style={{ border: "1px solid black" }}>6656000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Algeria</td>
            <td style={{ border: "1px solid black" }}>Middle East</td>
            <td style={{ border: "1px solid black" }}>2400000</td>
            <td style={{ border: "1px solid black" }}>32900000</td>
            <td style={{ border: "1px solid black" }}>75012000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Andorra</td>
            <td style={{ border: "1px solid black" }}>Europe</td>
            <td style={{ border: "1px solid black" }}>468</td>
            <td style={{ border: "1px solid black" }}>64000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Brazil</td>
            <td style={{ border: "1px solid black" }}>South America</td>
            <td style={{ border: "1px solid black" }}>8550000</td>
            <td style={{ border: "1px solid black" }}>182800000 </td>
            <td style={{ border: "1px solid black" }}>564852000000</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Colombia</td>
            <td style={{ border: "1px solid black" }}>South America</td>
            <td style={{ border: "1px solid black" }}>1140000</td>
            <td style={{ border: "1px solid black" }}>45600000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Nauru</td>
            <td style={{ border: "1px solid black" }}>Asia-Pacific</td>
            <td style={{ border: "1px solid black" }}>21</td>
            <td style={{ border: "1px solid black" }}>9900</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Uzbekistan</td>
            <td style={{ border: "1px solid black" }}>Central Asia</td>
            <td style={{ border: "1px solid black" }}>447000</td>
            <td style={{ border: "1px solid black" }}>26000000</td>
            <td style={{ border: "1px solid black" }}></td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
            <td style={{ border: "1px solid black" }}>...</td>
          </tr>
        </table>
      </div>
    ),
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Afghanistan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Colombia</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Colombia</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
                <td style={{ border: "1px solid black" }}>South America</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Colombia</td>
                <td style={{ border: "1px solid black" }}>South America</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
                <td style={{ border: "1px solid black" }}>182800000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Colombia</td>
                <td style={{ border: "1px solid black" }}>45600000</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
];
export const nestedselectquizQuestions = [
  {
    id: 1,
    question:
      "Wählen Sie den Code aus, der den Namen, die Region und die Bevölkerung des kleinsten Landes in jeder Region anzeigt",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: " SELECT region, name, FROM bbc x WHERE population <= ALL (SELECT population FROM bbc y WHERE y.region=x.region AND population>0)",
        imageUrl: "",
      },
      {
        id: 2,
        text: " SELECT region, name, population FROM bbc WHERE population <= ALL (SELECT population FROM bbc WHERE population>0)",
        imageUrl: "",
      },
      {
        id: 3,
        text: " SELECT region, name, population FROM bbc x WHERE population <= ALL (SELECT population FROM bbc y WHERE y.region=x.region AND population>0)",
        imageUrl: "",
      },
      {
        id: 4,
        text: " SELECT region, name, population FROM bbc x WHERE population = ALL (SELECT population FROM bbc y WHERE y.region=x.region AND population>0)",
        imageUrl: "",
      },
      {
        id: 5,
        text: " SELECT region, name, population FROM bbc x WHERE population <= ALL (SELECT population FROM bbc y WHERE y.region=x.region AND population<0)",
        imageUrl:
          "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "Wählen Sie den Code aus, der die Länder anzeigt, die zu Regionen mit einer Gesamtbevölkerung von über 50.000 gehören",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name,region,population FROM bbc x WHERE 50000 < ALL (SELECT population FROM bbc y WHERE population>0)",
        imageUrl: "",
      },
      {
        id: 2,
        text: " SELECT name,region,population FROM bbc x WHERE 50000 < ALL (SELECT population FROM bbc y WHERE x.region=y.region AND y.population>0)",
        imageUrl: "",
      },
      {
        id: 3,
        text: " SELECT name,region,population FROM bbc x WHERE 50000 = ALL (SELECT population FROM bbc y WHERE x.region=y.region AND y.population>0)",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name,region,population FROM bbc x WHERE 50000 > ALL (SELECT population FROM bbc y WHERE x.region=y.region AND y.population>0)",
        imageUrl: "",
      },
      {
        id: 5,
        text: " SELECT name,region,population FROM bbc x WHERE 500000 < ALL (SELECT population FROM bbc y WHERE x.region=y.region AND y.population>0)",
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question:
      "Wählen Sie den Code aus, der die Länder anzeigt, in denen weniger als ein Drittel der Bevölkerung der umliegenden Länder leben",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name, region FROM bbc x WHERE population < ALL (SELECT population/3 FROM bbc y WHERE y.region = x.region AND y.name != x.name)",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name, region FROM bbc x WHERE population = ALL (SELECT population/3 FROM bbc y WHERE y.region = x.region AND y.name != x.name)",
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name, region FROM bbc x WHERE population > ALL (SELECT population/3 FROM bbc y WHERE y.region = x.region AND y.name != x.name)`,
        imageUrl: "",
      },
      {
        id: 4,
        text: " SELECT name, region FROM bbc x WHERE population < ALL (SELECT population*3 FROM bbc y WHERE y.region = x.region AND y.name != x.name)",
        imageUrl: "",
      },
      {
        id: 5,
        text: " SELECT name, region FROM bbc x WHERE population < ALL (SELECT population/3 FROM bbc y WHERE y.name != x.name)",
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      "Wählen Sie das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
    imageUrl:
      "SELECT name FROM bbc WHERE population > (SELECT population FROM bbc WHERE name='United Kingdom') AND region IN (SELECT region FROM bbc WHERE name = 'United Kingdom')",
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Austria</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Bulgaria</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>France</td>
                <td style={{ border: "1px solid black" }}>Europe</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Germany</td>
                <td style={{ border: "1px solid black" }}>Europe</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Russia</td>
                <td style={{ border: "1px solid black" }}>Europe</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Turkey</td>
                <td style={{ border: "1px solid black" }}>Europe</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>France</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Germany</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Andorra</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>France</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Germany</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Russia</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Turkey</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>France</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Germany</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Russia</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Turkey</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  United States of USA
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Canada</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 5,
    question:
      "Wählen Sie den Code aus, der die Länder mit einem höheren BIP (GDP) als jedes andere Land in Afrika anzeigt (einige Länder haben möglicherweise NULL-BIP-Werte).",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "SELECT name FROM bbc WHERE gdp > ALL (SELECT MAX(gdp) FROM bbc WHERE region = 'Africa' AND gdp=0)",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name FROM bbc WHERE gdp > (SELECT MAX(gdp) FROM bbc WHERE region = 'Africa')",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT name FROM bbc WHERE gdp > ALL (SELECT MIN(gdp) FROM bbc WHERE region = 'Africa')",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT name FROM bbc WHERE gdp > ALL (SELECT gdp FROM bbc WHERE region = 'Africa')",
        imageUrl: "",
      },
      {
        id: 5,
        text: "SELECT name FROM bbc WHERE gdp > ALL (SELECT gdp FROM bbc WHERE region = 'Africa' AND gdp<>NULL)",
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question:
      "Wählen Sie den Code aus, der die Länder anzeigt, deren Bevölkerung kleiner als Russland, aber größer als Dänemark ist",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT name FROM bbc
        WHERE population < (SELECT population FROM bbc WHERE name='Denmark')
          AND population > (SELECT population FROM bbc WHERE name='Russia')`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT name FROM bbc
        WHERE population < (SELECT population FROM bbc WHERE name='Russia')
          AND population > (SELECT population FROM bbc WHERE name='Denmark')`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name FROM bbc
        WHERE population = (SELECT population FROM bbc WHERE name='Russia')
          AND population > (SELECT population FROM bbc WHERE name='Denmark')`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT name FROM bbc
        WHERE population > (SELECT population FROM bbc WHERE name='Russia')
          AND population > (SELECT population FROM bbc WHERE name='Denmark')`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT name FROM bbc
        WHERE population < (SELECT population FROM bbc WHERE name='Russia'
          AND population > (SELECT population FROM bbc WHERE name='Denmark')`,
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question:
      "Wählen Sie das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
    imageUrl: `SELECT name FROM bbc
    WHERE population > ALL
          (SELECT MAX(population)
             FROM bbc
            WHERE region = 'Europe')
      AND region = 'South Asia'`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Afghanistan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Bhutan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Nepal</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Sri Lanka</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>The Maldives</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Bangladesh</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>India</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Pakistan</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>China</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>India</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Brazil</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Bangladesh</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>China</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>India</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>France</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Germany</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Russia</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Turkey</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
];
export const sumandcountquizQuestions = [
  {
    id: 1,
    question:
      "Wählen Sie den Code aus, der die Summe der Bevölkerung (population) aller Länder in „Europe“ anzeigt.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT name, population FROM bbc WHERE region = 'Europe'`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT population FROM bbc WHERE region = 'Europe' SUM BY region`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT SUM(population) FROM bbc WHERE region = 'Europe'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT SUM(population FROM bbc WHERE region = 'Europe')`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SUM population FROM bbc WHERE region = 'Europe'`,
        imageUrl:
          "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      "Wählen Sie die Aussage aus, die die Anzahl der Länder mit einer Bevölkerung von weniger als 150.000 angibt",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT COUNT(name) FROM bbc WHERE population < 150000`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT COUNT(population < 150000) FROM bbc`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name FROM bbc WHERE population < 150000`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` SELECT population AS COUNT FROM bbc WHERE population < 150000`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT SUM() FROM bbc WHERE population < 150000`,
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question:
      "Wählen Sie die Liste der wichtigsten SQL-Aggregatfunktionen aus",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: "AVG(), COUNT(), FIRST(), LAST(), SUM()",
        imageUrl: "",
      },
      {
        id: 2,
        text: "AVG(), COUNT(), MAX(), MEDIAN(), MIN(), ROUND(), SUM()",
        imageUrl: "",
      },
      {
        id: 3,
        text: `AVG(), COUNT(), CONCAT(), FIRST(), LAST(), MAX(), MIN(), SUM()`,
        imageUrl: "",
      },
      {
        id: 4,
        text: " AVG(), COUNT(), MAX(), MIN(), SUM()",
        imageUrl: "",
      },
      {
        id: 5,
        text: " COUNT(), SUM()",
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 4,
    question:
      "Wählen Sie das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
    imageUrl:
      ` SELECT region, SUM(area)
      FROM bbc 
     WHERE SUM(area) > 15000000 
     GROUP BY region`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Europe</td>
                <td style={{ border: "1px solid black" }}>17000000</td>
              </tr>
              
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Europe</td>
                <td style={{ border: "1px solid black" }}>17000000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Asia-Pacific</td>
                <td style={{ border: "1px solid black" }}>23460000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>North America</td>
                <td style={{ border: "1px solid black" }}>21660000</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Europe</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Asia-Pacific</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>North America</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: "No result due to invalid use of the GROUP BY function",
        imageUrl: "",
      },
      {
        id: 5,
        text: "No result due to invalid use of the WHERE function",
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 5,
    question:
      "Wählen Sie die Aussage aus, die die durchschnittliche Bevölkerung von „Polen“ (Poland), „Deutschland“ (Germany) und „Dänemark“ (Denmark) angibt.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT AVG(population) FROM bbc WHERE name = ('Poland', 'Germany', 'Denmark')`,
        imageUrl: "",
      },
      {
        id: 2,
        text: " SELECT AVG(population) FROM bbc WHERE name IN ('Poland', 'Germany', 'Denmark')",
        imageUrl: "",
      },
      {
        id: 3,
        text: "SELECT AVG(population) FROM bbc WHERE name LIKE ('Poland', 'Germany', 'Denmark')",
        imageUrl: "",
      },
      {
        id: 4,
        text: "SELECT AVG(population) FROM bbc WHERE name LIKE (Poland, Germany, Denmark)",
        imageUrl: "",
      },
      {
        id: 5,
        text: " SELECT population FROM bbc WHERE name IN ('Poland', 'Germany', 'Denmark')",
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question:
      "Wählen Sie die Aussage aus, die die mittlere Bevölkerungsdichte jeder Region angibt",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT region, AVG(population/area) AS density FROM bbc`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT region, COUNT(population)/COUNT(area) AS density FROM bbc GROUP BY region`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT region, SUM(population)/COUNT(area) AS density FROM bbc GROUP BY region`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` SELECT region, SUM(population)/SUM(area) AS density FROM bbc HAVING region`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT region, SUM(population)/SUM(area) AS density FROM bbc GROUP BY region`,
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 7,
    question:
      "Wählen Sie die Aussage aus, die den Namen und die Bevölkerungsdichte des Landes mit der größten Bevölkerung angibt",
    imageUrl: ``,
    options: [
      {
        id: 1,
        text: ` SELECT name, density AS population/area FROM bbc WHERE population = MAX(population)`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT name, density AS population/area FROM bbc WHERE population = (SELECT MAX(population) FROM bbc)`,
        imageUrl: "",
      },
      {
        id: 3,
        text: ` SELECT name, MAX (population) FROM bbc WHERE population / (SELECT area FROM bbc)`,
        imageUrl: "",
      },
      {
        id: 4,
        text:` SELECT name, population/area AS density FROM bbc WHERE population = (SELECT MAX(population) FROM bbc)`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT name, population/area AS density FROM bbc WHERE population > (SELECT MAX(population) FROM bbc)`,
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 8,
    question:
      "Wählen Sie das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
    imageUrl:
      `  SELECT region, SUM(area) 
      FROM bbc 
     GROUP BY region 
     HAVING SUM(area)<= 20000000`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>732240</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>13403102</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>17740392</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>4943771</td>
                
              </tr>
              
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Africa</td>
                <td style={{ border: "1px solid black" }}>22550927</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Asia-Pacific</td>
                <td style={{ border: "1px solid black" }}>28759578</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Europe</td>
                <td style={{ border: "1px solid black" }}>23866987</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>North America</td>
                <td style={{ border: "1px solid black" }}>21660000</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Africa</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Asia-Pacific</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Europe</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>North America</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Americas</td>
                <td style={{ border: "1px solid black" }}>732240</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Middle-East</td>
                <td style={{ border: "1px solid black" }}>13403102</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>South America</td>
                <td style={{ border: "1px solid black" }}>17740392</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>South Asia</td>
                <td style={{ border: "1px solid black" }}>9437710</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Americas</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Middle-East</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>South America</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>South Asia</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
];
/* export const joinquizQuestions = [
  {
    id: 1,
    question:
      "You want to find the stadium where player 'Dimitris Salpingidis' scored. Select the JOIN condition to use:",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `eteam JOIN game ON (id=team1)`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `  eteam JOIN game ON (id=team2)`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `eteam JOIN goal ON (teamid=id)`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `game  JOIN goal ON (id=matchid)`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `game  JOIN goal ON (team1=teamid OR team2=teamid)`,
        imageUrl:
          "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 2,
    question:
      "You JOIN the tables goal and eteam in an SQL statement. Indicate the list of column names that may be used in the SELECT line:",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: ` gtime, mdate, stadium, matchid`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` mdate, stadium, id`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `matchid, teamid, player, gtime, id, teamname, coach`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` matchid, teamid, player, gtime, mdate, stadium, team1`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `stadium, team1, team2`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 3,
    question:
      "Select the code which shows players, their team and the amount of goals they scored against Greece(GRE).",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE") AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "POL" OR team2 = "POL")
         AND teamid != 'POL'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal WITH matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT player, teamid
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      "Select the result that would be obtained from this code:",
    imageUrl:
      `SELECT DISTINCT teamid, mdate
      FROM goal JOIN game on (matchid=id)
     WHERE mdate = '9 June 2012'`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GER</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GER</td>
                
              </tr>
              
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>POL</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS </td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>GRE</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>CZE</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>POL</td>
               
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS </td>
                
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GRE</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>CZE </td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      "Select the code which would show the player and their team for those who have scored against Poland(POL) in National Stadium, Warsaw.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
        WHERE stadium = 'National Stadium, Warsaw' 
       AND (team1 = 'GER' OR team2 = 'GER')
         AND teamid != 'GER'`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' 
      AND (team1 = 'POL' OR team2 = 'POL')
        AND teamid != 'POL'`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' AND teamid != 'POL'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'Stadion Miejski (Wroclaw)' 
      AND (team1 = 'POL' OR team2 = 'POL')
       AND teamid != 'POL'`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT stadium, mdate 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' 
      AND (team1 = 'POL' OR team2 = 'POL')
       AND teamid != 'POL'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question:
      "Select the code which shows the player, their team and the time they scored, for players who have played in Stadion Miejski (Wroclaw) but not against Italy(ITA).",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'National Stadium, Warsaw'
         AND (( teamid = team2 AND team1 != 'ITA') OR ( teamid = team1 AND team2 != 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 != 'ESP') OR ( teamid = team1 AND team2 != 'ESP'))`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 != 'ITA') OR ( teamid = team1 AND team2 != 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 != 'ITA') OR ( teamid = team1 AND team2 != 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE team1 != 'ITA' AND team2 !='ITA'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 7,
    question:
      "Select the result that would be obtained from this code:",
    imageUrl: `SELECT teamname, COUNT(*)
    FROM eteam JOIN goal ON teamid = id
   GROUP BY teamname
  HAVING COUNT(*) < 3`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>2</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>2</td>
               
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>2 </td>
                
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Netherlands</td>
                <td style={{ border: "1px solid black" }}>2</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                <td style={{ border: "1px solid black" }}>2</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Republic of Ireland</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Ukraine </td>
                <td style={{ border: "1px solid black" }}>2</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Netherlands</td>
               
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Republic of Ireland</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Ukraine </td>
                
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text:(
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                <td style={{ border: "1px solid black" }}>76</td>
              </tr>
             
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Republic of Ireland</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  
]; */
export const joinquizQuestions = [
  {
    id: 1,
    question:
      "Du möchtest das Stadion finden, in dem der Spieler 'Dimitris Salpingidis' ein Tor erzielt hat. Wähle die zu verwendende JOIN-Bedingung:",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `eteam JOIN game ON (id=team1)`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `  eteam JOIN game ON (id=team2)`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `eteam JOIN goal ON (teamid=id)`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `game  JOIN goal ON (id=matchid)`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `game  JOIN goal ON (team1=teamid OR team2=teamid)`,
        imageUrl:
          "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 2,
    question:
      "Du verbindest die Tabellen goal und eteam in einer SQL-Anweisung. Gib die Liste der Spaltennamen an, die in der SELECT-Zeile verwendet werden können:",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: ` gtime, mdate, stadium, matchid`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` mdate, stadium, id`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `matchid, teamid, player, gtime, id, teamname, coach`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` matchid, teamid, player, gtime, mdate, stadium, team1`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `stadium, team1, team2`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 3,
    question:
      "Wähle den Code aus, der Spieler, ihr Team und die Anzahl der Tore zeigt, die sie gegen Griechenland (GRE) erzielt haben.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE") AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "POL" OR team2 = "POL")
         AND teamid != 'POL'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal WITH matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT player, teamid
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid != 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      "Wähle das Ergebnis des folgenden Codes aus:",
    imageUrl:
      `SELECT DISTINCT teamid, mdate
      FROM goal JOIN game on (matchid=id)
     WHERE mdate = '9 June 2012'`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GER</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GER</td>
                
              </tr>
              
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>DEN</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>POL</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS </td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>GRE</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>CZE</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>POL</td>
               
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS </td>
                
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GRE</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>CZE </td>
                <td style={{ border: "1px solid black" }}>9 June 2012</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question:
      "Wähle den Code aus, der den Spieler und ihr Team zeigt, für diejenigen, die im 'National Stadion, Warschau' gegen Polen (POL) ein Tor geschossen haben.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
        WHERE stadium = 'National Stadium, Warsaw' 
       AND (team1 = 'GER' OR team2 = 'GER')
         AND teamid != 'GER'`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' 
      AND (team1 = 'POL' OR team2 = 'POL')
        AND teamid != 'POL'`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' AND teamid != 'POL'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'Stadion Miejski (Wroclaw)' 
      AND (team1 = 'POL' OR team2 = 'POL')
       AND teamid != 'POL'`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT stadium, mdate 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' 
      AND (team1 = 'POL' OR team2 = 'POL')
       AND teamid != 'POL'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question:
      "Wähle den Code aus, der den Spieler, ihr Team und die Zeit zeigt, zu der sie ein Tor geschossen haben, für Spieler, die im Stadion Miejski (Wroclaw) gespielt haben, aber nicht gegen Italien (ITA).",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'National Stadium, Warsaw'
         AND (( teamid = team2 AND team1 != 'ITA') OR ( teamid = team1 AND team2 != 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 != 'ESP') OR ( teamid = team1 AND team2 != 'ESP'))`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 != 'ITA') OR ( teamid = team1 AND team2 != 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 != 'ITA') OR ( teamid = team1 AND team2 != 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE team1 != 'ITA' AND team2 !='ITA'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 7,
    question:
      "Wähle das Ergebnis des folgendes Codes aus:",
    imageUrl: `SELECT teamname, COUNT(*)
    FROM eteam JOIN goal ON teamid = id
   GROUP BY teamname
  HAVING COUNT(*) < 3`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>2</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>2</td>
               
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>2 </td>
                
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Netherlands</td>
                <td style={{ border: "1px solid black" }}>2</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                <td style={{ border: "1px solid black" }}>2</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Republic of Ireland</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Ukraine </td>
                <td style={{ border: "1px solid black" }}>2</td>
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Netherlands</td>
               
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Republic of Ireland</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Ukraine </td>
                
              </tr>
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text:(
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Poland</td>
                <td style={{ border: "1px solid black" }}>76</td>
              </tr>
             
            
            </table>
          </div>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Republic of Ireland</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  
];

