import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { alpha } from '@mui/system';

// ----------------------------------------------------------------------

export const UserPage = lazy(() => import('src/pages/user'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
  <LinearProgress
    sx={{
      width: 300,
      maxWidth: 320,
      bgcolor: (theme) => alpha(theme.palette.text.primary, 0.16),
      [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
    }}
  />
</Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
       
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
     
      ),
      children: [
       
        { path: '/', element: <UserPage /> },
      
       
      ],
    },
    
   
  ]);
}
