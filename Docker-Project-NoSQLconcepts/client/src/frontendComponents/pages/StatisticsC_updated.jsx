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
import { BarChart } from "@mui/x-charts/BarChart";

const STORAGE_PREFIX = "formdata_";

function normalizeEditStep(editStep) {
  return String(editStep ?? "")
    .replace(/^\s*Kosten\s*\d+\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function mapEditStepToCategory(editStep) {
  const step = normalizeEditStep(editStep).toLocaleLowerCase("de-DE");

  // Horizontal Edits: Änderungen innerhalb einer bestehenden SQL-Klausel.
  if (/argumente .*kommutativen binären ausdruck.*vertauschen/.test(step)) {
    if (/select-element/.test(step)) return "SELECT";
    if (/join-bedingung.*from-element/.test(step)) return "JOIN-Condition";
    if (/where-klausel/.test(step)) return "WHERE";
    if (/group-by/.test(step)) return "GROUP BY";
    if (/having-klausel/.test(step)) return "HAVING";
    if (/order-by/.test(step)) return "ORDER BY";
  }
  if (
    /verschachtelung .*assoziativen binären ausdruck.*vertauschen/.test(step)
  ) {
    if (/select-element/.test(step)) return "SELECT";
    if (/join-bedingung.*from-element/.test(step)) return "JOIN-Condition";
    if (/where-klausel/.test(step)) return "WHERE";
    if (/group-by/.test(step)) return "GROUP BY";
    if (/having-klausel/.test(step)) return "HAVING";
    if (/order-by/.test(step)) return "ORDER BY";
  }
  if (
    /ungleichung .*umkehren|seiten eines vergleichs .*vertauschen/.test(step)
  ) {
    if (/select-element/.test(step)) return "SELECT";
    if (/join-bedingung.*from-element/.test(step)) return "JOIN-Condition";
    if (/where-klausel/.test(step)) return "WHERE";
    if (/group-by/.test(step)) return "GROUP BY";
    if (/having-klausel/.test(step)) return "HAVING";
    if (/order-by/.test(step)) return "ORDER BY";
  }
  if (/elemente in der select-klausel vertauschen/.test(step)) return "SELECT";
  if (/elemente in der from-klausel vertauschen/.test(step)) return "FROM";
  if (/elemente in der group-by-klausel vertauschen/.test(step))
    return "GROUP BY";
  if (/position der elemente in der order-by-klausel ändern/.test(step))
    return "ORDER BY";

  // Allgemeine horizontale Änderungen – Klausel und betroffenes Element.
  if (/falschen tabellennamen für einen asterisk/.test(step))
    return "Table Asterisk";
  if (/falsche spalte .*spaltenreferenz.*select-element/.test(step))
    return "Column SELECT";
  if (/falsche tabelle .*spaltenreferenz.*select-element/.test(step))
    return "Table SELECT";
  if (/falschen literalwert .*select-element/.test(step))
    return "Literal value in SELECT";
  if (/falsche aggregationsfunktion .*select-element/.test(step))
    return "Agg SELECT";
  if (/falschen operator .*select-element/.test(step)) return "Operator SELECT";
  if (/falschen expliziten alias eines select-elements/.test(step))
    return "Alias SELECT";
  if (/falschen join-typ eines from-elements/.test(step)) return "JOIN Type";
  if (/falsche spalte .*spaltenreferenz.*join-bedingung/.test(step))
    return "Column JOIN-Condition";
  if (/falsche tabelle .*spaltenreferenz.*join-bedingung/.test(step))
    return "Table JOIN-Condition";
  if (/falschen literalwert .*join-bedingung/.test(step))
    return "Literal Value JOIN";
  if (/falschen operator .*join-bedingung/.test(step)) return "Operator JOIN";
  if (/falschen expliziten alias eines from-elements/.test(step))
    return "Alias FROM";
  if (/falsche spalte .*spaltenreferenz.*where-klausel/.test(step))
    return "Column WHERE";
  if (/falsche tabelle .*spaltenreferenz.*where-klausel/.test(step))
    return "Table WHERE";
  if (/falschen literalwert .*where-klausel/.test(step))
    return "Literal Value WHERE";
  if (/falschen operator .*where-klausel/.test(step)) return "Operator WHERE";
  if (/falsche spalte .*spaltenreferenz.*group-by/.test(step))
    return "Column GROUP BY";
  if (/falsche tabelle .*spaltenreferenz.*group-by/.test(step))
    return "Table GROUP BY";
  if (/falschen literalwert .*group-by/.test(step))
    return "Literal Value GROUP BY";
  if (/falschen operator .*group-by/.test(step)) return "Operator GROUP BY";
  if (/falsch referenzierte spalte .*having-klausel/.test(step))
    return "Column HAVING";
  if (/falsch referenzierte tabelle .*having-klausel/.test(step))
    return "Table HAVING";
  if (/falschen literalwert .*having-klausel/.test(step))
    return "Literal Value HAVING";
  if (/falsche aggregationsfunktion .*having-klausel/.test(step))
    return "Agg HAVING";
  if (/falschen operator .*having-klausel/.test(step)) return "Operator HAVING";
  if (/falsch referenzierte spalte .*order-by/.test(step))
    return "Column ORDER BY";
  if (/falsch referenzierte tabelle .*order-by/.test(step))
    return "Table ORDER BY";
  if (/falschen literalwert .*order-by/.test(step))
    return "Literal Value ORDER BY";
  if (/falsche aggregationsfunktion .*order-by/.test(step))
    return "Agg ORDER BY";
  if (/falschen operator .*order-by/.test(step)) return "Operator ORDER BY";

  // Shortcut Edits.
  if (/tautologiegesetz/.test(step)) return "Tautology law";
  if (/doppelte verneinung/.test(step)) return "Double negation law";
  if (/distributivgesetz/.test(step)) return "Distributive law";
  if (/de-morgan-regel/.test(step)) return "De Morgan's law";
  if (/absorptionsgesetz/.test(step)) return "Absorption law";
  if (/join-bedingung eines inner join.*where-klausel verschieben/.test(step))
    return "JOIN-Condition to WHERE";
  if (
    /ausdruck aus der where-klausel .*join-bedingung eines inner join.*verschieben/.test(
      step,
    )
  )
    return "WHERE to INNER JOIN-Condition";
  if (/asterisk \(\*\) durch die ausdrücke ersetzen/.test(step))
    return "Asterisk -> Expressions";
  if (/mehrere ausdrücke durch einen asterisk/.test(step))
    return "Expressions -> Asterisk";

  // Atomic Edits: die Beschreibung benennt das eingefügte/entfernte Element.
  // Die Klausel wird als zweite Dimension der Kategorie verwendet.
  const clause = /select|select-element/.test(step)
    ? "SELECT"
    : /from|join-bedingung/.test(step)
      ? "FROM/JOIN"
      : /where/.test(step)
        ? "WHERE"
        : /group-by/.test(step)
          ? "GROUP BY"
          : /having/.test(step)
            ? "HAVING"
            : /order-by/.test(step)
              ? "ORDER BY"
              : null;
  if (/asterisk/.test(step)) return `Asterisk\n${clause || "SQL"}`;
  if (/spaltenreferenz|spalte/.test(step)) return `Column\n${clause || "SQL"}`;
  if (/tabellenname|tabelle/.test(step)) return `Table\n${clause || "SQL"}`;
  if (/literal/.test(step)) return `Literal\n${clause || "SQL"}`;
  if (/verneinung|\bnot\b/.test(step)) return `'NOT'\n${clause || "SQL"}`;
  if (/aggregationsfunktion/.test(step)) return `Agg\n${clause || "SQL"}`;
  if (/distinct/.test(step)) return `DISTINCT\n${clause || "SQL"}`;
  if (/binärer ausdruck|operator/.test(step))
    return `Binary/Operator\n${clause || "SQL"}`;
  if (/alias/.test(step)) return `Alias\n${clause || "SQL"}`;
  if (/element .*klausel/.test(step)) return `Element\n${clause || "SQL"}`;
  if (/aufsteigend|absteigend|sortierrichtung/.test(step))
    return "Sort order\nORDER BY";

  return "Other";
}

function getEditStepChartData(exerciseData) {
  // Alle Ausführungsversuche berücksichtigen. feedbackOutput enthält die
  // regulären (Excess/Missing) Edits, zeroCostOutput die kostenfreien
  // Horizontal-/Shortcut-Edits. Ältere Einträge ohne Verlauf bleiben lesbar.
  const editSteps = exerciseData
    .flatMap((task) => {
      const history = Array.isArray(task.executionHistory)
        ? task.executionHistory
        : [];
      const entries =
        history.length > 0
          ? history.flatMap((attempt) => [
              ...(Array.isArray(attempt?.feedbackOutput)
                ? attempt.feedbackOutput
                : []),
              ...(Array.isArray(attempt?.zeroCostOutput)
                ? attempt.zeroCostOutput
                : []),
            ])
          : [
              ...(Array.isArray(task.feedbackOutput)
                ? task.feedbackOutput
                : []),
              ...(Array.isArray(task.zeroCostOutput)
                ? task.zeroCostOutput
                : []),
            ];
      return entries;
    })
    .map((entry) => normalizeEditStep(entry?.editStep ?? entry?.step ?? entry));

  const validSteps = editSteps.filter(Boolean);
  const isExcess = (step) =>
    /\bexcess\b|überflüssig|zu viel|unnötig|entfernen|löschen/i.test(step);
  const isMissing = (step) =>
    /\bmissing\b|fehlend|fehlt|hinzufügen|einfügen|ergänzen/i.test(step);
  const excess = validSteps.filter(isExcess);
  const missing = validSteps.filter(isMissing);

  const horizontalDefinitions = [
    {
      label: "Swap\narguments",
      test: (s) => /argumente .*vertauschen/i.test(s),
    },
    {
      label: "Swap\nnesting",
      test: (s) => /verschachtelung .*vertauschen/i.test(s),
    },
    {
      label: "Mirror",
      test: (s) =>
        /ungleichung .*umkehren|seiten eines vergleichs .*vertauschen/i.test(s),
    },
    { label: "Swap\nelements", test: (s) => /elemente .*vertauschen/i.test(s) },
    {
      label: "Change\npositions",
      test: (s) => /position der elemente .*ändern/i.test(s),
    },
    {
      label: "Change\n(incorrect)",
      test: (s) =>
        /falsche|falschen|falsch referenzierte|falsch referenziert/i.test(s),
    },
  ];
  const shortcutDefinitions = [
    { label: "Tautology\nlaw", test: (s) => /tautologiegesetz/i.test(s) },
    { label: "Double\nneg.\nlaw", test: (s) => /doppelte verneinung/i.test(s) },
    { label: "Distr.\nlaw", test: (s) => /distributivgesetz/i.test(s) },
    { label: "De\nMorgan", test: (s) => /de-morgan-regel/i.test(s) },
    { label: "Absorp.\nlaw", test: (s) => /absorptionsgesetz/i.test(s) },
    { label: "Move", test: (s) => /verschieben/i.test(s) },
    {
      label: "Replace",
      test: (s) => /asterisk .*ersetzen|ausdrücke .*asterisk/i.test(s),
    },
  ];

  const countCategories = (steps) => {
    const counts = {};
    steps.forEach((step) => {
      const category = mapEditStepToCategory(step);
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  };
  const horizontalGroups = horizontalDefinitions.map(({ test }) =>
    countCategories(validSteps.filter(test)),
  );
  const shortcutGroups = shortcutDefinitions.map(({ test }) =>
    countCategories(validSteps.filter(test)),
  );
  const getSeries = (groups, labels) => {
    const variants = [
      ...new Set(groups.flatMap((group) => Object.keys(group))),
    ];
    if (variants.length === 0)
      return [{ label: "Keine Treffer", data: labels.map(() => 0) }];
    return variants.map((variant) => ({
      label: variant,
      data: groups.map((group) => group[variant] || 0),
    }));
  };

  const excessCountsByCategory = countCategories(excess);
  const missingCountsByCategory = countCategories(missing);
  const excessCategories = Object.keys(excessCountsByCategory);
  const missingCategories = Object.keys(missingCountsByCategory);
  const horizontalTypes = horizontalDefinitions.map((item) => item.label);
  const shortcutTypes = shortcutDefinitions.map((item) => item.label);

  return {
    excessCategories: excessCategories.length
      ? excessCategories
      : ["Keine Treffer"],
    excessCounts: excessCategories.length
      ? Object.values(excessCountsByCategory)
      : [0],
    missingCategories: missingCategories.length
      ? missingCategories
      : ["Keine Treffer"],
    missingCounts: missingCategories.length
      ? Object.values(missingCountsByCategory)
      : [0],
    horizontalTypes,
    horizontalSeries: getSeries(horizontalGroups, horizontalTypes),
    shortcutTypes,
    shortcutSeries: getSeries(shortcutGroups, shortcutTypes),
    excessTotal: excess.length,
    missingTotal: missing.length,
    horizontalTotal: horizontalGroups.reduce(
      (sum, group) => sum + Object.values(group).reduce((a, b) => a + b, 0),
      0,
    ),
    shortcutTotal: shortcutGroups.reduce(
      (sum, group) => sum + Object.values(group).reduce((a, b) => a + b, 0),
      0,
    ),
    totalEditSteps: validSteps.length,
  };
}

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

      if (
        !formData ||
        typeof formData !== "object" ||
        Array.isArray(formData)
      ) {
        continue;
      }

      const queryText = String(formData.query_text ?? formData.query ?? "");

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
          formData.isExecutable === "Yes" || formData.isExecutable === true,
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
      console.warn(
        `Statistics: Eintrag ${key} konnte nicht gelesen werden.`,
        error,
      );
    }
  }

  return entries.sort((a, b) => {
    const areaComparison = String(a.areaId).localeCompare(
      String(b.areaId),
      undefined,
      { numeric: true },
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
      (item) => item.isFinished,
    ).length;
    const executedTasks = exerciseData.filter(
      (item) => item.isExecutable,
    ).length;
    const tasksWithQuery = exerciseData.filter(
      (item) => item.queryText.trim().length > 0,
    ).length;
    const totalResultRows = exerciseData.reduce(
      (sum, item) => sum + item.resultSize,
      0,
    );
    const totalExecutions = exerciseData.reduce(
      (sum, item) => sum + item.executionHistory.length,
      0,
    );
    const scoredTasks = exerciseData.filter((item) =>
      Number.isFinite(item.currentSQLPoints),
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
      0,
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
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    };
  }, [exerciseData]);

  const editStepStatistics = useMemo(
    () => getEditStepChartData(exerciseData),
    [exerciseData],
  );

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
          title="Bisher erreichte Punktzahl"
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
          Edit-Step-Statistiken
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Auswertung aller gespeicherten SQL-Ausführungsversuche dieses
          Browserprofils. Ein Edit-Step wird pro Versuch gezählt.
        </Typography>
        {editStepStatistics.totalEditSteps === 0 ? (
          <Alert severity="info">
            Noch keine Edit-Steps vorhanden. Führe eine SQL-Aufgabe aus, damit
            die Edit-Steps im Ausführungsverlauf gespeichert und hier
            ausgewertet werden.
          </Alert>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 3, minWidth: 0 }}
            >
              <Typography fontWeight={700} gutterBottom>
                Excess-Edit-Steps ({editStepStatistics.excessTotal})
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: editStepStatistics.excessCategories,
                  },
                ]}
                yAxis={[{ scaleType: "linear", label: "Häufigkeit" }]}
                series={[
                  { data: editStepStatistics.excessCounts, label: "Excess" },
                ]}
                height={300}
                margin={{ bottom: 70, left: 55, right: 20, top: 25 }}
              />
            </Paper>

            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 3, minWidth: 0 }}
            >
              <Typography fontWeight={700} gutterBottom>
                Missing-Edit-Steps ({editStepStatistics.missingTotal})
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: editStepStatistics.missingCategories,
                  },
                ]}
                yAxis={[{ scaleType: "linear", label: "Häufigkeit" }]}
                series={[
                  { data: editStepStatistics.missingCounts, label: "Missing" },
                ]}
                height={300}
                margin={{ bottom: 70, left: 55, right: 20, top: 25 }}
              />
            </Paper>

            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 3, minWidth: 0 }}
            >
              <Typography fontWeight={700} gutterBottom>
                Horizontal-Edit-Steps ({editStepStatistics.horizontalTotal})
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: editStepStatistics.horizontalTypes,
                  },
                ]}
                yAxis={[{ scaleType: "linear", label: "Häufigkeit" }]}
                series={editStepStatistics.horizontalSeries}
                stacking="normal"
                height={320}
                margin={{ bottom: 75, left: 55, right: 20, top: 25 }}
              />
            </Paper>

            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: 3, minWidth: 0 }}
            >
              <Typography fontWeight={700} gutterBottom>
                Shortcut-Edit-Steps ({editStepStatistics.shortcutTotal})
              </Typography>
              <BarChart
                xAxis={[
                  { scaleType: "band", data: editStepStatistics.shortcutTypes },
                ]}
                yAxis={[{ scaleType: "linear", label: "Häufigkeit" }]}
                series={editStepStatistics.shortcutSeries}
                stacking="normal"
                height={320}
                margin={{ bottom: 75, left: 55, right: 20, top: 25 }}
              />
            </Paper>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Aufgabenübersicht
        </Typography>
        <Typography variant="p">
          Die Kombination aus Distanz = "–" und Punkte = "5/5" bedeutet, dass
          die SQL Query dieser Aufgabe noch nicht von der genutzten
          SQL-Distanz-Funktion verarbeitet werden kann. Die Distanz meint die
          Distanz der erreichten Punktzahl zur maximal möglichen Punktzahl einer
          Aufgabe.
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
                      <Box
                        sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}
                      >
                        <Chip
                          size="small"
                          label={item.isFinished ? "Abgeschlossen" : "Offen"}
                          color={item.isFinished ? "success" : "default"}
                          variant={item.isFinished ? "filled" : "outlined"}
                        />
                        <Chip
                          size="small"
                          label={
                            item.isExecutable
                              ? "Ausgeführt"
                              : "Nicht ausgeführt"
                          }
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
                    <TableCell align="right">
                      {item.executionHistory.length}
                    </TableCell>
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
            <Typography variant="p">
              Die Bewertung basiert auf einem Output-Vergleich von Musterlösung
              und ausgeführter SQL Query.
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
                          <TableCell>Bewertung</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {item.executionHistory.map((attempt, index) => (
                          <TableRow key={`${item.key}-attempt-${index}`}>
                            <TableCell>
                              {attempt.timestamp
                                ? new Date(attempt.timestamp).toLocaleString(
                                    "de-DE",
                                  )
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
