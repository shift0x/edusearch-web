import './App.css';

import ThemeOptions from './theme';
import { Container, CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';

const lightTheme = createTheme(ThemeOptions("light"))

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Container>
        <CssBaseline />
        <Container sx={{ pt: 20}}>
          <Outlet />
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
