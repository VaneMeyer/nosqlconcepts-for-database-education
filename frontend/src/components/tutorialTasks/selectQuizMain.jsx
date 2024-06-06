import React from "react";
import QuizTaskSheet from "./quizTaskSheet";
import { BBCquizQuestions, joinquiz2Questions, joinquizQuestions, nestedselectquizQuestions, selectquizQuestions, sumandcountquizQuestions, usingnullquizQuestions } from "../../data/tutorialData";

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
export const JoinQuizC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Join Quiz
      </h1>
      <QuizTaskSheet title="joinquiz" tasks={joinquizQuestions} />
    </div>
  );
};
export const JoinQuiz2C = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Join Quiz 2
      </h1>
      <QuizTaskSheet title="joinquiz2" tasks={joinquiz2Questions} />
    </div>
  );
};
export const UsingNullQuizC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Using Null Quiz
      </h1>
      <QuizTaskSheet title="usingnullquiz" tasks={usingnullquizQuestions} />
    </div>
  );
};


