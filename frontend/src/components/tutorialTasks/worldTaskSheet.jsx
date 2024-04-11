import React, {useState} from "react";
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
import {Link} from "react-router-dom";
import _ from 'lodash';


const WorldTaskSheet = ({title, tasks}) => {
    const taskArray = tasks;
//state variables
    const [taskStates, setTaskStates] = useState(
        taskArray.map((task, index) => ({
            queryResult: "",
            resultSize: 0,
            query:
                localStorage.getItem(`${title}_query${index}`) || task.defaultQuery,
            expectedResult: "",
            expectedResultSize: 0,
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
            .post("/api/execute-sql", {execQuery: taskArray[index].solution})
            .then((solutionResponse) => {
                // then execute user input query
                axios
                    .post("/api/execute-sql", {execQuery: task.query})
                    .then((response) => {
                        // compare user query and solution query output
                        const resultUser = response.data.userQueryResult
                        const resultSolution = solutionResponse.data.userQueryResult
                        let isCorrect = JSON.stringify(resultUser) === JSON.stringify(resultSolution);
                        if (!isCorrect) {
                            // if the order of the rows from the user and solution query differs,
                            // the previous check for correctness does not suffice.
                            // Instead, deeply compare both results
                            isCorrect = resultUser.every(r => resultSolution.some(r2 => _.isEqual(r, r2)))
                                && resultSolution.every(r => resultUser.some(r2 => _.isEqual(r, r2)))
                        }
                        const updatedTaskStates = [...taskStates];
                        updatedTaskStates[index] = {
                            ...task,
                            queryResult: resultUser,
                            resultSize: resultUser.length,
                            expectedResult: resultSolution,
                            expectedResultSize: resultSolution.length,
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
                            expectedResult: "",
                            expectedResultSize: 0,
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
                    expectedResult: "",
                    expectedResultSize: 0,
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
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "70%"}}>
                <Link to="../tutorial">
                    <Button>Zurück zur Themenübersicht</Button>
                </Link>
                <hr></hr>

                <p>Tabelle world </p>
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
                        <td style={{border: "1px solid black"}}>Asia</td>
                        <td style={{border: "1px solid black"}}>652230</td>
                        <td style={{border: "1px solid black"}}>25500100</td>
                        <td style={{border: "1px solid black"}}>20343000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Albania</td>
                        <td style={{border: "1px solid black"}}>Europe</td>
                        <td style={{border: "1px solid black"}}>28748</td>
                        <td style={{border: "1px solid black"}}>2831741</td>
                        <td style={{border: "1px solid black"}}>12960000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>Algeria</td>
                        <td style={{border: "1px solid black"}}>Africa</td>
                        <td style={{border: "1px solid black"}}>2381741</td>
                        <td style={{border: "1px solid black"}}>37100000</td>
                        <td style={{border: "1px solid black"}}>188681000000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                        <td style={{border: "1px solid black"}}>...</td>
                    </tr>
                </table>
                {taskArray.map((task, index) => (
                    <Box key={index}>
                        <hr/>
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
                            editorProps={{$blockScrolling: true}}
                            style={{width: "70%", height: "200px"}}
                            setOptions={{fontSize: "16px"}}
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
                            Ausführen <PlayCircleFilledWhiteIcon/>
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
                            Auf Default Zurücksetzen <RefreshIcon/>
                        </Button>
                        {taskStates[index].queryResult && (
                            <ImportantMsg message="Ausführung erfolgreich!" type="success"/>
                        )}
                        {taskStates[index].error && (
                            <ImportantMsg message={taskStates[index].error} type="error"/>
                        )}
                        {taskStates[index].isCorrect && (
                            <ImportantMsg message="Richtig gelöst!" type="success"/>
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
                                            queryResult={taskStates[outputIndex].expectedResult}
                                            resultSize={taskStates[outputIndex].expectedResultSize}
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
