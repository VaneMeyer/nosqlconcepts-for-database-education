import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { fetchTasksData } from "../../api/mainApi.js";

export default function CircularProgressC({ areaId }) {
  const [tasksArray, setTasksArray] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);

  // 🔹 Tasks laden
  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasksData(areaId);
        setTasksArray(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasksArray([]);
      }
    };

    if (areaId) {
      getTasks();
    }
  }, [areaId]);

  // 🔹 Progress aus LocalStorage berechnen
  useEffect(() => {
    if (tasksArray.length === 0) {
      setFinishedCount(0);
      return;
    }

    let finished = 0;

    tasksArray.forEach((task) => {
      const taskNumber = task.statementId ?? task.id ?? task.taskNumber;
      if (!taskNumber) return;

      const stored = localStorage.getItem(`formData_${taskNumber}`);
      if (!stored) return;

      try {
        const parsed = JSON.parse(stored);
        if (parsed.isFinished === true) {
          finished += 1;
        }
      } catch {
        // ignore broken entries
      }
    });

    setFinishedCount(finished);
  }, [tasksArray]);

  // 🔹 Prozentwert
  const percentValue = useMemo(() => {
    if (tasksArray.length === 0) return 0;
    return Math.round((finishedCount / tasksArray.length) * 100);
  }, [finishedCount, tasksArray.length]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={95}
        /* value={percentValue} */
        size={48}
        thickness={5}
        sx={{
          color: "rgba(238, 222, 222, 0.67)",
          backgroundColor: "rgba(239, 248, 242, 0.07)",
          borderRadius: "50%",
          p: 0.5,
        }}
      />
      <Typography
        variant="caption"
        component="div"
        color="white"
        sx={{ mt: 0.5, fontWeight: "bold" }}
      >
        95%
       {/*  {percentValue}% */}
      </Typography>
    </Box>
  );
}
