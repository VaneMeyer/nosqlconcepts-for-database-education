
import { Box, Typography, Paper} from '@mui/material';

function NewInformationC() {
  return (
    <Box component="section" sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          NoSQLconcepts Project Information
        </Typography>
        <Typography variant="body1" paragraph>
          This React application is being developed as part of the DigiTeLL project "NoSQLconcepts". 
          Currently, this is a work in progress. If you encounter any issues, please feel free to report them to <b>v.meyer@em.uni-frankfurt.de</b>.
        </Typography>
       
      </Paper>
    </Box>
  );
};


export default NewInformationC;
