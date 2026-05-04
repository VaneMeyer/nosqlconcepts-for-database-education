//Aufgabenstellungen aus dem Englischen übersetzt von https://www.sqlzoo.net/wiki/
//Lösungen basierend auf https://github.com/MERatio/sql_zoo?tab=readme-ov-file

import React from "react";

export const topics = [
  { name: "SELECT Quiz", link: "selectquiz" },

  { name: "BBC Quiz", link: "bbcquiz" },

  { name: "Nested SELECT Quiz", link: "nestedselectquiz" },

  { name: "SUM and COUNT Quiz", link: "sumandcountquiz" },

  { name: "JOIN Quiz", link: "joinquiz" },

  { name: "JOIN Quiz 2", link: "joinquiz2" },

  { name: "Using Null Quiz", link: "usingnullquiz" },

  { name: "Self join Quiz", link: "selfjoinquiz" },
];

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
        imageUrl: "",
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
        text: "SELECT name, region FROM bbc x WHERE population < ALL (SELECT population/3 FROM bbc y WHERE y.region = x.region AND y.name <> x.name)",
        imageUrl: "",
      },
      {
        id: 2,
        text: "SELECT name, region FROM bbc x WHERE population = ALL (SELECT population/3 FROM bbc y WHERE y.region = x.region AND y.name <> x.name)",
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name, region FROM bbc x WHERE population > ALL (SELECT population/3 FROM bbc y WHERE y.region = x.region AND y.name <> x.name)`,
        imageUrl: "",
      },
      {
        id: 4,
        text: " SELECT name, region FROM bbc x WHERE population < ALL (SELECT population*3 FROM bbc y WHERE y.region = x.region AND y.name <> x.name)",
        imageUrl: "",
      },
      {
        id: 5,
        text: " SELECT name, region FROM bbc x WHERE population < ALL (SELECT population/3 FROM bbc y WHERE y.name <> x.name)",
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
        imageUrl: "",
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
    question: "Wählen Sie die Liste der wichtigsten SQL-Aggregatfunktionen aus",
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
    imageUrl: ` SELECT region, SUM(area)
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
        text: ` SELECT name, population/area AS density FROM bbc WHERE population = (SELECT MAX(population) FROM bbc)`,
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
    imageUrl: `  SELECT region, SUM(area) 
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
        imageUrl: "",
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
         AND teamid <> 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE") AND teamid <> 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "POL" OR team2 = "POL")
         AND teamid <> 'POL'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT player, teamid, COUNT(*)
        FROM game JOIN goal WITH matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid <> 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT player, teamid
        FROM game JOIN goal ON matchid = id
       WHERE (team1 = "GRE" OR team2 = "GRE")
         AND teamid <> 'GRE'
       GROUP BY player, teamid`,
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Wähle das Ergebnis des folgenden Codes aus:",
    imageUrl: `SELECT DISTINCT teamid, mdate
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
         AND teamid <> 'GER'`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' 
      AND (team1 = 'POL' OR team2 = 'POL')
        AND teamid <> 'POL'`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' AND teamid <> 'POL'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT player, teamid 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'Stadion Miejski (Wroclaw)' 
      AND (team1 = 'POL' OR team2 = 'POL')
       AND teamid <> 'POL'`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT stadium, mdate 
        FROM game JOIN goal ON matchid = id 
       WHERE stadium = 'National Stadium, Warsaw' 
      AND (team1 = 'POL' OR team2 = 'POL')
       AND teamid <> 'POL'`,
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
         AND (( teamid = team2 AND team1 <> 'ITA') OR ( teamid = team1 AND team2 <> 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 <> 'ESP') OR ( teamid = team1 AND team2 <> 'ESP'))`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 <> 'ITA') OR ( teamid = team1 AND team2 <> 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE stadium = 'Stadion Miejski (Wroclaw)'
         AND (( teamid = team2 AND team1 <> 'ITA') OR ( teamid = team1 AND team2 <> 'ITA'))`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT player, teamid, gtime
        FROM game JOIN goal ON matchid = id
       WHERE team1 <> 'ITA' AND team2 <>'ITA'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 7,
    question: "Wähle das Ergebnis des folgendes Codes aus:",
    imageUrl: `SELECT teamname, COUNT(*)
    FROM eteam JOIN goal ON teamid = id
   GROUP BY id
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
                <td style={{ border: "1px solid black" }}>
                  Republic of Ireland
                </td>
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
                <td style={{ border: "1px solid black" }}>
                  Republic of Ireland
                </td>
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
        text: (
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
                <td style={{ border: "1px solid black" }}>
                  Republic of Ireland
                </td>
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
export const joinquiz2Questions = [
  {
    id: 1,
    question:
      "Wählen Sie die Aussage, die die unglücklichen Regisseure der Filme auflistet, die finanzielle Verluste verursacht haben (gross < budget)",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT JOIN(name FROM actor, movie
          ON actor.id:director WHERE gross < budget)
    GROUP BY name`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT name
        FROM actor INNER JOIN movie BY actor.id = director
        HAVING gross < budget`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name
        FROM actor INNER JOIN movie ON actor.id = director
       WHERE gross < budget`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT name
        FROM actor INNER JOIN movie ON actor.id:director
       WHERE gross < budget`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT name
        FROM director INNER JOIN movie ON movie.id = director.id
       WHERE gross < budget`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      " Wählen Sie das korrekte Beispiel, um drei Tabellen zu vereinigen.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT * 
        FROM actor JOIN casting BY actor.id = actorid
       JOIN movie BY movie.id = movieid`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT *
        FROM actor JOIN casting ON actor.id = actorid
         AND JOIN movie ON movie.id = movieid`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT *
        FROM actor JOIN casting
        JOIN movie ON actor.id = actorid
         AND movie.id = movieid`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT *
        FROM actor JOIN casting ON actor.id = actorid
         AND movie ON movie.id = movieid`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT *
        FROM actor JOIN casting ON actor.id = actorid
        JOIN movie ON movie.id = movieid`,
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 3,
    question:
      "Wählen Sie die Aussage aus, die die Liste der Schauspieler mit dem Namen „John“ in der Reihenfolge der Anzahl der Filme, in denen sie mitgespielt haben, anzeigt.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT name, COUNT(movieid)
        FROM actor JOIN casting ON actorid=actor.id
       WHERE name IN 'John %'
       GROUP BY name ORDER BY 2`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT name, COUNT(movieid)
        FROM actor JOIN casting ON actorid=actor.id
       WHERE name LIKE 'J%'
       GROUP BY name ORDER BY 2 DESC`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name, COUNT(movieid)
        FROM casting JOIN actor ON actorid=actor.id
       WHERE name LIKE 'John %'
       GROUP BY name ORDER BY 2 DESC`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT name, COUNT(movieid)
        FROM casting JOIN actor
       WHERE (actorid ON actor.id)
         AND name LIKE 'John %'
       GROUP BY name ORDER BY 2 DESC`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT name, COUNT(movieid)
        FROM casting JOIN actor
       WHERE name LIKE 'John %'
       GROUP BY name ORDER BY COUNT(movieid) DESC`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 4,
    question:
      "Wählen Sie das Ergebnis aus, welches die folgende Aussage erzeugen würde:",
    imageUrl: ` SELECT title 
      FROM movie JOIN casting ON (movieid=movie.id)
                 JOIN actor   ON (actorid=actor.id)
     WHERE name='Paul Hogan' AND ord = 1`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>
                  "Crocodile" Dundee
                </td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Crocodile Dundee in Los Angeles
                </td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Flipper</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Lightning Jack</td>
                <td style={{ border: "1px solid black" }}>1</td>
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
                <td style={{ border: "1px solid black" }}>
                  "Crocodile" Dundee
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Crocodile Dundee in Los Angeles
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Flipper</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Lightning Jack</td>
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
                <td style={{ border: "1px solid black" }}>
                  "Crocodile" Dundee
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1</td>
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
                <td style={{ border: "1px solid black" }}>
                  "Crocodile" Dundee
                </td>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Crocodile Dundee in Los Angeles
                </td>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Flipper</td>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Lightning Jack </td>
                <td style={{ border: "1px solid black" }}>Paul Hogan </td>
                <td style={{ border: "1px solid black" }}>1 </td>
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
                <td style={{ border: "1px solid black" }}>
                  "Crocodile" Dundee
                </td>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Crocodile Dundee in Los Angeles
                </td>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Flipper</td>
                <td style={{ border: "1px solid black" }}>Paul Hogan</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Lightning Jack </td>
                <td style={{ border: "1px solid black" }}>Paul Hogan </td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question:
      "Wählen Sie die Aussage, die alle Schauspieler auflistet, die in Filmen unter der Regie von Ridley Scott (der id 351 hat) mitgewirkt haben.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT name
        FROM movie JOIN casting
         AND actor ON movie.id = movieid
         AND actor.id = actorid
       WHERE ord = 1
        AND actor = 351`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT name
        FROM movie JOIN casting
        JOIN actor ON movie.id = movieid
          OR actor.id = actorid
       WHERE ord = 1 AND director = 351`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT name
        FROM movie JOIN casting ON movie.id = movieid
        JOIN actor ON actor.id = actorid
       WHERE ord = 1 AND actorid = 351`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT name
        FROM movie JOIN casting ON movie.id = movieid
        JOIN actor ON actor.id = actorid
      WHERE ord = 1 AND director = 351`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT name
        FROM movie JOIN casting ON movie.id = actorid
        JOIN actor ON actor.id = movieid
       WHERE director = 351`,
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
  {
    id: 6,
    question:
      "Es gibt zwei sinnvolle Möglichkeiten, Film und Schauspieler zu verbinden. Wählen sie die zwei sinnvollen Möglichkeiten aus den folgenden aus:",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: (
          <ul>
            <li>
              link the director column in movies with the id column in actor
            </li>
            <li>join casting to itself</li>
          </ul>
        ),
        imageUrl: "",
      },
      {
        id: 2,
        text: (
          <ul>
            <li>
              link the actor column in movies with the primary key in actor
            </li>
            <li>
              connect the primary keys of movie and actor via the casting table
            </li>
          </ul>
        ),
        imageUrl: "",
      },
      {
        id: 3,
        text: (
          <ul>
            <li>
              link the director column in movies with the primary key in actor
            </li>
            <li>
              connect the primary keys of movie and actor via the casting table
            </li>
          </ul>
        ),
        imageUrl: "",
      },
      {
        id: 4,
        text: (
          <ul>
            <li>
              link the director column in movies with the primary key in actor
            </li>
            <li>
              connect the primary keys of movie and casting via the actor table
            </li>
          </ul>
        ),
        imageUrl: "",
      },
      {
        id: 5,
        text: (
          <ul>
            <li>
              link the movie column in actor with the director column in actor
            </li>
            <li>connect movie and actor via the casting table</li>
          </ul>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 7,
    question:
      "Wählen sie das Ergebnis, welches folgende Aussage erzeugen würde:",
    imageUrl: `SELECT title, yr 
    FROM movie, casting, actor 
   WHERE name='Robert De Niro' AND movieid=movie.id AND actorid=actor.id AND ord = 3`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>A Bronx Tale</td>
                <td style={{ border: "1px solid black" }}>1993</td>
                <td style={{ border: "1px solid black" }}>3</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Bang the Drum Slowly
                </td>
                <td style={{ border: "1px solid black" }}>1973</td>
                <td style={{ border: "1px solid black" }}>3</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Limitless</td>
                <td style={{ border: "1px solid black" }}>2011</td>
                <td style={{ border: "1px solid black" }}>3</td>
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
                <td style={{ border: "1px solid black" }}>A Bronx Tale</td>
                <td style={{ border: "1px solid black" }}>1993</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Bang the Drum Slowly
                </td>
                <td style={{ border: "1px solid black" }}>1973</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Limitless</td>
                <td style={{ border: "1px solid black" }}>2011</td>
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
                <td style={{ border: "1px solid black" }}>A Bronx Tale</td>

                <td style={{ border: "1px solid black" }}>3</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Bang the Drum Slowly
                </td>

                <td style={{ border: "1px solid black" }}>3</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Limitless</td>

                <td style={{ border: "1px solid black" }}>3</td>
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
                <td style={{ border: "1px solid black" }}>A Bronx Tale</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Bang the Drum Slowly
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Limitless</td>
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
                <td style={{ border: "1px solid black" }}>A Bronx Tale</td>

                <td style={{ border: "1px solid black" }}>Robert De Niro</td>
                <td style={{ border: "1px solid black" }}>1993</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  Bang the Drum Slowly
                </td>
                <td style={{ border: "1px solid black" }}>Robert De Niro</td>

                <td style={{ border: "1px solid black" }}>1973</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Limitless</td>
                <td style={{ border: "1px solid black" }}>Robert De Niro</td>

                <td style={{ border: "1px solid black" }}>2011</td>
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

export const usingnullquizQuestions = [
  {
    id: 1,
    question: "Wählen Sie die Aussage, die den outer join korrekt nutzt.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: ` SELECT teacher.name, dept.name FROM teacher JOIN dept ON (dept = id)`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT teacher.name, dept.name FROM teacher, dept INNER JOIN ON (teacher.dept = dept.id)`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT teacher.name, dept.name FROM teacher, dept JOIN WHERE(teacher.dept = dept.id)`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT teacher.name, dept.name FROM teacher OUTER JOIN dept ON dept.id`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT teacher.name, dept.name FROM teacher LEFT OUTER JOIN dept ON (teacher.dept = dept.id)`,
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 2,
    question:
      " Wählen Sie die richtige Aussage aus, die den Namen der Abteilung angibt, in der Cutflower beschäftigt ist.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: ` SELECT dept.name FROM teacher JOIN dept ON (dept.id = (SELECT dept FROM teacher WHERE name = 'Cutflower'))`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT dept.name FROM teacher JOIN dept ON (dept.id = teacher.dept) WHERE dept.id = (SELECT dept FROM teacher HAVING name = 'Cutflower')`,
        imageUrl: "",
      },
      {
        id: 3,
        text: ` SELECT dept.name FROM teacher JOIN dept ON (dept.id = teacher.dept) WHERE teacher.name = 'Cutflower'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` SELECT dept.name FROM teacher JOIN dept WHERE dept.id = (SELECT dept FROM teacher WHERE name = 'Cutflower')`,
        imageUrl: "",
      },
      {
        id: 5,
        text: ` SELECT name FROM teacher JOIN dept ON (id = dept) WHERE id = (SELECT dept FROM teacher WHERE name = 'Cutflower')`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 3,
    question:
      "Wählen Sie die Aussage, die einen JOIN verwendet, um eine Liste aller Abteilungen und der Anzahl der beschäftigten Lehrer anzuzeigen.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT dept.name, COUNT(*) FROM teacher LEFT JOIN dept ON dept.id = teacher.dept`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT dept.name, COUNT(teacher.name) FROM teacher, dept JOIN ON dept.id = teacher.dept GROUP BY dept.name`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT dept.name, COUNT(teacher.name) FROM teacher JOIN dept ON dept.id = teacher.dept GROUP BY dept.name`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` SELECT dept.name, COUNT(teacher.name) FROM teacher LEFT OUTER JOIN dept ON dept.id = teacher.dept GROUP BY dept.name`,
        imageUrl: "",
      },
      {
        id: 5,
        text: ` SELECT dept.name, COUNT(teacher.name) FROM teacher RIGHT JOIN dept ON dept.id = teacher.dept GROUP BY dept.name`,
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 4,
    question: `Das Nutzen von 'SELECT name, dept, COALESCE(dept, 0) AS result FROM teacher' wird:`,
    imageUrl: ``,
    options: [
      {
        id: 1,
        text: `in der Ergebnisspalte für alle Lehrer*innen 0 anzeigen`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` 0 in der Ergebnisspalte anzeigen für alle Lehrer*innen ohne Abteilung`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `nichts tun, da die Aussage falsch ist`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `Abteilungswert für alle Lehrer*innen auf 0 setzen`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `den Wert der Abteilung aller Lehrer*innen ohne Abteilung auf 0 setzen`,
        imageUrl: "",
      },
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question:
      "Welches der folgenden 'digit' werden bei folgender Aussage gezeigt:",
    imageUrl: `SELECT name,
       CASE WHEN phone = 2752 THEN 'two'
            WHEN phone = 2753 THEN 'three'
            WHEN phone = 2754 THEN 'four'
            END AS digit
  FROM teacher`,
    options: [
      {
        id: 1,
        text: `'four' for Throd`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `NULL for all teachers`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `NULL for Shrivell`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `'two' for Cutflower`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `'two' for Deadyawn`,
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question:
      "Wählen Sie das Ergebnis, dass man durch folgende Aussage erhält:",
    imageUrl: `SELECT name, 
      CASE 
       WHEN dept 
        IN (1) 
        THEN 'Computing' 
       ELSE 'Other' 
      END 
  FROM teacher`,
    options: [
      {
        id: 1,
        text: (
          <div>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <td style={{ border: "1px solid black" }}>Shrivell</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Throd</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Splint</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Spiregrain</td>
                <td style={{ border: "1px solid black" }}>Other</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Cutflower</td>
                <td style={{ border: "1px solid black" }}>Other</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Deadyawn</td>
                <td style={{ border: "1px solid black" }}>Other</td>
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
                <td style={{ border: "1px solid black" }}>Shrivell</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Throd</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Splint</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Spiregrain</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Cutflower</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Deadyawn</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
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
                <td style={{ border: "1px solid black" }}>Shrivell</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Throd</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Splint</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
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
                <td style={{ border: "1px solid black" }}>Spiregrain</td>
                <td style={{ border: "1px solid black" }}>Other</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Cutflower</td>
                <td style={{ border: "1px solid black" }}>Other</td>
              </tr>
              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>Deadyawn</td>
                <td style={{ border: "1px solid black" }}>Other</td>
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
                <td style={{ border: "1px solid black" }}>Shrivell</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Throd</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Splint</td>
                <td style={{ border: "1px solid black" }}>1</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Spiregrain</td>
                <td style={{ border: "1px solid black" }}>0</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Cutflower</td>
                <td style={{ border: "1px solid black" }}>0</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Deadyawn</td>
                <td style={{ border: "1px solid black" }}>0</td>
              </tr>
            </table>
          </div>
        ),
        imageUrl: "",
      },
    ],
    correctAnswer: 1,
  },
];
export const selfjoinquizQuestions = [
  {
    id: 1,
    question:
      "Wählen Sie den Code, der zeigt, dass es möglich ist, von Craiglockhart nach Haymarket zu gelangen",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: ` SELECT DISTINCT a.name, b.name
  FROM stops a JOIN route z IN a.id=z.stop
  JOIN route y ON y.num = z.num
  JOIN stops b IN y.stop=b.id
 WHERE a.name='Craiglockhart' AND b.name ='Haymarket'`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT DISTINCT a.name, b.name
  FROM stops a JOIN route z ON a.id=z.stop
  JOIN route y JOIN stops b ON y.stop=b.id
 WHERE a.name='Craiglockhart' AND b.name ='Haymarket'`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT DISTINCT a.name, b.name
  FROM stops a JOIN route z ON a.id=z.stop
  JOIN route y ON y.num = z.num
  JOIN stops b ON y.stop=b.id
 WHERE a.name='Craiglockhart' AND b.name ='Haymarket'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: `SELECT DISTINCT a.name, b.name from stops a
  JOIN route z ON a.id=z.stop
  JOIN route y ON y.num = z.num
  JOIN stops b ON y.stop=b.id
 WHERE a.name='Craiglockhart' AND b.name ='Sighthill'`,
        imageUrl: "",
      },
      {
        id: 5,
        text: `SELECT DISTINCT a.name, b.name
  FROM stops a JOIN route z ON a.id=z.stop
  JOIN route y ON y.num = z.num
  JOIN stops b ON y.stop=b.id
 WHERE y.name='Craiglockhart' AND z.name ='Haymarket'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question:
      " Wählen Sie den Code, der die Haltestellen anzeigt, die sich auf der Strecke (route.num) '2A' befinden, die mit einem Bus von Haymarket aus erreicht werden können",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: ` SELECT S2.id, S2.name, R2.company, R2.num
  FROM stops S1, stops S2, route R1, route R2
 WHERE S1.name='Haymarket' AND S1.id=R1.stop
   AND S1.company=S2.company AND S1.num=S2.num
   AND R2.stop=S2.id AND R1.num='2A'`,
        imageUrl: "",
      },
      {
        id: 2,
        text: `SELECT S2.id, S2.name, R2.company, R2.num
  FROM stops S1, stops S2, route R1, route R2
 WHERE S1.name='Haymarket' AND S1.id=R1.num
   AND R1.company=R2.company AND R1.num=R2.num
   AND R2.stop=S2.id AND R2.num='2A'`,
        imageUrl: "",
      },
      {
        id: 3,
        text: ` SELECT S2.id, S2.name, R2.company, R2.num
  FROM stops S1, stops S2, route R1, route R2
 WHERE S1.name='Haymarket' AND S1.id=R1.stop
   AND R1.company=R2.company AND R1.num=R2.num
   AND R2.stop=S2.id`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` SELECT S2.id, S2.name, R2.company, R2.num
  FROM stops S1, stops S2, route R1, route R2
 WHERE S1.name='Haymarket' AND S1.id=R1.stop
   AND R1.company=R2.company AND R1.num=R2.num
   AND R2.stop=S2.id AND R2.num='2'`,
        imageUrl: "",
      },
      {
        id: 5,
        text: ` SELECT S2.id, S2.name, R2.company, R2.num
  FROM stops S1, stops S2, route R1, route R2
 WHERE S1.name='Haymarket' AND S1.id=R1.stop
   AND R1.company=R2.company AND R1.num=R2.num
   AND R2.stop=S2.id AND R2.num='2A'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 5,
  },
  {
    id: 3,
    question:
      "Wählen Sie den Code, der die verfügbaren Dienste von Tollcross anzeigt.",
    imageUrl: "",
    options: [
      {
        id: 1,
        text: `SELECT a.company, a.num, stopa.name, stopb.name
  FROM route a JOIN route b ON (a.company=b.company AND a.num=b.num)
  JOIN stops stopa ON (a.stop=stopa.id)
  JOIN stops stopb ON (b.stop=stopb.id)`,
        imageUrl: "",
      },
      {
        id: 2,
        text: ` SELECT a.company, a.num, stopa.name, stopb.name
  FROM route a JOIN route b ON (a.company=b.company AND a.num=b.num)
  JOIN stops stopa ON (a.stop=stopa.id)
  JOIN stops stopb ON (b.stop=stopb.id)
 WHERE stopa.name='Sighthill'`,
        imageUrl: "",
      },
      {
        id: 3,
        text: `SELECT a.company, a.num, stopa.name, stopb.name
  FROM route a JOIN route b IN (a.company=b.company AND a.num=b.num)
  JOIN stops stopa IN (a.stop=stopa.id)
  JOIN stops stopb ON (b.stop=stopb.id)
 WHERE stopa.name='Tollcross'`,
        imageUrl: "",
      },
      {
        id: 4,
        text: ` SELECT a.company, a.num, stopa.name, stopb.name
  FROM route a JOIN route b ON (a.company=b.company AND a.num=b.num)
  JOIN stops stopa ON (a.stop=stopa.id)
  JOIN stops stopb ON (b.stop=stopb.id)
 WHERE stopa.name='Tollcross'`,
        imageUrl: "",
      },
      {
        id: 5,
        text: ` SELECT a.company, a.num, stopa.name, stopb.name
  FROM route a JOIN route b ON (a.company=b.company AND a.num=b.num)
  JOIN stops stopa ON (a.stop=stopa.id)
  JOIN stops stopb ON (b.stop=stopb.id)
 WHERE stopz.name='Tollcross'`,
        imageUrl: "",
      },
    ],
    correctAnswer: 4,
  },
];
