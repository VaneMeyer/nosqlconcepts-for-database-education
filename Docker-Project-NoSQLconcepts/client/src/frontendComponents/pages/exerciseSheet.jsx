import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import QuizIcon from "@mui/icons-material/Quiz";
//import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
import "../../custom_ace_files/mode-pgsql.js";
import "../../custom_ace_files/theme-goethe.js";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ImportantMsg from "../components/otherComponents/importantMsg.jsx";

import ResultTable from "../components/exerciseSheetComponents/ResultTable.jsx";
import { fetchTasksData, fetchLLMFeedback } from "../api/mainApi.js";
import DbAccordion from "../components/exerciseSheetComponents/dbAccordion.jsx";
import { sendToExecute } from "../api/queryApi.js";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Fab } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function ExerciseSheetC({ area_id, area_name, endpoint, feedback_on }) {
  //feedback_on = true;
  const getInitialFormData = (taskNumber) => {
    try {
      const stored = localStorage.getItem(`formdata_${area_id}_${taskNumber}`);
      return stored
        ? JSON.parse(stored)
        : {
            query_text: "",
            isExecutable: "No",
            resultSize: 0,
            isFinished: false,
          };
    } catch {
      return {
        query_text: "",
        isExecutable: "No",
        resultSize: 0,
        isFinished: false,
      };
    }
  };
  const [task, setTask] = useState("");
  const [taskNumber, setTaskNumber] = useState(1);
  const [tasksArray, setTasksArray] = useState([]);

  const [formData, setFormData] = useState(() =>
    getInitialFormData(taskNumber)
  );

  const [queryResult, setQueryResult] = useState("");
  const [syntaxMode, setSyntaxMode] = useState("");
  //const [solutionResult, setSolutionResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [error, setError] = useState("");

  const [queryFeedback_new, setQueryFeedback_new] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [noCalculation, setNoCalculation] = useState("");
  const [feedbackOutput, setFeedbackOutput] = useState([]);
  const [collectedEditSteps, setCollectedEditSteps] = useState([]);
  const [hasSolutionQuery, setHasSolutionQuery] = useState(false);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [errorCount, setErrorCount] = useState(0);

  const [maxPoints_SQL, setMaxPoints_SQL] = useState(0);

  const [llmError, setLlmError] = useState("");
  const [llmTip, setLlmTip] = useState("");
  const [showLLMTip, setShowLLMTip] = useState(false);
  const [solutionSQL, setSolutionSQL] = useState("");

  useEffect(() => {
    const { totalDistance, noCalculation, feedbackOutput, errorCount } = sqlDistanceHandling(queryFeedback_new || "");
    setTotalDistance(totalDistance);
    setNoCalculation(noCalculation);
    setFeedbackOutput(feedbackOutput);
    setErrorCount(errorCount);
  }, [queryFeedback_new]);

  const handleF5 = (event) => {
    if (event.key === "F5") {
      event.preventDefault();

      alert("F5 is not used as a shortcut to execute queries.");
    }
  };

  const getTasks = async (areaId) => {
    try {
      const data = await fetchTasksData(areaId);
      setTasksArray(data);

      setTask(data[taskNumber - 1]);
      setMaxPoints_SQL(data[taskNumber - 1]?.maxsql_points || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const executeQuery = async () => {
    setQueryResult("");
    setShowLLMTip(false);
    const execQuery = (formData.query_text || task.default_query || "").trim();
    if (!execQuery) {
      setError("Bitte zuerst ein SQL-Query eingeben.");
      return;
    }

    try {
      const response = await sendToExecute(
        endpoint,
        execQuery,
        taskNumber,
        area_id,
        maxPoints_SQL,
        feedback_on
      );


      //console.log("SQL query of the student: ", execQuery);
      //console.log("Correct SQL query: ", response.data.solutionQuery);
      setSolutionSQL(response.data.solutionQuery || "");
      //console.log("queryFeedback_new: ", response.data.queryFeedback_new);

      setHasSolutionQuery(Boolean(response.data.solutionQuery));
      setQueryFeedback_new(response.data.queryFeedback_new || "");

      const { feedbackOutput } = sqlDistanceHandling(response.data.queryFeedback_new || "");
      const isSQLOutputEqual = JSON.stringify(response.data.userQueryResult) === JSON.stringify(response.data.expectedResult);
      const currentSQLPoints = isSQLOutputEqual ? maxPoints_SQL : calculatedPoints(maxPoints_SQL, feedbackOutput);

      const newSteps = feedbackOutput.map(item => item.editStep).filter(Boolean);
      const mergedSteps = [...collectedEditSteps, ...newSteps];
      setCollectedEditSteps(mergedSteps);
      
      const nextPoints = [...pointsHistory, currentSQLPoints];
      setPointsHistory(nextPoints);
      //sendDataToDb(nextPoints, mergedSteps);


      if (typeof response.data.userQueryResult === "string") {
        setQueryResult([{ output: response.data.userQueryResult }]);
      } else {
        setQueryResult(response.data.userQueryResult);
      }
      //setSolutionResult(response.data.expectedResult);

      if (typeof response.data.userQueryResult === "string") {
        setFormData((prev) => ({
          ...prev,
          query: execQuery,
          resultSize: 1,
          isExecutable: "Yes",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          query: execQuery,
          resultSize: response.data.userQueryResult.length,
          isExecutable: "Yes",
        }));
      }

      if (
        JSON.stringify(response.data.userQueryResult) ===
        JSON.stringify(response.data.expectedResult)
      ) {
        setFeedback(
          "Correct! Your query output is equal to the expected output."
        );

        setFeedbackType("success");
      } else {
        setFeedback("Your output does not match the expected output. ");

        setFeedbackType("error");
      }
      setError("");
    } catch (error) {
      setError(
        `Error: ${error.response.data.error}. Note: Please try again, if you think that this task is solvable with a query. `
      );
      setQueryResult("");
      setFormData((prev) => ({
        ...prev,
        query: execQuery,
        resultSize: 0,
        isExecutable: "No",
      }));
    }
  };
  //###########
  useEffect(() => {
    setFormData(getInitialFormData(taskNumber));
  }, [taskNumber]);

  useEffect(() => {
    localStorage.setItem(
      `formdata_${area_id}_${taskNumber}`,
      JSON.stringify(formData)
    );
  }, [formData, taskNumber, area_id]);

  useEffect(() => {
    setSyntaxMode("pgsql");

    const fetchUser = async () => {
      getTasks(area_id);
    };

    fetchUser();

    window.addEventListener("keydown", handleF5);
    return () => {
      window.removeEventListener("keydown", handleF5);
    };
  }, [taskNumber, area_id]);

 

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "is-finished-checkbox") {
      setFormData((prev) => ({ ...prev, isFinished: event.target.checked }));
    }
  };

  const updateTaskAndFormData = (newTaskNumber) => {
    let newTaskIndex = newTaskNumber - 1;
    setTask(tasksArray[newTaskIndex]);
    setTaskNumber(newTaskNumber);
    setMaxPoints_SQL(tasksArray[newTaskIndex]?.maxsql_points || 0);
    setQueryResult("");
    setError("");
    /* setHasStarted(false); */
  };
  const handleNextTask = () => {
    if (taskNumber === tasksArray.length) {
      alert("This is the last task");
    } else {
      updateTaskAndFormData(taskNumber + 1);
    }
  };

  const handlePrevTask = () => {
    if (taskNumber > 1) {
      updateTaskAndFormData(taskNumber - 1);
    }
  };

  const handleTaskChange = (event) => {
    const { value } = event.target;

    updateTaskAndFormData(value);
  };

  const handleEditorChange = (newContent) => {
    setFormData({ ...formData, query_text: newContent });
  };

  function removeMarkers(keyWords) {
    return (keyWords || "").replace(/\[\[[\s\S]*\]\]/, "").trim();
  }

  function sqlDistanceHandling(queryFeedback_new) {
    let totalDistance = "";
    let noCalculation = "";
    let feedbackOutput = [];
    let errorCount = 0;
    // console.log("Query Feedback New: ", queryFeedback_new);

    if (/^\s*ERROR:\s*/.test(queryFeedback_new)) {
      noCalculation = queryFeedback_new.replace(/^\s*ERROR:\s*/, "").trim();

    } else {
      totalDistance = queryFeedback_new.split("\n")[0].split(":").slice(1).join(":").trim();

      const outputSplitter = queryFeedback_new.split(">>>").map( a => a.trim() ).filter( Boolean ).slice(1);

      feedbackOutput = outputSplitter.map( a => {
        const lines = a.split("\n");
        const rawEditStep = (lines.shift() || "").trim();
         const editStep = removeMarkers(rawEditStep);
        let solution = lines.join("\n").trim();
        solution = solution.replace(/,{2,}$/gm, m => m.slice(0,1));
      return { editStep, solution };
      });
      errorCount = feedbackOutput.length;
    }

    return { totalDistance, noCalculation, feedbackOutput, errorCount };
  }

  function calculatedPoints(maxPoints_SQL, feedbackOutput) {
    // The scale factor can be adjusted to change the weight of the dedcutions
    const scaleFactor = 1;
    let minusPoints = 0;
    feedbackOutput.forEach( a => {
      const match = a.editStep.match(/Cost\s*([\d.,]+):/i);
      if (match) {
        minusPoints += parseFloat(match[1].replace(",", "."));
      }
    });
    const unscaledPoints = Math.max(0, parseFloat(maxPoints_SQL) - (parseFloat(minusPoints) * scaleFactor));
    return unscaledPoints;
  }

  // takes the exersice description, editsteps
  const llmFeedback = async (feedbackOutput) => {
    setShowLLMTip(true);
    setLlmTip("Loading LLM learning tip...");
    console.log("LLM Feedback Function");

    try {
      // Task Question Data
      const questionData = [
        task.topic ? "Topic: " + task.topic + ", " : "",
        task.description ? "Description: " + task.description + ", " : "",
        task.hint ? "Hint: " + task.hint : ""
      ].filter(Boolean).join(" ");
      //console.log("questionData: ", questionData);

      // Student Answer Data
      const studentAnswer = formData.query_text;
      //console.log("studentAnswer: ", studentAnswer);

      // Correct Answer Data
      const correctAnswer = solutionSQL;
      //console.log("correctAnswer: ", correctAnswer);

      // Tool Feedback Data
      const toolFeedback = feedbackOutput.map((e, i) => `${i + 1}. ${e.editStep}: ${e.solution}`).join('\n');
      console.log("Tool Feedback: ", toolFeedback);

      // API Call
      const response = await fetchLLMFeedback(questionData, studentAnswer, correctAnswer, toolFeedback);
      console.log("Response: ", response);
      setLlmError("");
      setLlmTip(response.learning_tips);

    } catch (error) {
      console.log("llmFeedback error");
      console.error("Error:", error);
      setLlmError("Failed to get answer from LLM.");
      setLlmTip("No LLM Tip available.");
    }
  }

  const quizNav = {
    2: "/selectquiz",
    3: "/bbcquiz",
    4: "/nestedselectquiz",
    5: "/sumandcountquiz",
    6: "/joinquiz",
    7: "/joinquiz2",
    8: "/usingnullquiz",
    9: "/selfjoinquiz",
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ p: 2 }}>
        {area_name}
      </Typography>

      {area_id !== 1 && (
        <Button
          component={Link}
          to={quizNav[area_id]}
          /* color="primary" */
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            borderRadius: 5,
            padding: 5,
          }}
        >
          <QuizIcon /> Quiz starten
        </Button>
      )}
      {task && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Item /* sx={{ bgcolor: "rgb(247, 250, 250)" }} */>
                {" "}
                <Box>
                  <InputLabel id="task-number-label">
                    Aufgabe auswählen
                  </InputLabel>

                  <TextField
                    select
                    name="taskNumber"
                    id="task-number-label"
                    fullWidth
                    value={taskNumber}
                    onChange={handleTaskChange}
                    aria-labelledby="Jump to task"
                  >
                    {tasksArray.map((task, index) => (
                      <MenuItem
                        key={index}
                        value={index + 1}
                        aria-label={task.subtasknumber}
                      >
                        {task.subtasknumber}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Item>
            </Grid>
            <Grid item xs={12} md={8}>
              <Item>
                {" "}
                <Box aria-labelledby="Task topic, description and maximum time to solve the task">
                  <Typography variant="h4">{task.topic}</Typography>
                  <Typography variant="h5">{task.subtasknumber}</Typography>
                  <Typography variant="h6">{task.maxtime}</Typography>
                  <Typography>{task.description}</Typography>
                  <hr></hr>
                  <Typography>{task.hint}</Typography>
                </Box>
                <ImportantMsg
                  message={
                    <>
                      Enthält die Aufgabe ,,mind.'' oder ,,max.'' (z.B. ,,mind. 1000 Autos''), dann verwende zum Beispiel '&gt; or =' anstelle von '&gt;='.
                    </>
                  }
                  type="info"
                />
                <Box p={0} aria-labelledby="Input Elements to solve the task">
                  
                    <form>
                      <Box>
                        <AceEditor
                          id="query-input-label"
                          name="query"
                          mode={syntaxMode}
                          onChange={handleEditorChange}
                          value={
                            formData.query_text || task.default_query || ""
                          }
                          editorProps={{ $blockScrolling: true }}
                          style={{ width: "100%", height: "400px" }}
                          setOptions={{ fontSize: "16px" }}
                        />
                        <Button onClick={executeQuery}>
                          Ausführen
                          <PlayCircleFilledWhiteIcon></PlayCircleFilledWhiteIcon>
                        </Button>
                        {/*feedback_on && (
                          <ImportantMsg
                            message="Note that the feedback functionality is a work in progress. It is possible that a message will appear stating that your result does not match the expected result. Your solution may still be correct. We are working on improving this functionality in the future so that your individual solution is evaluated with regard to the task description."
                            type="info"
                          />
                        )*/}
                        {queryResult && (
                          <ImportantMsg
                            message={
                              <div>
                                <CheckIcon></CheckIcon> Erfolgreich ausgeführt!
                              </div>
                            }
                            type="success"
                          />
                        )}
                        {queryResult && feedback_on && (
                          <ImportantMsg
                            message={feedback}
                            type={feedbackType}
                          />
                        )}

                        {queryResult && (
                          <ResultTable
                            queryResult={queryResult}
                            resultSize={formData.resultSize}
                            title={area_name}
                          />
                        )}
                        {error && (
                          <ImportantMsg
                            message={
                              <div>
                                <ErrorIcon></ErrorIcon> {error}
                              </div>
                            }
                            type="error"
                          />
                        )}
                        <Box
                          sx={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "black",
                          }}
                        >
                          {<p>Anzahl Zeilen: {formData.resultSize}</p>}
                        </Box>
                      </Box>


                      {feedback_on && queryResult && (
                        <>
                          <Typography variant="h6" gutterBottom>
                            See Your SQL Feedback
                          </Typography>
                          {maxPoints_SQL && (
                            <Typography variant="h7" gutterBottom>
                              {feedback.includes("Your query output is equal to the expected output")
                                ? `There are ${maxPoints_SQL} points and you received ${maxPoints_SQL} points.`
                                : `There are ${maxPoints_SQL} points and you received ${calculatedPoints(maxPoints_SQL, feedbackOutput)} points.`
                              }
                            </Typography>
                          )}
                          {feedback.includes("Your query output is equal to the expected output") && (
                                <ImportantMsg
                                  message={
                                    <>
                                      Deine Abfrage erzeugt die korrekte Ergebnistabelle! Du erhältst die volle Punktzahl.
                                      <br />
                                      Beachte, dass strukturell unterschiedliche Abfragen mit demselben Ergebnis beim Vergleich
                                      mit der erwarteten Lösung dennoch Bearbeitungsschritte mit ungewichteten Kosten verursachen können.
                                      </>
                                  }
                                  type="success"
                                />
                              )}
                          <ImportantMsg
                                message={
                                  <>
                                    Du kannst dir unten eine Übersicht der Fehler ansehen und auf einen Eintrag klicken, um weitere Details anzuzeigen.
                                    <br />
                                    Hat ein Fehler die „Kosten: 0“, handelt es sich um eine mathematische oder logische Umformung, die die Bedeutung der SQL-Abfrage nicht verändert.
                                    Einige Operatortypen, wie z. B. <code>LIKE</code>, können derzeit noch nicht verarbeitet werden.
                                    Daher ist für sie momentan kein detailliertes Feedback verfügbar.
                                    </>
                                    }
                                type="info"
                          />

                          <Box
                              sx={ {
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #cac9c9ff",
                                minHeight: 150,
                                whiteSpace: "pre-wrap",
                              } }
                            >
                              {totalDistance
                                ? "These are the " + errorCount + " suggested changes to your query:"
                                : ""}

                              {totalDistance === ""
                                ? (
                                    <div
                                      style={{
                                        minHeight: 150,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        fontSize: "15.5px",
                                      }}
                                    >
                                      {noCalculation}
                                    </div>
                                  )
                                : 
                                feedbackOutput.map((entry, i) => (
                                  <details key={i}
                                    style={ {
                                      border: "1px solid #bdbdbdff",
                                      borderRadius: "5px",
                                      marginTop: "10px",
                                      overflow: "hidden"
                                    } }
                                  >
                                    <summary
                                    style={ {
                                      justifyContent: "flex-start",
                                      padding: "10px 15px",
                                      listStyle: "none",
                                      display: "flex",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                    } }
                                    >
                                      { entry.editStep }
                                      </summary>
                                    <div
                                    style={ {
                                      justifyContent: "flex-start",
                                      padding: "10px 45px",
                                      listStyle: "none",
                                      display: "flex",
                                    } }
                                    >
                                    { entry.solution }
                                    </div>
                                  </details>
                                  
                                ))
                                }
                          </Box>
                        </>
                      )}
                      <hr></hr>
                      {feedback_on && (queryResult || error ) && (
                        <>
                        <Typography variant="h6" gutterBottom>
                            LLM learning tip
                          </Typography>
                          <ImportantMsg
                                message={
                                  <>
                                    Klicke auf die Button unten, um einen personalisierten Lerntipp auf Grundlage der Aufgabenbeschreibung, deiner Lösung und des SQL-Feedbacks zu erhalten.
                                    <br />
                                    Bitte beachte, dass sich diese Funktion noch in der Entwicklung befindet und die Antwort einige Zeit dauern kann.
                                  </>
                                  }
                                type="info"
                          />
                              
                        <button
                          type="button"
                          id="test_area"
                          style={ {
                            color: "black",
                            borderRadius: 5,
                            backgroundColor: "#388E3C",
                            color: "white",
                            border: "2px solid #388E3C",
                            cursor: "pointer",
                            padding: "5px 15px",
                            marginLeft: "auto",
                            marginRight: "20px",
                          } }
                          onClick={() => llmFeedback(feedbackOutput)}
                        >
                          LLM learning tip
                        </button>
                        <Box sx={{mt: 2}} />
                        {showLLMTip && (
                          <Box
                              sx={ {
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #cac9c9ff",
                                minHeight: 150,
                                whiteSpace: "pre-wrap",
                              } }
                            >{llmTip}</Box>
                        )}

                        {/* TODO: Don't show the button if the task is solved correctly */}
                        {/*No available LLM learning tip.
                        <button
                          type="button"
                          id="test_area"
                          style={ {
                            color: "black",
                            borderRadius: 5,
                            backgroundColor: "#9c9c9cff",
                            color: "white",
                            border: "2px solid #939393ff",
                            cursor: "pointer",
                            padding: "5px 15px",
                            marginLeft: "auto",
                            marginRight: "20px",
                          } }
                          onClick={ () => {
                            console.log("No available LLM learning tip");
                          } }
                        >
                          No available LLM learning tip
                        </button>*/}

                        </>
                      )}


                      <hr></hr>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="is-finished-checkbox"
                              checked={formData.isFinished}
                              onChange={handleChange}
                            />
                          }
                          label="Ich bin mit dieser Aufgabe fertig. (Fortschritt wird auf der Dashboard-Karte dieser Übung angezeigt.)"
                        />
                      </FormGroup>
                      <br />
                      <hr></hr>
                      {taskNumber === tasksArray.length ? (
                        <div>
                          {" "}
                          {taskNumber !== 1 && (
                            <Button
                              aria-label="Save current entries and navigate to previous task"
                              onClick={handlePrevTask}
                            >
                              Zurück <NavigateBeforeIcon></NavigateBeforeIcon>
                            </Button>
                          )}{" "}
                        </div>
                      ) : (
                        <div>
                          <hr></hr>

                          {taskNumber !== 1 && (
                            <Button
                              aria-label="Save current entries of the task and navigate to previous task"
                              onClick={handlePrevTask}
                            >
                              Zurück <NavigateBeforeIcon></NavigateBeforeIcon>
                            </Button>
                          )}

                          <Button
                            aria-label="Save current entries of this task and navigate to next task"
                            onClick={handleNextTask}
                          >
                            Nächste Aufgabe{" "}
                            <NavigateNextIcon></NavigateNextIcon>
                          </Button>
                        </div>
                      )}{" "}
                    </form>
               
                </Box>{" "}
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
              <DbAccordion endpoint={endpoint} />
              <hr></hr>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ExerciseSheetC;
