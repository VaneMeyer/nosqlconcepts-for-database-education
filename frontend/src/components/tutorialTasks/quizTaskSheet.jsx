import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Link } from "react-router-dom";
import ImportantMsg from "../importantMsg";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

const QuizTaskSheet = ({ title, tasks }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const questionsInitial = tasks;
  const shuffledQuestions = questionsInitial.sort(() => Math.random() - 0.5);
  const [questions, setQuestions] = useState(shuffledQuestions);
  const [score, setScore] = useState(0);
  const [indexArray, setIndexArray] = useState([]);
  const [selectedOptionIndexes, setSelectedOptionIndexes] = useState(
    new Array(questions.length).fill(null)
  );
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const updatedQuestions = questions.map((question) => ({
      ...question,
      options: question.options.sort(() => Math.random() - 0.5),
    }));
    setQuestions(updatedQuestions);
  }, []);

  const handleAnswerClick = (selectedOption, index, optionIndex) => {
    setShowScore(false);

    const existingIndex = indexArray.findIndex((item) => item.index === index);

    if (existingIndex !== -1) {
      const prevState = indexArray[existingIndex].state;

      if (
        selectedOption !== questions[index].correctAnswer &&
        prevState === "correct"
      ) {
        setScore((score) => score - 1);
      } else if (
        selectedOption === questions[index].correctAnswer &&
        prevState === "incorrect"
      ) {
        setScore((score) => score + 1);
      }

      indexArray[existingIndex].state =
        selectedOption === questions[index].correctAnswer
          ? "correct"
          : "incorrect";
    } else {
      if (selectedOption === questions[index].correctAnswer) {
        setScore((score) => score + 1);
      }

      setIndexArray((prevIndexArray) => [
        ...prevIndexArray,
        {
          index,
          state:
            selectedOption === questions[index].correctAnswer
              ? "correct"
              : "incorrect",
        },
      ]);
    }

    setSelectedOptionIndexes((prevSelectedOptionIndexes) => {
      const newSelectedOptionIndexes = [...prevSelectedOptionIndexes];
      newSelectedOptionIndexes[index] = optionIndex;
      return newSelectedOptionIndexes;
    });
  };

  const handleShowScoreClick = () => {
    setShowScore(true);
  };

  const handleReset = () => {
    setScore(0);
    setSelectedOptionIndexes(new Array(questions.length).fill(null));
    setIndexArray([]);
    setShowScore(false);
    const updatedQuestions = shuffledQuestions.map((question) => ({
      ...question,
      options: question.options.sort(() => Math.random() - 0.5),
    }));
    setQuestions(updatedQuestions);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <Link to="../tutorial">
          <Button>Zurück zur Themenübersicht</Button>
        </Link>
        <hr />
        {title === "nestedselectquiz" ? (
          <div>
            <p>Tabelle bbc </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>region</th>
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
                <td style={{ border: "1px solid black" }}>Middle East	</td>
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
                <td style={{ border: "1px solid black" }}>Bangladesh</td>
                <td style={{ border: "1px solid black" }}>South Asia</td>
                <td style={{ border: "1px solid black" }}>143998</td>
                <td style={{ border: "1px solid black" }}>152600000</td>
                <td style={{ border: "1px solid black" }}>67144000000</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>United Kingdom</td>
                <td style={{ border: "1px solid black" }}>Europe</td>
                <td style={{ border: "1px solid black" }}>242514</td>
                <td style={{ border: "1px solid black" }}>59600000</td>
                <td style={{ border: "1px solid black" }}>2022824000000</td>
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
        ) : (
          <div>
            {" "}
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

        {questions.map((quiz, index) => (
          <Box key={index}>
            <hr />
            <p>{quiz.question}</p>
            {quiz.imageUrl}
            <p> </p>
            <p>Antwortmöglichkeiten:</p>
            {quiz.options.map((option, optionIndex) => (
              <div key={option.id}>
                <button
                  style={{
                    backgroundColor:
                      showScore &&
                      questions[index].correctAnswer === option.id &&
                      selectedOptionIndexes[index] === optionIndex
                        ? `${colors.greenAccent[700]}`
                        : showScore &&
                          questions[index].correctAnswer !== option.id &&
                          selectedOptionIndexes[index] === optionIndex
                        ? `${colors.redAccent[700]}`
                        : selectedOptionIndexes[index] === optionIndex
                        ? "#64b5f6"
                        : "#cccccc",
                    margin: 1,
                    border: 0,
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "5px 10px",
                  }}
                  onClick={() =>
                    handleAnswerClick(option.id, index, optionIndex)
                  }
                >
                  <p>{option.text}</p>
                  {showScore &&
                    selectedOptionIndexes[index] === optionIndex &&
                    questions[index].correctAnswer === option.id && (
                      <CheckIcon style={{ marginLeft: "5px" }} />
                    )}
                  {showScore &&
                    selectedOptionIndexes[index] === optionIndex &&
                    questions[index].correctAnswer !== option.id && (
                      <ClearIcon style={{ marginLeft: "5px" }} />
                    )}
                </button>
                <br />
              </div>
            ))}
          </Box>
        ))}

        <Button
          sx={{
            backgroundColor: "#2196f3",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: 2,
          }}
          onClick={handleShowScoreClick}
        >
          Score anzeigen
        </Button>
        <Button
          onClick={() => handleReset()}
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
        {showScore && (
          <ImportantMsg
            message={`Dein erreichter Score: ${score}/${questions.length}`}
            type="success"
          />
        )}
        <Link to="../tutorial">
          <Button sx={{ margin: 1 }}>Zurück zur Themenübersicht</Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizTaskSheet;
