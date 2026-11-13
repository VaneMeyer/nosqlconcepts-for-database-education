import React, { useEffect, useState } from "react";


import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

const API =
  process.env.REACT_APP_API_URL ||
  "http://localhost:8000";

/* const CATEGORIES = [
  "CORRECT",
  "SYNTAX_FEHLER",
  "FALSCHE_TABELLE",
  "FALSCHES_ATTRIBUT",
  "JOIN_FEHLER",
  "FILTER_FEHLER",
  "AGGREGATION_FEHLER",
  "GROUP_BY_FEHLER",
  "SUBQUERY_FEHLER",
  "SEMANTISCHER_FEHLER",
  "TEILWEISE_KORREKT",
  "SONSTIGER_FEHLER",
]; */
const CATEGORIES = [
  "CORRECT",
  "INCORRECT",
 
]; 

const initial = {
  task: {
    taskID: "T04",

    title: "Beispielaufgabe",

    description:
      "List all the attributes of the final match (= the match with the latest date).",

    referenceSolution:
      "SELECT * FROM game WHERE mdate = (SELECT max(mdate) FROM game);",

    maxPoints: 4,
  },

  studentID: "S0test",

  studentSolution:
    "SELECT * FROM game WHERE mdate = '2026-11-03';",

  humanEvaluation: {
    tutorID: "Tutor0test",

    points: 2,

    category:
      "INCORRECT",

    comment:
      "Hardcoded date",
  },
};

function AITutor() {
  const [data, setData] =
    useState(initial);

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [online, setOnline] =
    useState(false);

  const [run, setRun] =
    useState(null);

  const [saved, setSaved] =
    useState(false);

  // -------------------------------------------------------
  // Backend Health Check
  // -------------------------------------------------------

  useEffect(() => {
    checkBackend();
  }, []);

  async function checkBackend() {
    try {
      const response = await fetch(
        `${API}/api/health`,
      );

      if (!response.ok) {
        throw Error(
          "Backend offline",
        );
      }

      setOnline(true);
    } catch {
      setOnline(false);
    }
  }

  // -------------------------------------------------------
  // State Helpers
  // -------------------------------------------------------

  function updateTask(key, value) {
    setData((current) => ({
      ...current,

      task: {
        ...current.task,
        [key]: value,
      },
    }));
  }

  function updateHuman(key, value) {
    setData((current) => ({
      ...current,

      humanEvaluation: {
        ...current.humanEvaluation,
        [key]: value,
      },
    }));
  }

  function updateStudentID(value) {
    setData((current) => ({
      ...current,
      studentID: value,
    }));
  }

  function updateStudentSolution(value) {
    setData((current) => ({
      ...current,
      studentSolution: value,
    }));
  }

  // -------------------------------------------------------
  // Evaluation
  // -------------------------------------------------------

  async function evaluate() {
    setLoading(true);
    setError("");
    setResults([]);
    setRun(null);
    setSaved(false);

    try {
      const response = await fetch(
        `${API}/api/evaluate`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        },
      );

      const body =
        await response.json();

      if (
        !response.ok ||
        !body.ok
      ) {
        throw Error(
          body.error ||
            "Evaluation failed",
        );
      }

      setResults(
        body.results || [],
      );

      setRun(
        body.run ?? null,
      );

      setSaved(
        body.saved === true,
      );
    } catch (e) {
      setError(
        e.message ||
          "Evaluation failed",
      );
    } finally {
      setLoading(false);

      // Backend status erneut prüfen
      checkBackend();
    }
  }

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        p: 3,
      }}
    >
      {/* Header */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            AI Tutor
          </Typography>

          <Typography color="text.secondary">
            AI Tutor vs. Human Tutor
          </Typography>
        </Box>

        <Chip
          label={
            online
              ? "Backend online"
              : "Backend offline"
          }
          color={
            online
              ? "success"
              : "default"
          }
        />
      </Stack>

      {/* Identifikation */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Evaluation
        </Typography>

        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={4}
          >
            <TextField
              fullWidth
              label="Task-ID"
              value={
                data.task.taskID
              }
              onChange={(e) =>
                updateTask(
                  "taskID",
                  e.target.value,
                )
              }
              helperText="z. B. T01"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
          >
            <TextField
              fullWidth
              label="Student-ID"
              value={
                data.studentID
              }
              onChange={(e) =>
                updateStudentID(
                  e.target.value,
                )
              }
              helperText="z. B. S01"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
          >
            <TextField
              fullWidth
              label="Tutor-ID"
              value={
                data
                  .humanEvaluation
                  .tutorID
              }
              onChange={(e) =>
                updateHuman(
                  "tutorID",
                  e.target.value,
                )
              }
              helperText="z. B. Tutor01"
            />
          </Grid>
        </Grid>

        {run !== null && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2 }}
          >
            <Chip
              label={`Run ${run}`}
              color="primary"
            />

            {saved && (
              <Chip
                label="Evaluation saved"
                color="success"
              />
            )}
          </Stack>
        )}
      </Paper>

      {/* Task + Student solution */}
      <Grid
        container
        spacing={2}
      >
        {/* Aufgabe */}
        <Grid
          item
          xs={12}
          md={6}
        >
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Task
            </Typography>

            <Stack spacing={2}>
              

              <TextField
                label="Description"
                value={
                  data.task.description
                }
                onChange={(e) =>
                  updateTask(
                    "description",
                    e.target.value,
                  )
                }
                multiline
                minRows={4}
              />

              <TextField
                label="Reference Solution"
                value={
                  data.task
                    .referenceSolution
                }
                onChange={(e) =>
                  updateTask(
                    "referenceSolution",
                    e.target.value,
                  )
                }
                multiline
                minRows={5}
                sx={{
                  "& textarea": {
                    fontFamily:
                      "monospace",
                  },
                }}
              />

              <TextField
                label="Max. Score"
                type="number"
                value={
                  data.task.maxPoints
                }
                onChange={(e) =>
                  updateTask(
                    "maxPoints",
                    Number(
                      e.target.value,
                    ),
                  )
                }
                inputProps={{
                  min: 1,
                }}
              />
            </Stack>
          </Paper>
        </Grid>

        {/* Studierendenlösung */}
        <Grid
          item
          xs={12}
          md={6}
        >
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Student Solution
            </Typography>

            <TextField
              fullWidth
              value={
                data.studentSolution
              }
              onChange={(e) =>
                updateStudentSolution(
                  e.target.value,
                )
              }
              multiline
              minRows={12}
              sx={{
                "& textarea": {
                  fontFamily:
                    "monospace",
                },
              }}
            />
          </Paper>

          {/* Human evaluation */}
          <Paper
            sx={{
              p: 2,
              mt: 2,
            }}
          >
            <Typography variant="h6">
              Human Tutor
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{ mt: 0.2 }}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  fullWidth
                  label="Score"
                  type="number"
                  value={
                    data
                      .humanEvaluation
                      .points
                  }
                  onChange={(e) =>
                    updateHuman(
                      "points",
                      Number(
                        e.target.value,
                      ),
                    )
                  }
                  inputProps={{
                    min: 0,
                    max:
                      data.task
                        .maxPoints,
                    step: 0.5,
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={
                    data
                      .humanEvaluation
                      .category
                  }
                  onChange={(e) =>
                    updateHuman(
                      "category",
                      e.target.value,
                    )
                  }
                >
                  {CATEGORIES.map(
                    (category) => (
                      <MenuItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Further comments"
                  value={
                    data
                      .humanEvaluation
                      .comment
                  }
                  onChange={(e) =>
                    updateHuman(
                      "comment",
                      e.target.value,
                    )
                  }
                  multiline
                  minRows={2}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Evaluate button */}
      <Button
        sx={{ my: 3 }}
        variant="contained"
        size="large"
        onClick={evaluate}
        disabled={
          loading || !online
        }
      >
        {loading ? (
          <>
            <CircularProgress
              size={24}
              color="inherit"
              sx={{ mr: 1 }}
            />

            LLMs working...
          </>
        ) : (
          "Generate LLM Feedback"
        )}
      </Button>

      {/* Error */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={1}
            mb={2}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
              >
                LLM Comparison
              </Typography>

              <Typography
                color="text.secondary"
              >
                {data.task.taskID} ·{" "}
                {data.studentID}
                {run !== null &&
                  ` · Run ${run}`}
              </Typography>
            </Box>

            {saved && (
              <Chip
                label="Saved"
                color="success"
              />
            )}
          </Stack>

          <Grid
            container
            spacing={2}
          >
            {results.map((result) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={result.model}
              >
                <Result
                  result={result}
                  max={
                    data.task
                      .maxPoints
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

// ---------------------------------------------------------
// Result Card
// ---------------------------------------------------------

function Result({
  result,
  max,
}) {
  if (!result.success) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          height: "100%",
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h6"
            fontWeight={600}
          >
            {result.model}
          </Typography>

          <Alert severity="error">
            {result.error}
          </Alert>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Runtime:{" "}
            {formatRuntime(
              result.durationMs,
            )}
          </Typography>
        </Stack>
      </Paper>
    );
  }

  const evaluation =
    result.evaluation;

  const comparison =
    result.comparisonToHuman;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        height: "100%",
      }}
    >
      <Stack spacing={1.3}>
        {/* Model */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            {result.model}
          </Typography>

          <Chip
            size="small"
            label={formatRuntime(
              result.durationMs,
            )}
          />
        </Stack>

        <Divider />

        {/* Points */}
        <Typography>
          <b>LLM Score:</b>{" "}
          {evaluation.points} / {max}
        </Typography>

        {/* Difference */}
        {comparison && (
          <>
            <Typography>
              <b>Tutor:</b>{" "}
              {comparison.pointDifference >
              0
                ? "+"
                : ""}
              {
                comparison.pointDifference
              }{" "}
              Score difference
            </Typography>

        
          </>
        )}

        {/* Category */}
        <Box>
          <Typography
            component="span"
          >
            <b>Category:</b>{" "}
          </Typography>

          <Chip
            size="small"
            label={
              evaluation.errorCategory
            }
          />
        </Box>

        {/* Category comparison */}
        {comparison &&
          comparison.categoryMatches !==
            null && (
            <Typography
              color={
                comparison.categoryMatches
                  ? "success.main"
                  : "error.main"
              }
            >
              <b>
                Category compared to human:
              </b>{" "}
              {comparison.categoryMatches
                ? "is equal to human tutor"
                : "is NOT equal to human tutor"}
            </Typography>
          )}

        {/* Error */}
        <Typography>
          <b>Error:</b>{" "}
          {evaluation.errorSummary ||
            "Keine Angabe"}
        </Typography>

        {/* Reasoning */}
        <Typography>
          <b>Reason:</b>{" "}
          {evaluation.reasoning ||
            "Keine Angabe"}
        </Typography>

        {/* Confidence */}
        {evaluation.confidence !==
          null && (
          <Typography color="text.secondary">
            <b>Confidence:</b>{" "}
            {(
              evaluation.confidence *
              100
            ).toFixed(0)}
            %
          </Typography>
        )}

        
      </Stack>
    </Paper>
  );
}

// ---------------------------------------------------------
// Runtime formatting
// ---------------------------------------------------------

function formatRuntime(
  milliseconds,
) {
  if (
    !Number.isFinite(
      Number(milliseconds),
    )
  ) {
    return "–";
  }

  const ms = Number(
    milliseconds,
  );

  if (ms < 1000) {
    return `${ms} ms`;
  }

  return `${(
    ms / 1000
  ).toFixed(2)} s`;
}

export default AITutor;