import React from "react";
import WorldTaskSheet from "./worldTaskSheet";
import { basicsTasks } from "../../data/tutorialData";
import { namesTasks } from "../../data/tutorialData";
import { selectfromworldTasks } from "../../data/tutorialData";
import { selectwithinselectTasks } from "../../data/tutorialData";
import { sumandcountTasks } from "../../data/tutorialData";

export const BasicsC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SELECT basics
      </h1>
      <WorldTaskSheet title="basics" tasks={basicsTasks}/>
    </div>
  );
};

export const NamesC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SELECT names
      </h1>
      <WorldTaskSheet title="names" tasks={namesTasks} />
    </div>
  );
};
export const SelectFromWorldC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SELECT from world
      </h1>
      <WorldTaskSheet title="selectfromworld" tasks={selectfromworldTasks}/>
    </div>
  );
};
export const SelectWithinSelectC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SELECT within SELECT
      </h1>
      <WorldTaskSheet title="selectwithinselect" tasks={selectwithinselectTasks} />
    </div>
  );
};
export const SumAndCountC = () => {
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SUM and COUNT
      </h1>
      <WorldTaskSheet title="sumandcount" tasks={sumandcountTasks} />
    </div>
  );
};

