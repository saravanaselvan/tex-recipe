import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import HomePage from './pages/HomePage';
import { ChemicalProvider } from './context/ChemicalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ChemicalProvider>
        <HomePage />
      </ChemicalProvider>
    </MantineProvider>
  </React.StrictMode>
);
