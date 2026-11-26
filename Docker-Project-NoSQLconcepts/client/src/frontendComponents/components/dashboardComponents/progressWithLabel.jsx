import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchTasksData } from "../../api/mainApi";
import LinearProgress from "@mui/material/LinearProgress";
const ProgressWithLabel = ({ area_id }) => {
  const [tasks, setTasks] = useState([]);
  const [progressValue, setProgressValue] = useState(0);


  useEffect(() => {
    async function loadTasks() {
      const tasksArray = await fetchTasksData(area_id);
      setTasks(tasksArray);
    }

    loadTasks();
  }, [area_id]);

 
  useEffect(() => {
    if (tasks.length === 0) {
      setProgressValue(0);
      return;
    }

    let isFinishedCounter = 0;

    tasks.forEach((task, index) => {
      const storageKey = `formdata_${area_id}_${index+1}`;
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.isFinished === true) {
          isFinishedCounter += 1;
        }
      }
    });

    const progress =
      (isFinishedCounter / tasks.length) * 100;

    setProgressValue(Math.round(progress));
  }, [tasks, area_id]);

  
  return (

<Box sx={{ width: "100%" }}>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 0.8,
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        fontWeight: 600,
        fontSize: 12,
      }}
    >
      Fortschritt
    </Typography>

    <Typography
      variant="caption"
      sx={{
        color: "primary.main",
        fontWeight: 700,
        fontSize: 12,
      }}
    >
      {`${Math.round(progressValue)}%`}
    </Typography>
  </Box>

  <LinearProgress
    variant="determinate"
    value={progressValue}
    sx={{
      height: 7,
      borderRadius: 10,
      backgroundColor: "action.disabledBackground",
          "& .MuiLinearProgress-bar": {
            borderRadius: 10,
            background:
              //"linear-gradient(90deg, #6385DF, #4969C8)",
              "linear-gradient(90deg, #10B981, #059669)",
            transition: "transform 0.4s ease",
      },
    }}
  />
</Box>

   /*  <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={progressValue}
        size={42}
        thickness={4}
        sx={{ color: "#fff" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "#fff", fontWeight: 700, fontSize: 12 }}
        >
          {`${Math.round(progressValue)}%`}
        </Typography>
      </Box>
    </Box> */
  );
};

export default ProgressWithLabel;

