
import { Toolbar, Typography } from '@mui/material';

const GreetingHeader = () => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Hello';
  } else {
    greeting = 'Good evening';
  }

  return (
  
      <Toolbar>
        <Typography variant="h6">
          {`${greeting}!`}
        </Typography>
      </Toolbar>
    
  );
};

export default GreetingHeader;