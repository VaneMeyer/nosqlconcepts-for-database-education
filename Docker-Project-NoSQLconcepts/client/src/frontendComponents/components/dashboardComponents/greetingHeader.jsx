
import { Toolbar, Typography } from '@mui/material';

const GreetingHeader = () => {
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = 'Guten Morgen';
  } else if (currentHour < 18) {
    greeting = 'Guten Tag';
  } else {
    greeting = 'Guten Abend';
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