//Aufgabenstellungen aus dem Englischen übersetzt von https://www.sqlzoo.net/wiki/
//Lösungen basierend auf https://github.com/MERatio/sql_zoo?tab=readme-ov-file

import React from "react";

export const topics = [
    {name: "SELECT basics", link: "basics"},
    {name: "SELECT names", link: "names"},
    {name: "SELECT Quiz", link: "selectquiz"},
    {name: "SELECT from World", link: "selectfromworld"},
    {name: "BBC Quiz", link: "bbcquiz"},
    {name: "SELECT within SELECT", link: "selectwithinselect"},
    {name: "Nested SELECT Quiz", link: "nestedselectquiz"},
    {name: "SUM and COUNT", link: "sumandcount"},
    {name: "SUM and COUNT Quiz", link: "sumandcountquiz"},
    /*  { name: "The JOIN operation", link: "joinoperation" },
  { name: "JOIN Quiz", link: "joinquiz" },
  { name: "Using Null", link: "usingnull" },
  { name: "Numeric Examples", link: "numericexamples" },
  { name: "Window function", link: "windowfunction" },
  { name: "Self join", link: "selfjoin" },
  { name: "Self join Quiz", link: "selfjoinquiz" }, */
];

export const basicsTasks = [
    {
        description:
            "Aufgabe 1: Das Beispiel verwendet eine WHERE-Klausel, um die Bevölkerung von Frankreich ('France') " +
            "anzuzeigen. Beachte, dass Zeichenfolgen in einfachen Anführungszeichen stehen sollten. Ändere das " +
            "folgende SQL Statement, um stattdessen die Bevölkerung Deutschlands ('Germany') anzuzeigen",
        defaultQuery: "SELECT population FROM world WHERE name = 'France'",
        solution: "SELECT population FROM world WHERE name = 'Germany'",
    },
    {
        description:
            "Aufgabe 2: Überprüfung einer Liste: Das Wort IN ermöglicht es zu überprüfen, ob ein Element in einer " +
            "Liste vorhanden ist. Das folgende Beispiel zeigt den Namen und die Bevölkerung für die Länder Brasilien, " +
            "Russland, Indien und China. Zeige den Namen und die Bevölkerung für Schweden, Norwegen und " +
            "Dänemark ('Sweden', 'Norway' und 'Denmark') an.",
        defaultQuery:
            "SELECT name, population FROM world WHERE name IN ('Brazil', 'Russia', 'India', 'China');",
        solution:
            "SELECT name, population FROM world WHERE name IN ('Sweden', 'Norway', 'Denmark');",
    },
    {
        description:
            "Aufgabe 3: Welche Länder sind weder zu klein noch zu groß? Mittels BETWEEN lässt sich eine " +
            "Bereichsprüfung durchführen (der angegebene Bereich schließt die Grenzwerte mit ein). Das folgende " +
            "Beispiel zeigt Länder mit einer Fläche von 250.000-300.000 km². Passe es an, um das Land und die " +
            "Fläche für Länder mit einer Fläche von 200.000-250.000 km² zu zeigen.",
        defaultQuery:
            "SELECT name, area FROM world WHERE area BETWEEN 250000 AND 300000",
        solution:
            "SELECT name, area FROM world WHERE area BETWEEN 200000 AND 250000;",
    },
];
export const namesTasks = [
    {
        description:
            "Aufgabe 1: Die Bedingung name LIKE 'B%' kann in der WHERE-Klausel verwendet werden, um die Länder " +
            "zu finden, deren Name mit 'B' beginnt. Das %-Zeichen ist ein Platzhalter, der zu beliebigen Zeichen " +
            "passt. Finde die Namen aller Länder, die mit 'Y' beginnen.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'F%'",
        solution: "SELECT name FROM world WHERE name LIKE 'Y%';",
    },
    {
        description: "Aufgabe 2: Finde die Namen aller Länder, die mit 'y' enden.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
        solution: "SELECT name FROM world WHERE name LIKE '%y';",
    },
    {
        description:
            "Aufgabe 3: Luxemburg enthält ein x - ebenso wie ein anderes Land. Finde die Namen aller Länder, die " +
            "den Buchstaben x enthalten.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
        solution: "SELECT name FROM world WHERE name LIKE '%x%';",
    },
    {
        description:
            "Aufgabe 4: Island ('Iceland') und die Schweiz ('Switzerland') enden beide mit 'land' - aber gibt es " +
            "noch andere Länder? Finde die Namen aller Länder, die mit 'land' enden.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
        solution: "SELECT name FROM world WHERE name LIKE '%land';",
    },
    {
        description:
            "Aufgabe 5: Kolumbien ('Columbia') beginnt mit einem 'C' und endet mit 'ia' - es gibt zwei weitere " +
            "Länder, deren Name diesem Muster entspricht. Finde diese Länder.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
        solution: "SELECT name FROM world WHERE name LIKE 'C%ia';",
    },
    {
        description:
            "Aufgabe 6: Griechenland ('Greece') enthält ein doopeltes 'e' im Namen - welche Länder haben ein " +
            "doppeltes 'o' im Namen? Finde diese Länder.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE '%ee%'",
        solution: "SELECT name FROM world WHERE name LIKE '%oo%';",
    },
    {
        description:
            "Aufgabe 7: Bahamas enthält drei 'a'. Finde die Länder, deren Name drei oder mehr 'a' im Namen haben.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'T%'",
        solution: "SELECT name FROM world WHERE name LIKE '%a%a%a%';",
    },
    {
        description:
            "Aufgabe 8: Indien ('India') und Angola haben beide ein 'n' als zweites Zeichen. Der Unterstrich ('_') " +
            "wird als Platzhalter für ein einzelnes Zeichen verwenden. Gib die Namen aller Länder aus, deren zweiter " +
            "Buchstabe ein 't' ist.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE '_n%' ORDER BY name",
        solution: "SELECT name FROM world WHERE name LIKE '_t%' ORDER BY name;",
    },
    {
        description:
            "Aufgabe 9: Lesotho und Moldawien ('Moldowa') haben beide zwei 'o'-Zeichen, die von genau zwei anderen " +
            "Buchstaben getrennt sind. Finde die Namen aller Länder mit diesem Muster.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE '_n%'",
        solution: "SELECT name FROM world WHERE name LIKE '%o__o%';",
    },
    {
        description:
            "Aufgabe 10: Kuba und Togo haben Namen mit vier Buchstaben. Finde die Länder, die genau vier Buchstaben " +
            "im Namen haben.",
        defaultQuery: "SELECT name FROM world WHERE name LIKE 'Cu%'",
        solution: "SELECT name FROM world WHERE name LIKE '____';",
    },
    {
        description:
            "Aufgabe 11:  Die Hauptstadt von Luxemburg ist Luxemburg. Zeige alle Länder, in denen die Hauptstadt " +
            "denselben Namen wie das Land hat. Finde das Land, in dem der Name der Hauptstadt (capital) dem Namen " +
            "des Landes (name) entspricht.",
        defaultQuery:
            "SELECT name, capital, continent FROM world WHERE name LIKE '%x%'",
        solution: "SELECT name FROM world WHERE name = capital;",
    },
    {
        description:
            "Aufgabe 12:  Die Hauptstadt von Mexiko ('Mexico') ist Mexiko City ('Mexico City'). Zeige die Namen " +
            "aller Länder, in denen der Name der Hauptstadt aus dem Namen des Landes plus dem Wort 'City' besteht.",
        defaultQuery:
            "SELECT name, concat(name, 'town') FROM world WHERE name LIKE '%ina%'",
        solution: "SELECT name FROM world WHERE capital = CONCAT(name, ' City');",
    },
    {
        description:
            "Aufgabe 13:  Finde die Hauptstädte und die Namen der Länder, bei denen die Hauptstadt den Namen des " +
            "Landes enthält.",
        defaultQuery: "",
        solution:
            "SELECT capital, name FROM world WHERE capital LIKE CONCAT('%', name, '%');",
    },
    {
        description:
            "Aufgabe 14:  Finde die Hauptstädte und die Namen der Länder, bei denen die Hauptstadt eine Erweiterung " +
            "des Landesnamens ist. Du solltest Mexico City einschließen, da es länger ist als Mexico. Du solltest " +
            "Luxemburg nicht einschließen, da die Hauptstadt denselben Namen wie das Land hat.",
        defaultQuery: "",
        solution:
            "SELECT capital, name FROM world WHERE capital LIKE CONCAT(name, '%') AND capital <> name;",
    },
    {
        description:
            "Aufgabe 15:  Die Hauptstadt von Monaco ist Monaco-Ville: Dies ist der Name Monaco und die " +
            "Erweiterung ist '-Ville'. Zeige den Namen und die Erweiterung (Spaltenname 'ext'), bei denen die " +
            "Hauptstadt eine richtige (nicht leere) Erweiterung des Landesnamens ist. Die SQL-Funktionen LENGTH, " +
            "REPLACE oder SUBSTRING könnten dafür nützlich sein.",
        defaultQuery: "",
        solution:
            "SELECT name, SUBSTRING(capital, LENGTH(name) + 1, LENGTH(capital)) as ext FROM world " +
            "WHERE capital LIKE CONCAT(name, '%') AND capital <> name;",
    },
];

export const selectfromworldTasks = [
    {
        description:
            "Aufgabe 1: Beobachte das Ergebnis der Ausführung dieses SQL-Befehls, um den Namen, den Kontinent " +
            "und die Bevölkerung aller Länder anzuzeigen.",
        defaultQuery: "SELECT name, continent, population FROM world",
        solution: "SELECT name, continent, population FROM world",
    },
    {
        description:
            "Aufgabe 2: Zeige den Namen der Länder an, die eine Bevölkerung von mindestens 200 Millionen haben.",
        defaultQuery: "SELECT name FROM world WHERE population = 64105700",
        solution: "SELECT name FROM world WHERE population >= 200000000;",
    },
    {
        description:
            "Aufgabe 3: Gib den Namen und das Pro-Kopf-BIP (per capita GDP) der Länder mit einer Bevölkerung " +
            "von mindestens 200 Millionen an.",
        defaultQuery: "",
        solution:
            "SELECT name, (gdp / population) FROM world WHERE population >= 200000000",
    },
    {
        description:
            "Aufgabe 4: Zeigt den Namen und die Bevölkerungszahl in Millionen für die Länder des Kontinents " +
            "„South America“ an. Teile die Bevölkerung durch 1000000, um die Bevölkerung in Millionen " +
            "zu erhalten.",
        defaultQuery: "",
        solution:
            "SELECT name, (population / 1000000) FROM world WHERE continent = 'South America';",
    },
    {
        description:
            "Aufgabe 5: Zeige den Namen und die Bevölkerungsanzahl für Frankreich, Deutschland und Italien " +
            "(France, Germany, Italy) an.",
        defaultQuery: "",
        solution:
            "SELECT name, population FROM world WHERE name in ('France', 'Germany', 'Italy')",
    },
    {
        description:
            "Aufgabe 6: Zeige die Namen der Länder an, die das Wort „United“ enthalten.",
        defaultQuery: "",
        solution: "SELECT name FROM world WHERE name LIKE 'United%';",
    },
    {
        description:
            "Aufgabe 7: Zwei Möglichkeiten, groß zu sein: Ein Land ist groß, wenn es eine Fläche von mehr als " +
            "3 Millionen Quadratkilometern hat oder eine Bevölkerung von mehr als 250 Millionen hat. Zeige " +
            "die Länder an, die flächenmäßig oder bevölkerungsmäßig groß sind. Gib Name, Bevölkerungsanzahl und " +
            "Fläche (area) aus.",
        defaultQuery: "",
        solution:
            "SELECT name, population, area FROM world WHERE area > 3000000 OR population > 250000000;",
    },
    {
        description:
            "Aufgabe 8: Exklusives ODER: Zeige die Länder an, die " +
            "flächenmäßig groß (mehr als 3 Millionen) oder bevölkerungsreich (mehr als 250 Millionen) sind, aber " +
            "nicht beides. Gebe Name, Bevölkerungsanzahl und Gebiet (area) aus.",
        defaultQuery: "",
        solution:
            "SELECT name, population, area FROM world WHERE (area > 3000000 AND population <= 250000000) " +
            "OR (area <= 3000000 AND population > 250000000);",
    },
    {
        description:
            "Aufgabe 9: Zeige den Namen und die Bevölkerung in Millionen sowie das GDP in Milliarden für die " +
            "Länder des Kontinents „South America“ an. Verwende die ROUND-Funktion, um die Werte mit " +
            "zwei Dezimalstellen anzuzeigen. Nenne die Spalten im Ergebnis entsprechend der erwarteten Ausgabe um.",
        defaultQuery: "",
        solution:
            "SELECT name, ROUND(population / 1000000, 2) AS pop_mil, ROUND(gdp / 1000000000, 2) AS gdp_bil " +
            "FROM world WHERE continent = 'South America';",
    },
    {
        description:
            "Aufgabe 10: Zeige den Namen und das GDP der Länder mit einem GDP von mindestens einer Billion an. " +
            "Runde diesen Wert auf die nächste 1000. Achte auf die Spaltennamen im erwarteten Ergebnis.",
        defaultQuery: "",
        solution:
            "SELECT name, ROUND(gdp / population, -3) as per_capita_gdp FROM world WHERE gdp >= 1000000000000;",
    },
    {
        description:
            "Aufgabe 11: Griechenland (Greece) hat die Hauptstadt Athen (Athens). Jede der Zeichenfolgen " +
            "'Greece' und 'Athens' besteht aus 6 Zeichen. Zeige den Namen und die Hauptstadt an, wenn " +
            "der Name und die Hauptstadt die gleiche Anzahl an Zeichen haben. Mit der LENGTH-Funktion kann man " +
            "die Anzahl der Zeichen in einer Zeichenfolge ermitteln",
        defaultQuery: "",
        solution:
            "SELECT name, capital FROM world WHERE LENGTH(name) = LENGTH(capital);",
    },
    {
        description:
            "Aufgabe 12: Die Hauptstadt Schwedens ist Stockholm. Beide Wörter beginnen mit dem Buchstaben „S“. " +
            "Zeige den Namen und die Hauptstadt an, wobei die Anfangsbuchstaben jedes Eintrags übereinstimmen. " +
            "Schließe keine Länder ein, in denen Name und Hauptstadt gleich sind. Mit der Funktion " +
            "LEFT kann man das erste Zeichen isolieren. Verwende <> als NOT EQUALS-Operator für die Ungleichheit.",
        defaultQuery: "",
        solution:
            "SELECT name, capital FROM world WHERE LEFT(name, 1) = LEFT(capital, 1) AND name <> capital;",
    },
    {
        description:
            "Aufgabe 13: Äquatorialguinea ('Equatorial Guinea') und die Dominikanische Republik ('Dominican Republic')" +
            " haben alle Vokale (a e i o u) im Namen. Finde die Länder, deren Namen alle Vokale, aber keine " +
            "Leerzeichen enthält (die beiden Beispiele zählen nicht, weil ihr Name mehr als ein Wort enthält.). " +
            "Die Phrase name NOT LIKE '...' kann verwendet werden, um Tupel aus den Ergebnissen auszuschließen.",
        defaultQuery:
            "SELECT name FROM world WHERE name LIKE 'B%' AND name NOT LIKE '%a%'",
        solution:
            "SELECT name FROM world WHERE name LIKE '%a%' AND name LIKE '%e%' AND name LIKE '%i%' " +
            "AND name LIKE '%o%' AND name LIKE '%u%' AND name NOT LIKE '% %';",
    },
];
export const selectwithinselectTasks = [
    {
        description:
            "Aufgabe 1: Liste den Namen jedes Landes auf, dessen Bevölkerung größer ist als die von Russland ('Russia').",
        defaultQuery:
            "SELECT name FROM world WHERE population > (SELECT population FROM world WHERE name='Romania')",
        solution:
            "SELECT name FROM world WHERE population > (SELECT population from world WHERE name = 'Russia');",
    },
    {
        description:
            "Aufgabe 2: Zeige die Länder in Europa an, deren Bruttoinlandsprodukt (engl. gross domestic " +
            "product, gdp) pro Kopf größer ist als „United Kingdom“.",
        defaultQuery: "",
        solution:
            "SELECT name FROM world WHERE continent = 'Europe' AND (gdp / population) > " +
            "(SELECT (gdp / population) from world WHERE name = 'United Kingdom');",
    },
    {
        description:
            "Aufgabe 3: Liste den Namen und den Kontinent der Länder auf, die auf dem gleichen Kontinent wie " +
            "Argentinien ('Argentina') oder Australien ('Australia') liegen. Sortierung nach Ländernamen.",
        defaultQuery: "",
        solution:
            "SELECT name, continent FROM world WHERE continent IN (" +
            "SELECT continent FROM world WHERE name = 'Argentina' OR name = 'Australia') ORDER BY name;",
    },
    {
        description:
            "Aufgabe 4: Welches Land hat mehr Einwohner als Kanada ('Canada'), aber weniger als Polen ('Poland')? " +
            "Zeige den Namen und die Bevölkerungsanzahl an.",
        defaultQuery: "",
        solution:
            "SELECT name, population FROM world WHERE population > " +
            "( SELECT population FROM world WHERE name = 'Canada') " +
            "AND population < ( SELECT population FROM world WHERE name = 'Poland');",
    },
    {
        description:
            "Aufgabe 5: Deutschland (ca. 80 Millionen Einwohner) ist das bevölkerungsreichste Land Europas. " +
            "In Österreich (8,5 Millionen Einwohner) leben bspw. nur 11 % der Bevölkerung Deutschlands. " +
            "Zeige den Namen und die Bevölkerung jedes Landes in Europa ('Europe') an sowie die Bevölkerung " +
            "als Prozentsatz (gerundet ohne Nachkommastellen und mit angefügtem '%' Zeichen) " +
            "der Bevölkerung Deutschlands an.",
        defaultQuery: "",
        solution:
            "SELECT name, CONCAT(ROUND((population / (SELECT population FROM world WHERE name = 'Germany') * 100)), '%') " +
            "FROM world WHERE continent = 'Europe';",
    },
    {
        description:
            "Aufgabe 6: Welche Länder haben ein höheres GDP als jedes andere Land in Europa? " +
            "(Einige Länder haben möglicherweise NULL-Werte für GDP.)",
        defaultQuery: "",
        solution:
            "SELECT name FROM world WHERE gdp > ALL(SELECT gdp FROM world WHERE (continent = 'Europe') AND (gdp > 0));",
    },
    {
        description:
            "Aufgabe 7: Finde das flächenmäßig größte Land auf jedem Kontinent und zeige den Kontinent, " +
            "den Namen und die Fläche an: Das Beispiel wird als korrelierte oder synchronisierte Unterabfrage " +
            "bezeichnet. (Achtung: NULL-Werte könnten wieder das Ergebnis der Anfrage beeinflussen)",
        defaultQuery:
            "SELECT continent, name, population FROM world x WHERE population >= ALL " +
            "(SELECT population FROM world y WHERE y.continent=x.continent AND population>0)",
        solution:
            "SELECT continent, name, area FROM world x WHERE area >= ALL " +
            "(SELECT area FROM world y WHERE y.continent = x.continent AND area > 0);",
    },
    {
        description:
            "Aufgabe 8: Liste jeden Kontinent und den Namen des jeweiligen Landes auf, das alphabetisch " +
            "auf diesem Kontinent an erster Stelle steht. Beachte die Spaltennamen des Ergebnisses.",
        defaultQuery: "",
        solution: "SELECT continent, MIN(name) AS name FROM world GROUP BY continent;",
    },
    {
        description:
            "Aufgabe 9: Suche die Kontinente, auf denen alle Länder eine Bevölkerung von <= 25000000 haben. " +
            "Suche dann die Namen der Länder, die diesen Kontinenten zugeordnet sind. Gib Name, " +
            "Kontinent und Bevölkerung aus.",
        defaultQuery: "",
        solution:
            "SELECT name, continent, population FROM world AS x WHERE 25000000 > ALL " +
            "( SELECT population FROM world AS y WHERE y.continent = x.continent AND population > 0);",
    },
    {
        description:
            "Aufgabe 10: In manchen Ländern leben mehr als dreimal so viele Menschen im Vergleich zu jedem anderen " +
            "Land auf dem gleichen Kontinent. Gib die Länder und Kontinente an.",
        defaultQuery: "",
        solution:
            "SELECT name, continent FROM world AS x WHERE population > ALL " +
            "( SELECT population * 3 FROM world as y WHERE y.continent = x.continent AND y.name <> x.name);",
    },
];
export const sumandcountTasks = [
    {
        description:
            "Aufgabe 1: Zeige die Gesamtbevölkerungsanzahl der Welt an.",
        defaultQuery: "SELECT COUNT(*) FROM world",
        solution: "SELECT SUM(population) FROM world;",
    },
    {
        description:
            "Aufgabe 2: Liste alle Kontinente auf – jeweils nur einmal.",
        defaultQuery: "",
        solution: "SELECT DISTINCT continent FROM world;",
    },
    {
        description: "Aufgabe 3: Gib das gesamte Bruttoinlandsprodukt (GDP) Afrikas an.",
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
            "Aufgabe 5: Wie groß ist die Gesamtbevölkerung von Estland, Lettland und Litauen ('Estonia', 'Latvia', 'Lithuania')?",
        defaultQuery: "",
        solution:
            "SELECT SUM(population) FROM world WHERE name IN ('Estonia', 'Latvia', 'Lithuania');",
    },
    {
        description:
            "Aufgabe 6: Zeige für jeden Kontinent den Namen des Kontinent und die Anzahl der Länder an.",
        defaultQuery: "",
        solution: "SELECT continent, COUNT(name) FROM world GROUP BY continent;",
    },
    {
        description:
            "Aufgabe 7: Gib für jeden Kontinent den Namen des Kontinent und die Anzahl der Länder mit einer " +
            "Bevölkerung von mindestens 10 Millionen an.",
        defaultQuery: "",
        solution:
            "SELECT continent, COUNT(name) FROM world WHERE population > 10000000 GROUP BY continent;",
    },
    {
        description:
            "Aufgabe 8: Liste die Kontinente auf, die eine Gesamtbevölkerung von mindestens 100 Millionen haben.",
        defaultQuery: "",
        solution:
            "SELECT continent FROM world GROUP BY continent HAVING SUM(population) >= 100000000;",
    },
];

//Quizzes

export const selectquizQuestions = [
    {
        id: 1,
        question: "Wähle den Code, der die folgende Tabelle erzeugt:",
        imageUrl: (
            <table style={{borderCollapse: "collapse", border: "1px solid black"}}>
                <tr>
                    <th style={{border: "1px solid black"}}>name</th>
                    <th style={{border: "1px solid black"}}>population</th>
                </tr>
                <tr>
                    <td style={{border: "1px solid black"}}>Bahrain</td>
                    <td style={{border: "1px solid black"}}>1234571</td>
                </tr>
                <tr>
                    <td style={{border: "1px solid black"}}>Swaziland</td>
                    <td style={{border: "1px solid black"}}>1220000</td>
                </tr>
                <tr>
                    <td style={{border: "1px solid black"}}>Timor-Leste</td>
                    <td style={{border: "1px solid black"}}>1066409</td>
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
            "Wähle das Ergebnis aus, das man mit diesem Code erhalten würden: ",
        imageUrl: 'SELECT name, population FROM world WHERE name LIKE "Al%"',
        options: [
            {
                id: 1,
                text: (
                    <div>
                        <p>Tabelle A</p>
                        <table
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Albania</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Algeria</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>%bania</td>
                                <td style={{border: "1px solid black"}}>3200000</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>%geria</td>
                                <td style={{border: "1px solid black"}}>32900000</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Al</td>
                                <td style={{border: "1px solid black"}}>0</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Albania</td>
                                <td style={{border: "1px solid black"}}>3200000</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Albania</td>
                                <td style={{border: "1px solid black"}}>3200000</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Algeria</td>
                                <td style={{border: "1px solid black"}}>32900000</td>
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
            "Wähle den Code aus, der die Länder anzeigt, die auf 'a' oder 'l' enden",
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
            "Wähle das Ergebnis aus, das mit diesem Code erhalten würden: ",
        imageUrl:
            "SELECT name,length(name) FROM world WHERE length(name)=5 and region='Europe'",
        options: [
            {
                id: 1,
                text: (
                    <div>
                        <table
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <th style={{border: "1px solid black"}}>name</th>
                                <th style={{border: "1px solid black"}}>length(name)</th>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Benin</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Lybia</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Egypt</td>
                                <td style={{border: "1px solid black"}}>5</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <th style={{border: "1px solid black"}}>name</th>
                                <th style={{border: "1px solid black"}}>length(name)</th>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Italy</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Egypt</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Spain</td>
                                <td style={{border: "1px solid black"}}>5</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <th style={{border: "1px solid black"}}>name</th>
                                <th style={{border: "1px solid black"}}>length(name)</th>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Italy</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Malta</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Spain</td>
                                <td style={{border: "1px solid black"}}>5</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <th style={{border: "1px solid black"}}>name</th>
                                <th style={{border: "1px solid black"}}>length(name)</th>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Italy</td>
                                <td style={{border: "1px solid black"}}>5</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>France</td>
                                <td style={{border: "1px solid black"}}>6</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Spain</td>
                                <td style={{border: "1px solid black"}}>5</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <th style={{border: "1px solid black"}}>name</th>
                                <th style={{border: "1px solid black"}}>length(name)</th>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Sweden</td>
                                <td style={{border: "1px solid black"}}>6</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Norway</td>
                                <td style={{border: "1px solid black"}}>6</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Poland</td>
                                <td style={{border: "1px solid black"}}>6</td>
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
            "Wähle das Ergebnis aus, das mit diesem Code erhalten würden: " +
            "SELECT name, area*2 FROM world WHERE population = 64000 ",
        imageUrl: (
            <div>
                <p>Betrachte dabei die folgende Tabelle:</p>
                <table
                    style={{borderCollapse: "collapse", border: "1px solid black"}}
                >
                    <tr>
                        <th style={{border: "1px solid black"}}>name</th>
                        <th style={{border: "1px solid black"}}>continent</th>
                        <th style={{border: "1px solid black"}}>area</th>
                        <th style={{border: "1px solid black"}}>population</th>
                        <th style={{border: "1px solid black"}}>gdp</th>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Afghanistan</td>
                        <td style={{border: "1px solid black"}}>South Asia</td>
                        <td style={{border: "1px solid black"}}>652225</td>
                        <td style={{border: "1px solid black"}}>26000000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Albania</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>28728</td>
                        <td style={{border: "1px solid black"}}>3200000</td>
                        <td style={{border: "1px solid black"}}>6656000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Algeria</td>
                        <td style={{border: "1px solid black"}}>Middle East</td>
                        <td style={{border: "1px solid black"}}>2400000</td>
                        <td style={{border: "1px solid black"}}>32900000</td>
                        <td style={{border: "1px solid black"}}>75012000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Andorra</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>468</td>
                        <td style={{border: "1px solid black"}}>64000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>234</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>468</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>936</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>4680</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>936</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Albania</td>
                                <td style={{border: "1px solid black"}}>57456</td>
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
            "Wähle den Code aus, der die Länder mit einer Fläche (area) von mehr als 50.000 und einer " +
            "Bevölkerung von weniger als 1.000.000 anzeigt",
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
            "Wähle den Code aus, der die Bevölkerungsdichte von China, Australia, Nigeria und France anzeigt",
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
            "Wähle den Code aus, der die Namen der Länder angibt, die mit 'U' beginnen",
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
            "Wähle den Code aus, der nur die Bevölkerungsanzahl (population) des Vereinigten Königreichs " +
            "(United Kingdom) anzeigt?",
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
            "Wähle die Antwort aus, die das Problem mit diesem SQL-Code zeigt – das gewünschte Ergebnis sollte " +
            "der Kontinent sein, auf dem das Land Frankreich (France) liegt:",
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
            "Wähle das Ergebnis aus, das man mit dem folgenden Code erhalten würde: " +
            "SELECT name, population / 10  FROM world WHERE population < 10000",
        imageUrl: (
            <div>
                <p>Betrachte dabei die folgende Tabelle:</p>
                <table
                    style={{borderCollapse: "collapse", border: "1px solid black"}}
                >
                    <tr>
                        <th style={{border: "1px solid black"}}>name</th>
                        <th style={{border: "1px solid black"}}>continent</th>
                        <th style={{border: "1px solid black"}}>area</th>
                        <th style={{border: "1px solid black"}}>population</th>
                        <th style={{border: "1px solid black"}}>gdp</th>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Afghanistan</td>
                        <td style={{border: "1px solid black"}}>South Asia</td>
                        <td style={{border: "1px solid black"}}>652225</td>
                        <td style={{border: "1px solid black"}}>26000000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Albania</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>28728</td>
                        <td style={{border: "1px solid black"}}>3200000</td>
                        <td style={{border: "1px solid black"}}>6656000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Algeria</td>
                        <td style={{border: "1px solid black"}}>Middle East</td>
                        <td style={{border: "1px solid black"}}>2400000</td>
                        <td style={{border: "1px solid black"}}>32900000</td>
                        <td style={{border: "1px solid black"}}>75012000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Andorra</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>468</td>
                        <td style={{border: "1px solid black"}}>64000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Brazil</td>
                        <td style={{border: "1px solid black"}}>South America</td>
                        <td style={{border: "1px solid black"}}>8550000</td>
                        <td style={{border: "1px solid black"}}>182800000</td>
                        <td style={{border: "1px solid black"}}>564852000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Colombia</td>
                        <td style={{border: "1px solid black"}}>South America</td>
                        <td style={{border: "1px solid black"}}>1140000</td>
                        <td style={{border: "1px solid black"}}>45600000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Nauru</td>
                        <td style={{border: "1px solid black"}}>Asia-Pacific</td>
                        <td style={{border: "1px solid black"}}>21</td>
                        <td style={{border: "1px solid black"}}>9900</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Uzbekistan</td>
                        <td style={{border: "1px solid black"}}>Central Asia</td>
                        <td style={{border: "1px solid black"}}>447000</td>
                        <td style={{border: "1px solid black"}}>26000000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>6400</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Nauru</td>
                                <td style={{border: "1px solid black"}}>9900</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                                <td style={{border: "1px solid black"}}>64000</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Nauru</td>
                                <td style={{border: "1px solid black"}}>9900</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Nauru</td>
                                <td style={{border: "1px solid black"}}>99</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Nauru</td>
                                <td style={{border: "1px solid black"}}>990</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Nauru</td>
                                <td style={{border: "1px solid black"}}>9900</td>
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
            "Wähle den Code aus, der den Namen (name) und die Bevölkerung (population) von Ländern in " +
            "Europa (Europe) und Asien (Asia) anzeigt",
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
        question: "Wähle den Code aus, der zwei Zeilen ergeben würde",
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
            "Wähle das Ergebnis aus, das man mit diesem Code erhalten würde: " +
            "SELECT name FROM world WHERE continent = 'South America' AND population > 40000000",
        imageUrl: (
            <div>
                <p>Betrachte dabei die folgende Tabelle:</p>
                <table
                    style={{borderCollapse: "collapse", border: "1px solid black"}}
                >
                    <tr>
                        <th style={{border: "1px solid black"}}>name</th>
                        <th style={{border: "1px solid black"}}>continent</th>
                        <th style={{border: "1px solid black"}}>area</th>
                        <th style={{border: "1px solid black"}}>population</th>
                        <th style={{border: "1px solid black"}}>gdp</th>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Afghanistan</td>
                        <td style={{border: "1px solid black"}}>South Asia</td>
                        <td style={{border: "1px solid black"}}>652225</td>
                        <td style={{border: "1px solid black"}}>26000000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Albania</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>28728</td>
                        <td style={{border: "1px solid black"}}>3200000</td>
                        <td style={{border: "1px solid black"}}>6656000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Algeria</td>
                        <td style={{border: "1px solid black"}}>Middle East</td>
                        <td style={{border: "1px solid black"}}>2400000</td>
                        <td style={{border: "1px solid black"}}>32900000</td>
                        <td style={{border: "1px solid black"}}>75012000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Andorra</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>468</td>
                        <td style={{border: "1px solid black"}}>64000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Brazil</td>
                        <td style={{border: "1px solid black"}}>South America</td>
                        <td style={{border: "1px solid black"}}>8550000</td>
                        <td style={{border: "1px solid black"}}>182800000</td>
                        <td style={{border: "1px solid black"}}>564852000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Colombia</td>
                        <td style={{border: "1px solid black"}}>South America</td>
                        <td style={{border: "1px solid black"}}>1140000</td>
                        <td style={{border: "1px solid black"}}>45600000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Nauru</td>
                        <td style={{border: "1px solid black"}}>Asia-Pacific</td>
                        <td style={{border: "1px solid black"}}>21</td>
                        <td style={{border: "1px solid black"}}>9900</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Uzbekistan</td>
                        <td style={{border: "1px solid black"}}>Central Asia</td>
                        <td style={{border: "1px solid black"}}>447000</td>
                        <td style={{border: "1px solid black"}}>26000000</td>
                        <td style={{border: "1px solid black"}}></td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Afghanistan</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Colombia</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Colombia</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
                                <td style={{border: "1px solid black"}}>South America</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Colombia</td>
                                <td style={{border: "1px solid black"}}>South America</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
                                <td style={{border: "1px solid black"}}>182800000</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Colombia</td>
                                <td style={{border: "1px solid black"}}>45600000</td>
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
            "Wähle den Code aus, der den Namen, die Region und die Bevölkerung des kleinsten Landes " +
            "in jeder Region anzeigt",
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
            "Wähle den Code aus, der die Länder anzeigt, die zu Regionen mit einer Gesamtbevölkerung von " +
            "über 50.000 gehören",
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
            "Wähle den Code aus, der die Länder anzeigt, in denen weniger als ein Drittel der Bevölkerung der " +
            "umliegenden Länder (in der gleichen Region) leben",
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
                text: `SELECT name, region
                       FROM bbc x
                       WHERE population > ALL
                             (SELECT population / 3 FROM bbc y WHERE y.region = x.region AND y.name != x.name)`,
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
            "Wähle das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
        imageUrl:
            "SELECT name FROM bbc WHERE population > (SELECT population FROM bbc WHERE name='United Kingdom') AND region IN (SELECT region FROM bbc WHERE name = 'United Kingdom')",
        options: [
            {
                id: 1,
                text: (
                    <div>
                        <table
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Albania</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Austria</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Bulgaria</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>France</td>
                                <td style={{border: "1px solid black"}}>Europe</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Germany</td>
                                <td style={{border: "1px solid black"}}>Europe</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Russia</td>
                                <td style={{border: "1px solid black"}}>Europe</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Turkey</td>
                                <td style={{border: "1px solid black"}}>Europe</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>France</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Germany</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Andorra</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Albania</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>France</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Germany</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Russia</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Turkey</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>France</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Germany</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Russia</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Turkey</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>
                                    United States of USA
                                </td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Canada</td>
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
            "Wähle den Code aus, der die Länder mit einem höheren BIP (GDP) als jedes andere Land in Afrika anzeigt " +
            "(einige Länder haben möglicherweise NULL-BIP-Werte).",
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
            "Wähle den Code aus, der die Länder anzeigt, deren Bevölkerung kleiner als Russland, aber " +
            "größer als Dänemark ist",
        imageUrl: "",
        options: [
            {
                id: 1,
                text: `SELECT name
                       FROM bbc
                       WHERE population < (SELECT population FROM bbc WHERE name = 'Denmark')
                         AND population > (SELECT population FROM bbc WHERE name = 'Russia')`,
                imageUrl: "",
            },
            {
                id: 2,
                text: `SELECT name
                       FROM bbc
                       WHERE population < (SELECT population FROM bbc WHERE name = 'Russia')
                         AND population > (SELECT population FROM bbc WHERE name = 'Denmark')`,
                imageUrl: "",
            },
            {
                id: 3,
                text: `SELECT name
                       FROM bbc
                       WHERE population = (SELECT population FROM bbc WHERE name = 'Russia')
                         AND population > (SELECT population FROM bbc WHERE name = 'Denmark')`,
                imageUrl: "",
            },
            {
                id: 4,
                text: `SELECT name
                       FROM bbc
                       WHERE population > (SELECT population FROM bbc WHERE name = 'Russia')
                         AND population > (SELECT population FROM bbc WHERE name = 'Denmark')`,
                imageUrl: "",
            },
            {
                id: 5,
                text: `SELECT name
                       FROM bbc
                       WHERE population < (SELECT population
                                           FROM bbc
                                           WHERE name = 'Russia'
                                             AND population > (SELECT population FROM bbc WHERE name = 'Denmark')`,
                imageUrl: "",
            },
        ],
        correctAnswer: 2,
    },
    {
        id: 7,
        question:
            "Wähle das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
        imageUrl: `SELECT name
                   FROM bbc
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Afghanistan</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Bhutan</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Nepal</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Sri Lanka</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>The Maldives</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Bangladesh</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>India</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Pakistan</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>China</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>India</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Brazil</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Bangladesh</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>China</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>India</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>France</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Germany</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Russia</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Turkey</td>
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
            "Wähle den Code aus, der die Summe der Bevölkerung (population) aller Länder in „Europe“ anzeigt.",
        imageUrl: "",
        options: [
            {
                id: 1,
                text: `SELECT name, population
                       FROM bbc
                       WHERE region = 'Europe'`,
                imageUrl: "",
            },
            {
                id: 2,
                text: ` SELECT population
                        FROM bbc
                        WHERE region = 'Europe' SUM BY region`,
                imageUrl: "",
            },
            {
                id: 3,
                text: `SELECT SUM(population)
                       FROM bbc
                       WHERE region = 'Europe'`,
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
            "Wähle die Aussage aus, die die Anzahl der Länder mit einer Bevölkerung von weniger als 150.000 angibt",
        imageUrl: "",
        options: [
            {
                id: 1,
                text: `SELECT COUNT(name)
                       FROM bbc
                       WHERE population < 150000`,
                imageUrl: "",
            },
            {
                id: 2,
                text: ` SELECT COUNT(population < 150000)
                        FROM bbc`,
                imageUrl: "",
            },
            {
                id: 3,
                text: `SELECT name
                       FROM bbc
                       WHERE population < 150000`,
                imageUrl: "",
            },
            {
                id: 4,
                text: ` SELECT population AS COUNT
                        FROM bbc
                        WHERE population < 150000`,
                imageUrl: "",
            },
            {
                id: 5,
                text: `SELECT SUM()
                       FROM bbc
                       WHERE population < 150000`,
                imageUrl: "",
            },
        ],
        correctAnswer: 1,
    },
    {
        id: 3,
        question:
            "Wähle die Liste der wichtigsten SQL-Aggregatfunktionen aus",
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
            "Wähle das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Europe</td>
                                <td style={{border: "1px solid black"}}>17000000</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Europe</td>
                                <td style={{border: "1px solid black"}}>17000000</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Asia-Pacific</td>
                                <td style={{border: "1px solid black"}}>23460000</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>North America</td>
                                <td style={{border: "1px solid black"}}>21660000</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Europe</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Asia-Pacific</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>North America</td>
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
            "Wähle die Aussage aus, die die durchschnittliche Bevölkerung von Polen (Poland), Deutschland (Germany) " +
            "und Dänemark (Denmark) angibt.",
        imageUrl: "",
        options: [
            {
                id: 1,
                text: `SELECT AVG(population)
                       FROM bbc
                       WHERE name = ('Poland', 'Germany', 'Denmark')`,
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
            "Wähle die Aussage aus, die die mittlere Bevölkerungsdichte jeder Region angibt",
        imageUrl: "",
        options: [
            {
                id: 1,
                text: `SELECT region, AVG(population / area) AS density
                       FROM bbc`,
                imageUrl: "",
            },
            {
                id: 2,
                text: `SELECT region, COUNT(population) / COUNT(area) AS density
                       FROM bbc
                       GROUP BY region`,
                imageUrl: "",
            },
            {
                id: 3,
                text: `SELECT region, SUM(population) / COUNT(area) AS density
                       FROM bbc
                       GROUP BY region`,
                imageUrl: "",
            },
            {
                id: 4,
                text: ` SELECT region, SUM(population) / SUM(area) AS density
                        FROM bbc
                        HAVING region`,
                imageUrl: "",
            },
            {
                id: 5,
                text: `SELECT region, SUM(population) / SUM(area) AS density
                       FROM bbc
                       GROUP BY region`,
                imageUrl: "",
            },
        ],
        correctAnswer: 5,
    },
    {
        id: 7,
        question:
            "Wähle die Aussage aus, die den Namen und die Bevölkerungsdichte des Landes mit der " +
            "größten Bevölkerung angibt",
        imageUrl: ``,
        options: [
            {
                id: 1,
                text: ` SELECT name, density AS population/area
                        FROM bbc
                        WHERE population = MAX (population)`,
                imageUrl: "",
            },
            {
                id: 2,
                text: ` SELECT name, density AS population/area
                        FROM bbc
                        WHERE population = (SELECT MAX (population) FROM bbc)`,
                imageUrl: "",
            },
            {
                id: 3,
                text: ` SELECT name, MAX(population)
                        FROM bbc
                        WHERE population / (SELECT area FROM bbc)`,
                imageUrl: "",
            },
            {
                id: 4,
                text: ` SELECT name, population / area AS density
                        FROM bbc
                        WHERE population = (SELECT MAX(population) FROM bbc)`,
                imageUrl: "",
            },
            {
                id: 5,
                text: `SELECT name, population / area AS density
                       FROM bbc
                       WHERE population > (SELECT MAX(population) FROM bbc)`,
                imageUrl: "",
            },
        ],
        correctAnswer: 4,
    },
    {
        id: 8,
        question:
            "Wähle das Ergebnis aus, das man mit dem folgenden Code erhalten würde:",
        imageUrl:
            `  SELECT region, SUM(area)
               FROM bbc
               GROUP BY region
               HAVING SUM(area) <= 20000000`,
        options: [
            {
                id: 1,
                text: (
                    <div>
                        <table
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>732240</td>

                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>13403102</td>

                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>17740392</td>

                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>4943771</td>

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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Africa</td>
                                <td style={{border: "1px solid black"}}>22550927</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Asia-Pacific</td>
                                <td style={{border: "1px solid black"}}>28759578</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Europe</td>
                                <td style={{border: "1px solid black"}}>23866987</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>North America</td>
                                <td style={{border: "1px solid black"}}>21660000</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Africa</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Asia-Pacific</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Europe</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>North America</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Americas</td>
                                <td style={{border: "1px solid black"}}>732240</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Middle-East</td>
                                <td style={{border: "1px solid black"}}>13403102</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>South America</td>
                                <td style={{border: "1px solid black"}}>17740392</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>South Asia</td>
                                <td style={{border: "1px solid black"}}>9437710</td>
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
                            style={{borderCollapse: "collapse", border: "1px solid black"}}
                        >
                            <tr>
                                <td style={{border: "1px solid black"}}>Americas</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>Middle-East</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>South America</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black"}}>South Asia</td>
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
