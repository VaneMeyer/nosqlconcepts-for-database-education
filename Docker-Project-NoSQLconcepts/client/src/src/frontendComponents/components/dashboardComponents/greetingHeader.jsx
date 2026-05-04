import { Toolbar, Typography } from '@mui/material';
import { useMemo } from 'react';

const GreetingHeader = () => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Guten Morgen ☀️';
    if (hour < 18) return 'Guten Tag 👋';
    return 'Guten Abend 🌙';
  }, []);

  return (
    <Toolbar
      sx={{
        minHeight: 64,
        px: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{
          letterSpacing: 0.3,
        }}
      >
        {greeting}
      </Typography>
    </Toolbar>
  );
};

export default GreetingHeader;
