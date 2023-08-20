import React, { useState } from 'react';
import {
  Container, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Box,
  TextField, Grid, Button
} from '@mui/material';

function Dashboard() {
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Reset filters
  const resetDates = () => {
    setStartDate('');
    setEndDate('');
  };

  // Mock data
  const sensingData = [
    { timestamp: 1677644867000, temperature: 25.5, approvals: 3, txId: 'tx123' },
    { timestamp: 1677648867000, temperature: 26.2, approvals: 5, txId: 'tx124' },
    // ... more sensing data
  ];

  const handleFilter = () => {
    if (!startDate && !endDate) {
      return sensingData; // Return all data if no dates are set
    }

    let startTimestamp = startDate ? new Date(startDate).getTime() : Number.MIN_SAFE_INTEGER;
    let endTimestamp = endDate ? new Date(endDate).getTime() : Number.MAX_SAFE_INTEGER;

    if (startDate && !startDate.includes('T')) {
      startTimestamp = new Date(startDate).setHours(0, 0, 0, 0);
      endTimestamp = new Date(startDate).setHours(23, 59, 59, 999);
    }

    return sensingData.filter(data => data.timestamp >= startTimestamp && data.timestamp <= endTimestamp);
  };

  const filteredData = handleFilter();

  return (
<    Container>
      <Box bgcolor="white" boxShadow={3} p={3} borderRadius={2} my={4}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="End Date & Time"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={2} container alignItems="center">
            <Button 
              variant="outlined" 
              onClick={resetDates} 
              style={{ height: '100%', color: 'red', borderColor: 'red' }}>
              Reset
            </Button>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Approvals</TableCell>
              <TableCell>Transaction ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
              <TableRow key={data.txId}>
                <TableCell>{new Date(data.timestamp).toLocaleString()}</TableCell>
                <TableCell>{data.temperature}°C</TableCell>
                <TableCell>{data.approvals}</TableCell>
                <TableCell>{data.txId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
      />
    </Container>
  );
}

export default Dashboard;
