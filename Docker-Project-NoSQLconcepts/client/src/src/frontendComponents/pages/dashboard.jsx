
import { Box } from "@mui/material";
import CardContainer from "../components/dashboardComponents/cardContainer";
import GreetingHeader from "../components/dashboardComponents/greetingHeader";
import Grid from "@mui/material/Grid";



const NewDashboard = () => {
  
  return (
    <Box>
      <GreetingHeader />
      <CardContainer />
      <Box sx={{ flexGrow: 1, p:2 }}>
        <Grid container spacing={2}>
         
          


        </Grid>
      </Box>
    </Box>
  );
};



export default NewDashboard;
