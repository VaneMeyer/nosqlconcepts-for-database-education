import React from "react";
import QuizTaskSheet from "./quizTaskSheet";
import { BBCquizQuestions, nestedselectquizQuestions, selectquizQuestions, sumandcountquizQuestions } from "../../data/tutorialData";

export const SelectQuizC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SELECT Quiz
      </h1>
      <QuizTaskSheet title="selectquiz" tasks={selectquizQuestions} />
    </div>
  );
};
export const BBCQuizC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        BBC Quiz
      </h1>
      <QuizTaskSheet title="bbcquiz" tasks={BBCquizQuestions} />
    </div>
  );
};
export const NestedSelectQuizC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Nested Select Quiz
      </h1>
      <QuizTaskSheet title="nestedselectquiz" tasks={nestedselectquizQuestions} />
    </div>
  );
};
export const SumAndCountQuizC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SUM and COUNT Quiz
      </h1>
      <QuizTaskSheet title="sumandcountquiz" tasks={sumandcountquizQuestions} />
    </div>
  );
};


