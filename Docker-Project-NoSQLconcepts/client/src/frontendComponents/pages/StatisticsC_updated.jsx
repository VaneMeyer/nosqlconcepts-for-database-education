import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const STORAGE_PREFIX = "formdata_";

/**
 * ExerciseSheetC speichert Einträge unter:
 * formdata_${area_id}_${taskNumber}
 *
 * Diese Komponente liest genau dieses Format aus dem localStorage.
 * Es werden keine API-Aufrufe und keine externen Statistikfunktionen benötigt.
 */

function readExerciseData() {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  const entries = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);

    if (!key || !key.startsWith(STORAGE_PREFIX)) {
      continue;
    }

    // Der letzte Bestandteil ist die Aufgabennummer.
    // Der davorliegende Bestandteil ist die area_id.
    const match = key.match(/^formdata_(.+)_(\d+)$/);

    if (!match) {
      continue;
    }

    const [, areaId, taskNumber] = match;

    try {
      const storedValue = window.localStorage.getItem(key);
      const formData = storedValue ? JSON.parse(storedValue) : null;

      if (!formData || typeof formData !== "object" || Array.isArray(formData)) {
        continue;
      }

      const queryText = String(
        formData.query_text ?? formData.query ?? ""
      );

      const resultSize = Number(formData.resultSize);
      const executionHistory = Array.isArray(formData.executionHistory)
        ? formData.executionHistory
        : [];
      const pointsHistory = Array.isArray(formData.pointsHistory)
        ? formData.pointsHistory
        : [];
      const latestExecution =
        executionHistory.length > 0
          ? executionHistory[executionHistory.length - 1]
          : null;

      entries.push({
        key,
        areaId,
        taskNumber: Number(taskNumber),
        queryText,
        isExecutable:
          formData.isExecutable === "Yes" ||
          formData.isExecutable === true,
        isFinished: formData.isFinished === true,
        resultSize: Number.isFinite(resultSize) ? resultSize : 0,
        totalDistance: formData.totalDistance ?? "",
        noCalculation: formData.noCalculation ?? "",
        feedbackOutput: Array.isArray(formData.feedbackOutput)
          ? formData.feedbackOutput
          : [],
        zeroCostOutput: Array.isArray(formData.zeroCostOutput)
          ? formData.zeroCostOutput
          : [],
        errorCount: Number(formData.errorCount) || 0,
        currentSQLPoints:
          formData.currentSQLPoints === null ||
          formData.currentSQLPoints === undefined
            ? null
            : Number(formData.currentSQLPoints),
        maxPoints_SQL: Number(formData.maxPoints_SQL) || 0,
        pointsHistory,
        executionHistory,
        latestExecution,
      });
    } catch (error) {
      // Ungültige oder unvollständige localStorage-Einträge überspringen.
      console.warn(`Statistics: Eintrag ${key} konnte nicht gelesen werden.`, error);
    }
  }

  return entries.sort((a, b) => {
    const areaComparison = String(a.areaId).localeCompare(
      String(b.areaId),
      undefined,
      { numeric: true }
    );

    return areaComparison || a.taskNumber - b.taskNumber;
  });
}

function SummaryCard({ title, value, subtitle }) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography color="text.secondary" variant="body2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" variant="caption">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function StatisticsC() {
  const theme = useTheme();
  const [exerciseData, setExerciseData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refreshData = useCallback(() => {
    setExerciseData(readExerciseData());
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    refreshData();

    // Aktualisieren, wenn der Nutzer zur Statistics-Seite zurückkehrt.
    const handleFocus = () => refreshData();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshData();
      }
    };

    // storage reagiert auf Änderungen aus einem anderen Browser-Tab.
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", refreshData);
    window.addEventListener("pageshow", refreshData);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", refreshData);
      window.removeEventListener("pageshow", refreshData);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshData]);

  const statistics = useMemo(() => {
    const totalTasks = exerciseData.length;
    const completedTasks = exerciseData.filter(
      (item) => item.isFinished
    ).length;
    const executedTasks = exerciseData.filter(
      (item) => item.isExecutable
    ).length;
    const tasksWithQuery = exerciseData.filter(
      (item) => item.queryText.trim().length > 0
    ).length;
    const totalResultRows = exerciseData.reduce(
      (sum, item) => sum + item.resultSize,
      0
    );
    const totalExecutions = exerciseData.reduce(
      (sum, item) => sum + item.executionHistory.length,
      0
    );
    const scoredTasks = exerciseData.filter(
      (item) => Number.isFinite(item.currentSQLPoints)
    );
    const averagePoints =
      scoredTasks.length > 0
        ? scoredTasks.reduce((sum, item) => sum + item.currentSQLPoints, 0) /
          scoredTasks.length
        : null;
    const totalPoints =
      scoredTasks.length > 0
        ? scoredTasks.reduce((sum, item) => sum + item.currentSQLPoints, 0) 
        : null;
    const totalMaxPoints =
      scoredTasks.length > 0
        ? scoredTasks.reduce((sum, item) => sum + item.maxPoints_SQL, 0) 
        : null;
    const totalErrors = exerciseData.reduce(
      (sum, item) => sum + item.errorCount,
      0
    );

    return {
      totalTasks,
      completedTasks,
      executedTasks,
      tasksWithQuery,
      totalResultRows,
      totalExecutions,
      averagePoints,
      totalPoints,
      totalMaxPoints,
      totalErrors,
      scoredTasks: scoredTasks.length,
      completionRate:
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    };
  }, [exerciseData]);

  const formatTime = (date) => {
    if (!date) return "Noch nicht aktualisiert";

    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Meine Statistiken
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Übersicht deiner lokal gespeicherten Übungsdaten
          </Typography>
        </Box>

        <Chip
          label={`Aktualisiert um ${formatTime(lastUpdated)}`}
          variant="outlined"
          color="primary"
        />
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Angezeigt werden ausschließlich die Übungsdaten, die im Browser unter
        den localStorage-Schlüsseln <strong>formdata_*</strong> gespeichert
        sind. Es werden keine Daten anderer Nutzer oder globale Kursstatistiken
        geladen.
      </Alert>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <SummaryCard
          title="Gespeicherte Aufgaben"
          value={statistics.totalTasks}
          subtitle="Aufgaben mit einem localStorage-Eintrag"
        />
        <SummaryCard
          title="Abgeschlossene Aufgaben"
          value={statistics.completedTasks}
          subtitle={`${Math.round(statistics.completionRate)} % der gespeicherten Aufgaben`}
        />
        <SummaryCard
          title="Ausführbare Abfragen"
          value={statistics.executedTasks}
          subtitle="Laut gespeichertem Ausführungsstatus"
        />
        <SummaryCard
          title="Ergebniszeilen insgesamt"
          value={statistics.totalResultRows}
          subtitle={`${statistics.tasksWithQuery} Aufgaben mit gespeicherter SQL-Eingabe`}
        />
        <SummaryCard
          title="SQL-Ausführungen"
          value={statistics.totalExecutions}
          subtitle="Gespeicherte Ausführungsversuche"
        />
        <SummaryCard
          title="Durchschnittliche Punkte"
          value={
            statistics.averagePoints === null
              ? "–"
              : statistics.averagePoints.toFixed(2)
          }
          subtitle={`${statistics.scoredTasks} Aufgaben mit Punktestand`}
        />
        <SummaryCard
          title="Punkte Gesamt"
          value={
            statistics.totalPoints === null
              ? "–"
              : `${statistics.totalPoints} / ${statistics.totalMaxPoints}`
          }
          subtitle={`${statistics.scoredTasks} Aufgaben mit Punktestand`}
        />
        <SummaryCard
          title="Erkannte Fehler"
          value={statistics.totalErrors}
          subtitle="Fehler im jeweils letzten Versuch pro Aufgabe"
        />
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Fortschritt
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Abgeschlossene Aufgaben
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {statistics.completedTasks} / {statistics.totalTasks}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={statistics.completionRate}
          sx={{
            height: 10,
            borderRadius: 5,
            mb: 1,
            backgroundColor: theme.palette.action.hover,
          }}
        />

        <Typography variant="caption" color="text.secondary">
          {Math.round(statistics.completionRate)} % abgeschlossen
        </Typography>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Aufgabenübersicht
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {exerciseData.length === 0 ? (
          <Alert severity="warning">
            Es wurden noch keine Übungsdaten im Browser gefunden. Öffne das
            Exercise Sheet und bearbeite mindestens eine Aufgabe. Die Daten
            werden dort automatisch gespeichert.
          </Alert>
        ) : (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: 3 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Übungsbereich</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Aufgabe</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Ergebniszeilen</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Distanz</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Punkte</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Fehler</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Versuche</strong>
                  </TableCell>
                  <TableCell>
                    <strong>SQL-Abfrage</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {exerciseData.map((item) => (
                  <TableRow key={item.key} hover>
                    <TableCell>{item.areaId}</TableCell>
                    <TableCell>{item.taskNumber}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                        <Chip
                          size="small"
                          label={item.isFinished ? "Abgeschlossen" : "Offen"}
                          color={item.isFinished ? "success" : "default"}
                          variant={item.isFinished ? "filled" : "outlined"}
                        />
                        <Chip
                          size="small"
                          label={item.isExecutable ? "Ausgeführt" : "Nicht ausgeführt"}
                          color={item.isExecutable ? "info" : "default"}
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">{item.resultSize}</TableCell>
                    <TableCell align="right">
                      {item.totalDistance !== "" ? item.totalDistance : "–"}
                    </TableCell>
                    <TableCell align="right">
                      {item.currentSQLPoints === null
                        ? "–"
                        : `${item.currentSQLPoints} / ${item.maxPoints_SQL}`}
                    </TableCell>
                    <TableCell align="right">{item.errorCount}</TableCell>
                    <TableCell align="right">{item.executionHistory.length}</TableCell>
                    <TableCell sx={{ maxWidth: 320 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "monospace",
                          whiteSpace: "pre-wrap",
                          overflowWrap: "anywhere",
                          maxHeight: 90,
                          overflow: "auto",
                        }}
                      >
                        {item.queryText.trim() || "Keine Abfrage gespeichert"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {exerciseData.some((item) => item.executionHistory.length > 0) && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Verlauf der SQL-Ausführungen
            </Typography>
            {exerciseData
              .filter((item) => item.executionHistory.length > 0)
              .map((item) => (
                <Paper
                  key={`${item.key}-history`}
                  variant="outlined"
                  sx={{ p: 2, mb: 2, borderRadius: 2 }}
                >
                  <Typography fontWeight={700} gutterBottom>
                    Übungsbereich {item.areaId} – Aufgabe {item.taskNumber}
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Zeitpunkt</TableCell>
                          <TableCell align="right">Distanz</TableCell>
                          <TableCell align="right">Punkte</TableCell>
                          <TableCell align="right">Fehler</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.executionHistory.map((attempt, index) => (
                          <TableRow key={`${item.key}-attempt-${index}`}>
                            <TableCell>
                              {attempt.timestamp
                                ? new Date(attempt.timestamp).toLocaleString("de-DE")
                                : `Versuch ${index + 1}`}
                            </TableCell>
                            <TableCell align="right">
                              {attempt.totalDistance || "–"}
                            </TableCell>
                            <TableCell align="right">
                              {Number.isFinite(Number(attempt.points))
                                ? `${attempt.points} / ${attempt.maxPoints}`
                                : "–"}
                            </TableCell>
                            <TableCell align="right">
                              {Number(attempt.errorCount) || 0}
                            </TableCell>
                            <TableCell>
                              {attempt.isCorrect ? "Korrekt" : "Nicht korrekt"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default StatisticsC;
