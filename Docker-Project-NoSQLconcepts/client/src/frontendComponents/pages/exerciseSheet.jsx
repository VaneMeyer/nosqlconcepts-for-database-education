import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
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
import { fetchTasksData } from "../api/mainApi.js";
import DbAccordion from "../components/exerciseSheetComponents/dbAccordion.jsx";
import { sendToExecute } from "../api/queryApi.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundCoor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  overflow: "auto",
}));
function ExerciseSheetC({ area_id, area_name, endpoint, feedback_on }) {
  const navigate = useNavigate();
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
  const [hasStarted, setHasStarted] = useState(false);
  const [taskNumber, setTaskNumber] = useState(1);
  const [tasksArray, setTasksArray] = useState([]);

  const [formData, setFormData] = useState(() =>
  getInitialFormData(taskNumber)
);

  const [queryResult, setQueryResult] = useState("");
  const [syntaxMode, setSyntaxMode] = useState("");
  const [solutionResult, setSolutionResult] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("error");
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);

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
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };



  const executeQuery = async () => {
    setQueryResult("");
    const execQuery = formData.query_text;
    let apiRoute = "";
    if (endpoint === "PostgreSQL") {
      apiRoute = "/execute-sql";
    }

    try {
      const response = await sendToExecute(
        apiRoute,
        execQuery,
        taskNumber,
        area_id
      );

      if (typeof response.data.userQueryResult === "string") {
        setQueryResult([{ output: response.data.userQueryResult }]);
      } else {
        setQueryResult(response.data.userQueryResult);
      }
      setSolutionResult(response.data.expectedResult);

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
}, [formData, taskNumber]);


  useEffect(() => {
    if (endpoint === "PostgreSQL") {
      setSyntaxMode("pgsql");
    }

    const fetchUser = async () => {
      getTasks(area_id);
    };

    fetchUser();



    window.addEventListener("keydown", handleF5);
    return () => {
      window.removeEventListener("keydown", handleF5);
    };
  }, [taskNumber]);

  const startTask = () => {
    setHasStarted(true);
   
    
  };

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
    setQueryResult("");
    setError("");
    setHasStarted(false);
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



  return (
    <Container>
      <Typography variant="h4" sx={{ p: 2 }}>
        {area_name}
      </Typography>
      {task && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
     
            <Grid item xs={12} md={12}>
              <Item /* sx={{ bgcolor: "rgb(247, 250, 250)" }} */>
                {" "}
                <Box>
                  <InputLabel id="task-number-label">
                    Select another task you want to jump to:
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
                <Box p={0} aria-labelledby="Input Elements to solve the task">
                  {hasStarted ? (
                    <form>
                      <Box>
                        <InputLabel id="query-input-label">
                          Type and run your query if you think this task is
                          solvable with a query.
                        </InputLabel>

                        <AceEditor
                          id="query-input-label"
                          name="query"
                          mode={syntaxMode}
                          onChange={handleEditorChange}
                          value={formData.query_text}
                          editorProps={{ $blockScrolling: true }}
                          style={{ width: "100%", height: "400px" }}
                          setOptions={{ fontSize: "16px" }}
                        />
                        <Button onClick={executeQuery}>
                          Run query
                          <PlayCircleFilledWhiteIcon></PlayCircleFilledWhiteIcon>
                        </Button>
                        {feedback_on && (
                          <ImportantMsg
                            message="Note that the feedback functionality is a work in progress. It is possible that a message will appear stating that your result does not match the expected result. Your solution may still be correct. We are working on improving this functionality in the future so that your individual solution is evaluated with regard to the task description."
                            type="info"
                          />
                        )}
                        {queryResult && (
                          <ImportantMsg
                            message={
                              <div>
                                <CheckIcon></CheckIcon> Query was executed
                                successfully!
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
                          {<p>Result Size: {formData.resultSize}</p>}
                        </Box>
                      </Box>
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
                          label="Check if you finished this exercise to see your progress on the dashboard assignment card"
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
                              Back <NavigateBeforeIcon></NavigateBeforeIcon>
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
                              Back <NavigateBeforeIcon></NavigateBeforeIcon>
                            </Button>
                          )}

                          <Button
                            aria-label="Save current entries of this task and navigate to next task"
                            onClick={handleNextTask}
                          >
                            Next <NavigateNextIcon></NavigateNextIcon>
                          </Button>
                        </div>
                      )}{" "}
                    </form>
                  ) : (
                    <div>
                      <Button
                        aria-label="Start the task to open all task fields"
                        onClick={startTask}
                      >
                        Start task
                        <HourglassEmptyIcon></HourglassEmptyIcon>
                      </Button>
                      <p>{""}</p>
                    </div>
                  )}
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
