import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";



const QuizTaskSheet = ({ title, tasks }) => {

  

  const shuffledQuestions = useMemo(
    () => [...tasks].sort(() => Math.random() - 0.5),
    [tasks]
  );

  const [questions, setQuestions] = useState(shuffledQuestions);
  const [score, setScore] = useState(0);
  const [indexArray, setIndexArray] = useState([]);
  const [selectedOptionIndexes, setSelectedOptionIndexes] = useState(
    new Array(shuffledQuestions.length).fill(null)
  );
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const updated = shuffledQuestions.map((q) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));
    setQuestions(updated);
  }, [shuffledQuestions]);

  const handleAnswerClick = (selectedOption, index, optionIndex) => {
    setShowScore(false);

    const existingIndex = indexArray.findIndex((item) => item.index === index);

    if (existingIndex !== -1) {
      const prevState = indexArray[existingIndex].state;

      if (
        selectedOption !== questions[index].correctAnswer &&
        prevState === "correct"
      ) {
        setScore((s) => s - 1);
      } else if (
        selectedOption === questions[index].correctAnswer &&
        prevState === "incorrect"
      ) {
        setScore((s) => s + 1);
      }

      indexArray[existingIndex].state =
        selectedOption === questions[index].correctAnswer
          ? "correct"
          : "incorrect";
    } else {
      if (selectedOption === questions[index].correctAnswer) {
        setScore((s) => s + 1);
      }

      setIndexArray((prev) => [
        ...prev,
        {
          index,
          state:
            selectedOption === questions[index].correctAnswer
              ? "correct"
              : "incorrect",
        },
      ]);
    }

    setSelectedOptionIndexes((prev) => {
      const copy = [...prev];
      copy[index] = optionIndex;
      return copy;
    });
  };

  const handleReset = () => {
    setScore(0);
    setSelectedOptionIndexes(new Array(questions.length).fill(null));
    setIndexArray([]);
    setShowScore(false);

    const reshuffled = shuffledQuestions.map((q) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));

    setQuestions(reshuffled);
  };

  const getButtonColor = (qIndex, option, optionIndex) => {
    if (!showScore) {
      return selectedOptionIndexes[qIndex] === optionIndex
        ? "primary"
        : "inherit";
    }

    if (questions[qIndex].correctAnswer === option.id) {
      return "success";
    }

    if (
      selectedOptionIndexes[qIndex] === optionIndex &&
      questions[qIndex].correctAnswer !== option.id
    ) {
      return "error";
    }

    return "inherit";
  };

  const renderWorldTable = () => (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>continent</TableCell>
            <TableCell>area</TableCell>
            <TableCell>population</TableCell>
            <TableCell>gdp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Afghanistan</TableCell>
            <TableCell>Asia</TableCell>
            <TableCell>652230</TableCell>
            <TableCell>25500100</TableCell>
            <TableCell>20343000000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Albania</TableCell>
            <TableCell>Europe</TableCell>
            <TableCell>28748</TableCell>
            <TableCell>2831741</TableCell>
            <TableCell>12960000000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Box sx={{ width: "100%", maxWidth: 900 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold">
            Quiz
          </Typography>
         
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Tabellen */}
        {title !== "nestedselectquiz" &&
          title !== "joinquiz" &&
          title !== "joinquiz2" &&
          title !== "usingnullquiz" &&
          title !== "selfjoinquiz" && (
            <>
              <Typography variant="h6" gutterBottom>
                Tabelle: world
              </Typography>
              {renderWorldTable()}
            </>
          )}

        {/* Fragen */}
        <Stack spacing={3}>
          {questions.map((quiz, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6">
                    {index + 1}. {quiz.question}
                  </Typography>

                  {quiz.imageUrl && <Box>{quiz.imageUrl}</Box>}

                  <Stack spacing={1}>
                    {quiz.options.map((option, optionIndex) => (
                      <Button
                        key={option.id}
                        variant={
                          selectedOptionIndexes[index] === optionIndex
                            ? "contained"
                            : "outlined"
                        }
                        color={getButtonColor(index, option, optionIndex)}
                        onClick={() =>
                          handleAnswerClick(option.id, index, optionIndex)
                        }
                        sx={{
                          justifyContent: "space-between",
                          textTransform: "none",
                          px: 2,
                          py: 1.2,
                        }}
                      >
                        <span>{option.text}</span>
                        {showScore &&
                          selectedOptionIndexes[index] === optionIndex &&
                          questions[index].correctAnswer === option.id && (
                            <CheckIcon />
                          )}
                        {showScore &&
                          selectedOptionIndexes[index] === optionIndex &&
                          questions[index].correctAnswer !== option.id && (
                            <ClearIcon />
                          )}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Aktionen */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowScore(true)}
          >
            Score anzeigen
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
          >
            Zurücksetzen
          </Button>
        </Stack>

        {/* Score */}
        {showScore && (
          <Box sx={{ mt: 3 }}>
            <Typography>
                Dein erreichter Score: {score}/{questions.length}
            </Typography>
            
          </Box>
        )}

    
      </Box>
    </Box>
  );
};

export default QuizTaskSheet;
