import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import ImportantMsg from "../importantMsg";
import ResultTable from "../ResultTable";
import { Link } from "react-router-dom";

const WorldTaskSheet = ({ title, tasks }) => {
  const taskArray = tasks;
  //state variables
  const [taskStates, setTaskStates] = useState(
    taskArray.map((task, index) => ({
      queryResult: "",
      resultSize: 0,
      query:
        localStorage.getItem(`${title}_query${index}`) || task.defaultQuery,
      expectedOutput: "",
      error: "",
    }))
  );
  const [showOutput, setShowOutput] = useState(false);
  const [outputIndex, setOutputIndex] = useState(null);

  //handle functions
  const handleShowOutput = (index) => {
    setShowOutput(true);
    setOutputIndex(index);
  };

  const handleCloseOutput = () => {
    setShowOutput(false);
    setOutputIndex(null);
  };

  const executeQuery = (index) => {
    saveToLocalStorage(index);
    const task = taskStates[index];
    // first execute solution query
    axios
      .post("/api/execute-sql", { execQuery: taskArray[index].solution })
      .then((solutionResponse) => {
        // then execute user input query
        axios
          .post("/api/execute-sql", { execQuery: task.query })
          .then((response) => {
            // compare user query and solution query output
            const isCorrect =
              JSON.stringify(response.data.userQueryResult) ===
              JSON.stringify(solutionResponse.data.userQueryResult);
            const updatedTaskStates = [...taskStates];
            updatedTaskStates[index] = {
              ...task,
              queryResult: response.data.userQueryResult,
              resultSize: response.data.userQueryResult.length,
              expectedOutput: solutionResponse.data.userQueryResult,
              error: "",
              isCorrect: isCorrect,
            };
            setTaskStates(updatedTaskStates);
          })
          .catch((error) => {
            const updatedTaskStates = [...taskStates];
            updatedTaskStates[index] = {
              ...task,
              queryResult: "",
              resultSize: 0,
              expectedOutput: "",
              error: `Error: ${error.response.data.error}`,
              isCorrect: false,
            };
            setTaskStates(updatedTaskStates);
          });
      })
      .catch((error) => {
        const updatedTaskStates = [...taskStates];
        updatedTaskStates[index] = {
          ...task,
          queryResult: "",
          resultSize: 0,
          expectedOutput: "",
          error: `Error: ${error.response.data.error}`,
          isCorrect: false,
        };
        setTaskStates(updatedTaskStates);
      });
  };

  const handleResetQuery = (index) => {
    const updatedTaskStates = [...taskStates];
    updatedTaskStates[index] = {
      ...taskStates[index],
      query: taskArray[index].defaultQuery,
    };
    setTaskStates(updatedTaskStates);
  };

  const handleEditorChange = (index, newContent) => {
    const updatedTaskStates = [...taskStates];
    updatedTaskStates[index] = {
      ...taskStates[index],
      query: newContent,
    };
    setTaskStates(updatedTaskStates);
    saveToLocalStorage(index);
  };

  // save inputs to localStorage
  const saveToLocalStorage = (index) => {
    localStorage.setItem(`${title}_query${index}`, taskStates[index].query);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <Link to="../tutorial">
          <Button>Zurück zur Themenübersicht</Button>
        </Link>
        <hr></hr>
        {title !== "joinoperation" && title !== "morejoinoperations" && (
          <div>
            <p>Tabelle world </p>
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
                <td style={{ border: "1px solid black" }}>Asia</td>
                <td style={{ border: "1px solid black" }}>652230</td>
                <td style={{ border: "1px solid black" }}>25500100</td>
                <td style={{ border: "1px solid black" }}>20343000000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Albania</td>
                <td style={{ border: "1px solid black" }}>Europe</td>
                <td style={{ border: "1px solid black" }}>28748</td>
                <td style={{ border: "1px solid black" }}>2831741</td>
                <td style={{ border: "1px solid black" }}>12960000000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>Algeria</td>
                <td style={{ border: "1px solid black" }}>Africa</td>
                <td style={{ border: "1px solid black" }}>2381741</td>
                <td style={{ border: "1px solid black" }}>37100000</td>
                <td style={{ border: "1px solid black" }}>188681000000</td>
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
        )}
        {title === "joinoperation" && (
          <div>
            <p>game </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>id</th>
                <th style={{ border: "1px solid black" }}>mdate</th>
                <th style={{ border: "1px solid black" }}>stadium</th>
                <th style={{ border: "1px solid black" }}>team1</th>
                <th style={{ border: "1px solid black" }}>team2</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1001</td>
                <td style={{ border: "1px solid black" }}> 8 June 2012</td>
                <td style={{ border: "1px solid black" }}>
                  National Stadium, Warsaw
                </td>
                <td style={{ border: "1px solid black" }}>POL</td>
                <td style={{ border: "1px solid black" }}>GRE</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1002</td>
                <td style={{ border: "1px solid black" }}>8 June 2012</td>
                <td style={{ border: "1px solid black" }}>
                  Stadion Miejski (Wroclaw)
                </td>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>CZE</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1003</td>
                <td style={{ border: "1px solid black" }}>12 June 2012</td>
                <td style={{ border: "1px solid black" }}>
                  Stadion Miejski (Wroclaw)
                </td>
                <td style={{ border: "1px solid black" }}>GRE</td>
                <td style={{ border: "1px solid black" }}>CZE</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1004</td>
                <td style={{ border: "1px solid black" }}>12 June 2012</td>
                <td style={{ border: "1px solid black" }}>
                  National Stadium, Warsaw
                </td>
                <td style={{ border: "1px solid black" }}>POL</td>
                <td style={{ border: "1px solid black" }}>RUS</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
              </tr>
            </table>
            <p>goal </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>matchid</th>
                <th style={{ border: "1px solid black" }}>teamid</th>
                <th style={{ border: "1px solid black" }}>player</th>
                <th style={{ border: "1px solid black" }}>gtime</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1001</td>
                <td style={{ border: "1px solid black" }}> POL</td>
                <td style={{ border: "1px solid black" }}>
                  Robert Lewandowski
                </td>
                <td style={{ border: "1px solid black" }}>17</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1001</td>
                <td style={{ border: "1px solid black" }}>GRE</td>
                <td style={{ border: "1px solid black" }}>
                  Dimitris Salpingidis
                </td>
                <td style={{ border: "1px solid black" }}>51</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1002</td>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>Alan Dzagoev</td>
                <td style={{ border: "1px solid black" }}>15</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1002</td>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>
                  Roman Pavlyuchenko
                </td>
                <td style={{ border: "1px solid black" }}>82</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
              </tr>
            </table>
            <p>eteam </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>id</th>
                <th style={{ border: "1px solid black" }}>teamname</th>
                <th style={{ border: "1px solid black" }}>coach</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>POL</td>
                <td style={{ border: "1px solid black" }}> Poland</td>
                <td style={{ border: "1px solid black" }}>Franciszek Smuda</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>RUS</td>
                <td style={{ border: "1px solid black" }}>Russia</td>
                <td style={{ border: "1px solid black" }}>Dick Advocaat</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>CZE</td>
                <td style={{ border: "1px solid black" }}>Czech Republic</td>
                <td style={{ border: "1px solid black" }}>Michal Bilek</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>GRE</td>
                <td style={{ border: "1px solid black" }}>Greece</td>
                <td style={{ border: "1px solid black" }}>Fernando Santos</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
                <td style={{ border: "1px solid black" }}>...</td>
              </tr>
            </table>
          </div>
        )}
        {title === "morejoinoperations" && (
          <div>
            <p>movie </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>id</th>
                <td style={{ border: "1px solid black" }}>title</td>
                <td style={{ border: "1px solid black" }}>yr</td>
                <td style={{ border: "1px solid black" }}>director</td>
                <td style={{ border: "1px solid black" }}>budget</td>
                <td style={{ border: "1px solid black" }}>gross</td>
              </tr>
            </table>
            <p>actor </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>id</th>
                <td style={{ border: "1px solid black" }}>name</td>
              </tr>
            </table>
            <p>casting </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>movieid</th>
                <th style={{ border: "1px solid black" }}>actorid</th>
                <th style={{ border: "1px solid black" }}>ord</th>
              </tr>
            </table>
          </div>
        )}

        {taskArray.map((task, index) => (
          <Box key={index}>
            <hr />
            <p>{task.description}</p>
            <AceEditor
              id={`query-input-label-${index}`}
              name={`query-${index}`}
              mode="sql"
              defaultValue={
                localStorage.getItem(`${title}_query${index}`) ||
                task.defaultQuery
              }
              onChange={(newContent) => handleEditorChange(index, newContent)}
              value={taskStates[index].query}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "70%", height: "200px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <p>{""}</p>
            <Button
              sx={{
                backgroundColor: "#2196f3",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: 2,
              }}
              onClick={() => executeQuery(index)}
            >
              Ausführen <PlayCircleFilledWhiteIcon />
            </Button>
            <Button
              onClick={() => handleResetQuery(index)}
              sx={{
                backgroundColor: "#f44336",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              Auf Default Zurücksetzen <RefreshIcon />
            </Button>
            {taskStates[index].queryResult && (
              <ImportantMsg message="Ausführung erfolgreich!" type="success" />
            )}
            {taskStates[index].error && (
              <ImportantMsg message={taskStates[index].error} type="error" />
            )}
            {taskStates[index].isCorrect && (
              <ImportantMsg message="Richtig gelöst!" type="success" />
            )}
            {!taskStates[index].isCorrect && taskStates[index].queryResult && (
              <Box>
                {" "}
                <ImportantMsg
                  message="Leider falsch. Versuche es weiter."
                  type="error"
                />
                <Button onClick={() => handleShowOutput(index)}>
                  Zeige mir, wie die Ausgabe aussehen soll
                </Button>
                {showOutput && (
                  <div>
                    <ResultTable
                      queryResult={taskStates[outputIndex].expectedOutput}
                      resultSize={taskStates[outputIndex].resultSize}
                    />
                    <Button onClick={handleCloseOutput}>Schließen</Button>
                  </div>
                )}
              </Box>
            )}
            {taskStates[index].queryResult && <h2>Ausgabe:</h2>}
            <ResultTable
              queryResult={taskStates[index].queryResult}
              resultSize={taskStates[index].resultSize}
            />
          </Box>
        ))}
        <hr></hr>
        <Link to="../tutorial">
          <Button>Zurück zur Themenübersicht</Button>
        </Link>
      </div>
    </div>
  );
};

export default WorldTaskSheet;
