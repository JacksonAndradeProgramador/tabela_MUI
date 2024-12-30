import { Router } from 'src/routes/sections';

import { ThemeProvider } from 'src/theme/theme-provider';

import './global.css'

// ----------------------------------------------------------------------

export default function App() {
 

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}