import { Box, CircularProgress, Typography } from "@mui/material";

const ProgressWithLabel = ({ value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
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
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressWithLabel;
