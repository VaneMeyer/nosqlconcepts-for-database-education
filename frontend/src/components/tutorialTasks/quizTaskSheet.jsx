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
        {title === "nestedselectquiz" && (
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
        ) } 
        {(title !== "nestedselectquiz" && title !== "joinquiz" && title !== "joinquiz2" && title !=="usingnullquiz" && title !== "selfjoinquiz") && (
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
        {(title === "joinquiz") && (<div><p>game </p>
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
            <td style={{ border: "1px solid black" }}>	8 June 2012</td>
            <td style={{ border: "1px solid black" }}>National Stadium, Warsaw</td>
            <td style={{ border: "1px solid black" }}>POL</td>
            <td style={{ border: "1px solid black" }}>GRE</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>1002</td>
            <td style={{ border: "1px solid black" }}>8 June 2012</td>
            <td style={{ border: "1px solid black" }}>Stadion Miejski (Wroclaw)</td>
            <td style={{ border: "1px solid black" }}>RUS</td>
            <td style={{ border: "1px solid black" }}>CZE</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>1003</td>
            <td style={{ border: "1px solid black" }}>12 June 2012</td>
            <td style={{ border: "1px solid black" }}>Stadion Miejski (Wroclaw)</td>
            <td style={{ border: "1px solid black" }}>GRE</td>
            <td style={{ border: "1px solid black" }}>CZE</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>1004</td>
            <td style={{ border: "1px solid black" }}>12 June 2012</td>
            <td style={{ border: "1px solid black" }}>National Stadium, Warsaw</td>
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
            <td style={{ border: "1px solid black" }}>	POL</td>
            <td style={{ border: "1px solid black" }}>Robert Lewandowski</td>
            <td style={{ border: "1px solid black" }}>17</td>
            
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>1001</td>
            <td style={{ border: "1px solid black" }}>GRE</td>
            <td style={{ border: "1px solid black" }}>Dimitris Salpingidis</td>
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
            <td style={{ border: "1px solid black" }}>Roman Pavlyuchenko</td>
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
            <td style={{ border: "1px solid black" }}>	Poland</td>
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
        </div>)}
        {title === "joinquiz2" && (
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
        {title === "usingnullquiz" && (
          <div>
            <p>teacher </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>id</th>
                <th style={{ border: "1px solid black" }}>dept</th>
                <th style={{ border: "1px solid black" }}>name</th>
                <th style={{ border: "1px solid black" }}>phone</th>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>101</td>
                <td style={{ border: "1px solid black" }}>1</td>
                <td style={{ border: "1px solid black" }}>Shrivell</td>
                <td style={{ border: "1px solid black" }}>2753</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>102</td>
                <td style={{ border: "1px solid black" }}>1</td>
                <td style={{ border: "1px solid black" }}>Throd</td>
                <td style={{ border: "1px solid black" }}>2754</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>103</td>
                <td style={{ border: "1px solid black" }}>1</td>
                <td style={{ border: "1px solid black" }}>Splint</td>
                <td style={{ border: "1px solid black" }}></td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>104</td>
                <td style={{ border: "1px solid black" }}></td>
                <td style={{ border: "1px solid black" }}>Spiregrain</td>
                <td style={{ border: "1px solid black" }}></td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>105</td>
                <td style={{ border: "1px solid black" }}>2</td>
                <td style={{ border: "1px solid black" }}>Cutflower</td>
                <td style={{ border: "1px solid black" }}>3212</td>
                
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>106</td>
                <td style={{ border: "1px solid black" }}></td>
                <td style={{ border: "1px solid black" }}>Deadyawn</td>
                <td style={{ border: "1px solid black" }}></td>
                
              </tr>
            </table>
            <p>dept </p>
            <table
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <tr>
                <th style={{ border: "1px solid black" }}>id</th>
                <th style={{ border: "1px solid black" }}>name</th>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>1</td>
                <td style={{ border: "1px solid black" }}>Computing</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>2</td>
                <td style={{ border: "1px solid black" }}>Design</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>3</td>
                <td style={{ border: "1px solid black" }}>Engineering</td>
              </tr>
            </table>
            
          </div>
        )}
         {title === "selfjoinquiz" && (
          <div>
            <h3>Relationen</h3>
            <p>stops(<b>id</b>, name) </p>
            
            <p>route(<b>num</b>, <b>company</b>, <b>pos</b>, stop) </p>
            
            
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
