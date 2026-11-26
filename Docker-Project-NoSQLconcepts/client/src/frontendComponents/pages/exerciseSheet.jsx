import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
  Divider,
  Chip,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
import "../../custom_ace_files/mode-pgsql.js";
import "../../custom_ace_files/theme-goethe.js";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow_night";

import { useTheme } from "@mui/material/styles";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import ImportantMsg from "../components/otherComponents/importantMsg.jsx";

import ResultTable from "../components/exerciseSheetComponents/ResultTable.jsx";
import { fetchTasksData, fetchLLMFeedback } from "../api/mainApi.js";
import DbAccordion from "../components/exerciseSheetComponents/dbAccordion.jsx";
import { sendToExecute } from "../api/queryApi.js";
import { Link } from "react-router-dom";
import GradientButton from "../components/exerciseSheetComponents/gradientButton.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function ExerciseSheetC({ area_id, area_name, endpoint, feedback_on }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
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
    getInitialFormData(taskNumber),
  );

  const [queryResult, setQueryResult] = useState("");
  const [syntaxMode, setSyntaxMode] = useState("");
  //const [solutionResult, setSolutionResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [error, setError] = useState("");

  const [queryFeedback_new, setQueryFeedback_new] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [zeroCostOutput, setZeroCostOutput] = useState([]);
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
    const {
      totalDistance,
      noCalculation,
      feedbackOutput,
      zeroCostOutput,
      errorCount,
    } = sqlDistanceHandling(queryFeedback_new || "");
    setTotalDistance(totalDistance);
    setNoCalculation(noCalculation);
    setFeedbackOutput(feedbackOutput);
    setZeroCostOutput(zeroCostOutput);
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
        feedback_on,
      );

      setSolutionSQL(response.data.solutionQuery || "");

      setHasSolutionQuery(Boolean(response.data.solutionQuery));
      setQueryFeedback_new(response.data.queryFeedback_new || "");

      const { feedbackOutput } = sqlDistanceHandling(
        response.data.queryFeedback_new || "",
      );
      const isSQLOutputEqual =
        JSON.stringify(response.data.userQueryResult) ===
        JSON.stringify(response.data.expectedResult);
      const currentSQLPoints = isSQLOutputEqual
        ? maxPoints_SQL
        : calculatedPoints(maxPoints_SQL, feedbackOutput);

      const newSteps = feedbackOutput
        .map((item) => item.editStep)
        .filter(Boolean);
      const mergedSteps = [...collectedEditSteps, ...newSteps];
      setCollectedEditSteps(mergedSteps);

      const nextPoints = [...pointsHistory, currentSQLPoints];
      setPointsHistory(nextPoints);

      if (typeof response.data.userQueryResult === "string") {
        setQueryResult([{ output: response.data.userQueryResult }]);
      } else {
        setQueryResult(response.data.userQueryResult);
      }

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
          "Correct! Your query output is equal to the expected output.",
        );

        setFeedbackType("success");
      } else {
        setFeedback("Your output does not match the expected output. ");

        setFeedbackType("error");
      }
      setError("");
    } catch (error) {
      setError(
        `Error: ${error.response.data.error}. Note: Please try again, if you think that this task is solvable with a query. `,
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
      JSON.stringify(formData),
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
    let zeroCostOutput = [];

    if (/^\s*ERROR:\s*/.test(queryFeedback_new)) {
      noCalculation = queryFeedback_new.replace(/^\s*ERROR:\s*/, "").trim();
    } else {
      totalDistance = queryFeedback_new
        .split("\n")[0]
        .split(":")
        .slice(1)
        .join(":")
        .trim();

      const outputSplitter = queryFeedback_new
        .split(">>>")
        .map((a) => a.trim())
        .filter(Boolean)
        .slice(1);

      feedbackOutput = outputSplitter
        .map((a) => {
          const lines = a.split("\n");
          const rawEditStep = (lines.shift() || "").trim();
          const editStep = removeMarkers(rawEditStep);
          let solution = lines.join("\n").trim();
          solution = solution.replace(/,{2,}$/gm, (m) => m.slice(0, 1));

          if (/^(Cost|Kosten)\s*0\s*:/i.test(editStep)) {
            zeroCostOutput.push({ editStep, solution });
            return null;
          }

          return { editStep, solution };
        })
        .filter(Boolean);

      const asteriskStep =
        "Einen Asterisk (*) durch die Ausdrücke ersetzen, die er repräsentiert";
      const excessSelectStep =
        "Überflüssiges Element aus der SELECT-Klausel entfernen";

      const hasExcess = feedbackOutput.some((x) =>
        x.editStep.includes(excessSelectStep),
      );
      const asterixIndex = zeroCostOutput.findIndex((x) =>
        x.editStep.includes(asteriskStep),
      );

      if (hasExcess && asterixIndex !== -1) {
        feedbackOutput.unshift(zeroCostOutput[asterixIndex]);
        zeroCostOutput.splice(asterixIndex, 1);
      }

      errorCount = feedbackOutput.length;
    }

    return {
      totalDistance,
      noCalculation,
      feedbackOutput,
      zeroCostOutput,
      errorCount,
    };
  }

  function calculatedPoints(maxPoints_SQL, feedbackOutput) {
    const scaleFactor = 1;
    let minusPoints = 0;
    feedbackOutput.forEach((a) => {
      const match = a.editStep.match(/(?:Cost|Kosten)\s*([\d.,]+):/i);
      if (match) {
        minusPoints += parseFloat(match[1].replace(",", "."));
      }
    });
    const unscaledPoints = Math.max(
      0,
      parseFloat(maxPoints_SQL) - parseFloat(minusPoints) * scaleFactor,
    );
    return unscaledPoints;
  }

  // takes the exersice description, editsteps
  const llmFeedback = async (feedbackOutput) => {
    setShowLLMTip(true);
    setLlmError("");
    setLlmTip("Lerntipp wird geladen...");
    console.log("LLM Feedback Function");

    try {
      // Task Question Data
      const questionData = [
        task.topic ? "Topic: " + task.topic + ", " : "",
        task.description ? "Description: " + task.description + ", " : "",
        task.hint ? "Hint: " + task.hint : "",
      ]
        .filter(Boolean)
        .join(" ");

      // Student Answer Data
      const studentAnswer = formData.query_text;

      // Correct Answer Data
      const correctAnswer = solutionSQL;

      // Tool Feedback Data
      const toolFeedback = feedbackOutput
        .map((e, i) => `${i + 1}. ${e.editStep}: ${e.solution}`)
        .join("\n");
      console.log("Tool Feedback: ", toolFeedback);

      // API Call
      const response = await fetchLLMFeedback(
        questionData,
        studentAnswer,
        correctAnswer,
        toolFeedback,
        maxPoints_SQL,
      );
      console.log("Response: ", response);
      setLlmError("");
      setLlmTip(response.learning_tips);
    } catch (error) {
      console.log("llmFeedback error");
      console.error("Error:", error);
      setLlmError("Failed to get answer from LLM.");
      setLlmTip("Kein Lerntipp verfügbar.");
    }
  };

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
            <Grid item xs={12} md={12}>
              <DbAccordion endpoint={endpoint} />
              <hr></hr>
            </Grid>
            <Grid item xs={12} md={12}>
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
                {/* <ImportantMsg
                  message={
                    <>
                      Enthält die Aufgabe ,,mind.'' oder ,,max.'' (z.B. ,,mind.
                      1000 Autos''),
                      <br />
                      dann verwende zum Beispiel '&gt; or =' anstelle von
                      '&gt;='.
                    </>
                  }
                  type="info"
                /> */}
                <Box p={0} aria-labelledby="Input Elements to solve the task">
                  <form>
                    <Box>
                      <AceEditor
                        id="query-input-label"
                        name="query"
                        mode={syntaxMode}
                        theme={isDark ? "tomorrow_night" : "github"}
                        onChange={handleEditorChange}
                        value={formData.query_text || task.default_query || ""}
                        editorProps={{ $blockScrolling: true }}
                        style={{ width: "100%", height: "400px" }}
                        showPrintMargin={false}
                        setOptions={{
                          fontSize: 16,
                          showLineNumbers: true,
                          tabSize: 2,
                          useWorker: false,
                          highlightActiveLine: true,
                          highlightGutterLine: true,
                          displayIndentGuides: true,
                          wrap: true,
                        }}
                      />
                      <Button onClick={executeQuery}>
                        Ausführen
                        <PlayCircleFilledWhiteIcon></PlayCircleFilledWhiteIcon>
                      </Button>

                      {queryResult && (
                        <ImportantMsg
                          message={<div>Erfolgreich ausgeführt!</div>}
                          type="success"
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
                          message={<div>{error}</div>}
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
                    {/* ===================================================== */}
                    {/* SIDE-BY-SIDE FEEDBACK: DISTANCE FUNCTION + AI TUTOR    */}
                    {/* ===================================================== */}
                    {feedback_on && (queryResult || error) && (
                      <Box sx={{ mt: 4, mb: 3 }}>
                        <Typography
                          variant="h5"
                          fontWeight={700}
                          sx={{ mb: 2 }}
                        >
                          Feedback zu deiner SQL-Lösung
                        </Typography>

                        <Grid
                          container
                          spacing={3}
                          alignItems="stretch"
                          sx={{ width: "100%", m: 0 }}
                        >
                          {/* ================================================= */}
                          {/* LEFT: DISTANCE-BASED FEEDBACK                     */}
                          {/* ================================================= */}

                          {queryResult && (
                            <Grid item xs={12} md={6}>
                              <Paper
                                elevation={2}
                                sx={{
                                  height: "100%",
                                  p: { xs: 2, md: 3 },
                                  borderRadius: 3,
                                  border: "1px solid",
                                  borderColor: "divider",
                                  display: "flex",
                                  flexDirection: "column",
                                  bgcolor: "background.paper",
                                }}
                              >
                                {/* Header */}
                                <Box sx={{ mb: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mb: 1,
                                    }}
                                  >
                                    <CheckIcon color="primary" />
                                    <Typography variant="h6" fontWeight={700}>
                                      Strukturelles Feedback
                                    </Typography>
                                  </Box>

                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Analyse deiner SQL-Abfrage anhand einer
                                    Distanzfunktion.
                                  </Typography>
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                {/* Score */}
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    bgcolor: "action.hover",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                  >
                                    Erreichte Punktzahl
                                  </Typography>

                                  <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    color="primary.main"
                                  >
                                    {feedback.includes(
                                      "Your query output is equal to the expected output",
                                    )
                                      ? maxPoints_SQL
                                      : calculatedPoints(
                                          maxPoints_SQL,
                                          feedbackOutput,
                                        )}
                                    <Typography
                                      component="span"
                                      variant="h6"
                                      color="text.secondary"
                                    >
                                      {" "}
                                      / {maxPoints_SQL}
                                    </Typography>
                                  </Typography>
                                </Paper>

                                {/* Correct solution */}
                                {feedback.includes(
                                  "Your query output is equal to the expected output",
                                ) && (
                                  <ImportantMsg
                                    message={
                                      <>
                                        Deine Abfrage erzeugt die korrekte
                                        Ergebnistabelle! Du erhältst die volle
                                        Punktzahl.
                                        <br />
                                        Beachte, dass strukturell
                                        unterschiedliche Abfragen mit demselben
                                        Ergebnis beim Vergleich mit der
                                        erwarteten Lösung dennoch
                                        Bearbeitungsschritte mit ungewichteten
                                        Kosten verursachen können.
                                      </>
                                    }
                                    type="success"
                                  />
                                )}

                                {/* Explanation */}
                                <ImportantMsg
                                  message={
                                    <>
                                      Du kannst dir unten eine Übersicht der
                                      Fehler ansehen und auf einen Eintrag
                                      klicken, um weitere Details anzuzeigen.
                                      <br />
                                      Hat ein Fehler die „Kosten: 0“, handelt es
                                      sich um eine mathematische oder logische
                                      Umformung, die die Bedeutung der
                                      SQL-Abfrage nicht verändert. Einige
                                      Operatortypen, wie z. B. <code>LIKE</code>
                                      ,<code> BETWEEN</code>, <code>IN</code>{" "}
                                      können derzeit noch nicht verarbeitet
                                      werden. Daher ist für sie momentan kein
                                      detailliertes Feedback verfügbar und es
                                      werden in dem Fall noch keine Punkte
                                      abgezogen.
                                    </>
                                  }
                                  type="info"
                                  textAlign="justify"
                                />

                                {/* Distance feedback */}
                                <Box
                                  sx={{
                                    mt: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    flexGrow: 1,
                                    minHeight: 150,
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    fontWeight={700}
                                    sx={{ mb: 1 }}
                                  >
                                    {totalDistance
                                      ? `${errorCount} vorgeschlagene Änderungen an deiner Abfrage`
                                      : "Analyse der SQL-Abfrage"}
                                  </Typography>

                                  {totalDistance === "" ? (
                                    <Box
                                      sx={{
                                        minHeight: 120,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        color: "text.secondary",
                                        px: 2,
                                      }}
                                    >
                                      <Typography variant="body2">
                                        {noCalculation}
                                      </Typography>
                                    </Box>
                                  ) : (
                                    feedbackOutput.map((entry, i) => (
                                      <details
                                        key={i}
                                        style={{
                                          border: "1px solid #bdbdbd",
                                          borderRadius: "8px",
                                          marginTop: "10px",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <summary
                                          style={{
                                            padding: "12px 15px",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {entry.editStep}
                                        </summary>

                                        <Box
                                          sx={{
                                            p: 2,
                                            bgcolor: "action.hover",
                                            overflowX: "auto",
                                          }}
                                        >
                                          <Typography
                                            variant="body2"
                                            component="pre"
                                            sx={{
                                              whiteSpace: "pre-wrap",
                                              fontFamily: "monospace",
                                              m: 0,
                                            }}
                                          >
                                            {entry.solution}
                                          </Typography>
                                        </Box>
                                      </details>
                                    ))
                                  )}
                                </Box>

                                {/* Optional zero-cost feedback */}
                                {totalDistance && zeroCostOutput.length > 0 && (
                                  <Box
                                    sx={{
                                      mt: 2,
                                      p: 2,
                                      borderRadius: 2,
                                      border: "1px solid",
                                      borderColor: "divider",
                                    }}
                                  >
                                    <details>
                                      <summary
                                        style={{
                                          padding: "10px",
                                          textAlign: "center",
                                          fontWeight: 600,
                                          cursor: "pointer",
                                        }}
                                      >
                                        Optionale Hinweise anzeigen
                                      </summary>

                                      <Box sx={{ pt: 2 }}>
                                        <Typography
                                          variant="body2"
                                          sx={{ mb: 1 }}
                                        >
                                          Diese {zeroCostOutput.length}{" "}
                                          vorgeschlagene(n) Änderung(en) haben
                                          keine Auswirkung auf deine Punktzahl:
                                        </Typography>

                                        {zeroCostOutput.map((entry, i) => (
                                          <details
                                            key={i}
                                            style={{
                                              border: "1px solid #bdbdbd",
                                              borderRadius: "8px",
                                              marginTop: "10px",
                                              overflow: "hidden",
                                            }}
                                          >
                                            <summary
                                              style={{
                                                padding: "12px 15px",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                              }}
                                            >
                                              {entry.editStep}
                                            </summary>

                                            <Box
                                              sx={{
                                                p: 2,
                                                bgcolor: "action.hover",
                                              }}
                                            >
                                              <Typography
                                                variant="body2"
                                                component="pre"
                                                sx={{
                                                  whiteSpace: "pre-wrap",
                                                  fontFamily: "monospace",
                                                  m: 0,
                                                }}
                                              >
                                                {entry.solution}
                                              </Typography>
                                            </Box>
                                          </details>
                                        ))}
                                      </Box>
                                    </details>
                                  </Box>
                                )}
                              </Paper>
                            </Grid>
                          )}

                          {/* ================================================= */}
                          {/* RIGHT: LLM FEEDBACK WITH AI TUTOR                 */}
                          {/* ================================================= */}

                          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                            <Paper
                              elevation={2}
                              sx={{
                                width: "100%",
                                p: { xs: 2, md: 3 },
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                display: "flex",
                                flexDirection: "column",
                                bgcolor: "background.paper",
                              }}
                            >
                              {/* Header */}
                              <Box sx={{ mb: 2 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 1,
                                  }}
                                >
                                  <AutoAwesomeIcon color="secondary" />
                                  <Typography variant="h6" fontWeight={700}>
                                    KI-Tutor Feedback
                                  </Typography>
                                </Box>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Individuelles, KI-generiertes Feedback und
                                  Lernempfehlungen zu deiner SQL-Lösung.
                                </Typography>
                              </Box>

                              <Divider sx={{ mb: 2 }} />

                              {/* Introduction */}
                              <ImportantMsg
                                message={
                                  <>
                                    KI-generierte Antworten können Fehler
                                    enthalten.
                                  </>
                                }
                                type="info"
                              />

                              {/* Generate feedback */}
                              <Box sx={{ mt: 2, mb: 2 }}>
                                <GradientButton
                                  id="test_area"
                                  onClick={() => llmFeedback(feedbackOutput)}
                                >
                                  <AutoAwesomeIcon sx={{ mr: 1 }} />
                                  Lerntipp generieren
                                </GradientButton>
                              </Box>

                              {/* AI Tutor speech bubble */}
                              {showLLMTip && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flexGrow: 1,
                                    mt: 1,
                                  }}
                                >
                                  {/* Speech bubble */}
                                  <Paper
                                    elevation={1}
                                    variant="outlined"
                                    sx={{
                                      position: "relative",
                                      width: "100%",
                                      p: 2.5,
                                      borderRadius: 3,
                                      border: "2px solid",
                                      borderColor: "divider",
                                      bgcolor: "background.paper",
                                      minHeight: 150,
                                      overflowWrap: "anywhere",

                                      "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: -11,
                                        left: "50%",
                                        width: 20,
                                        height: 20,
                                        bgcolor: "background.paper",
                                        borderRight: "2px solid",
                                        borderBottom: "2px solid",
                                        borderColor: "divider",
                                        transform:
                                          "translateX(-50%) rotate(45deg)",
                                      },
                                    }}
                                  >
                                    {/*       {llmTip !== "Lerntipp wird geladen..." && llmError === "" && (
                                      <Box>
                                        <Chip
                                          size="small"
                                          label={
                                            llmTip.errorCategory === "CORRECT"
                                              ? "Super!"
                                              : "Nicht ganz..."
                                          }
                                        />

                                        <Typography>
                                          Meiner Intelligenz nach würde ich dir{" "}
                                          {llmTip.points} / {maxPoints_SQL}{" "}
                                          Punkte für deine Lösung geben!
                                        </Typography>
                                      </Box>
                                    )} */}
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        lineHeight: 1.8,
                                        whiteSpace: "pre-wrap",
                                      }}
                                    >
                                      {llmTip /* .reasoning || llmTip */}
                                    </Typography>

                                    {llmError && (
                                      <Typography
                                        color="error"
                                        variant="body2"
                                        sx={{ mt: 1 }}
                                      >
                                        {llmError}
                                      </Typography>
                                    )}
                                  </Paper>

                                  {/* AI Tutor avatar */}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      mt: 2,
                                      zIndex: 1,
                                    }}
                                  >
                                    <Box
                                      component="img"
                                      src={
                                        llmTip !== "Lerntipp wird geladen..." &&
                                        llmTip !== ""
                                          ? "/images/avatar03Happy.png"
                                          : "/images/avatar03Neutral.png"
                                      }
                                      alt="KI-Datenbank-Tutor"
                                      sx={{
                                        width: { xs: 125, md: 155 },
                                        height: { xs: 125, md: 155 },
                                        objectFit: "contain",
                                      }}
                                    />

                                    <Typography
                                      variant="subtitle2"
                                      fontWeight={700}
                                      color="text.secondary"
                                    >
                                      Dein KI-Datenbank-Tutor
                                    </Typography>
                                  </Box>
                                </Box>
                              )}
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
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
                          Nächste Aufgabe <NavigateNextIcon></NavigateNextIcon>
                        </Button>
                      </div>
                    )}{" "}
                  </form>
                </Box>{" "}
              </Item>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ExerciseSheetC;
