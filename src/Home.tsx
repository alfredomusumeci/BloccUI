import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import Linechart from './Linechart';
import Dashboard from './Dashboard';
import HomePage from './Splash';

const Home: React.FC = () => {
  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              BLOCC Explorer
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/linechart">
              Linechart
            </Button>
          </Toolbar>
        </AppBar>

        <Box flexGrow={1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/linechart" element={<Linechart />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default Home;
