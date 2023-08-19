import React, { useState } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Box, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/lab';

function Dashboard() {
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filters
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Convert user input to Unix timestamps
  const convertToTimestamp = (date: Date | null, time: Date | null) => {
    if (date) {
      const combinedDateTime = new Date(date);
      if (time) {
        combinedDateTime.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
      }
      return combinedDateTime.getTime();
    }
    return null;
  };

  const startTimestamp = convertToTimestamp(startDate, startTime);
  const endTimestamp = convertToTimestamp(endDate, endTime);

  // Mock data
  const sensingData = [
    { timestamp: 1677644867000, temperature: 25.5, approvals: 3, txId: 'tx123' },
    { timestamp: 1677648867000, temperature: 26.2, approvals: 5, txId: 'tx124' },
    // ... more sensing data
  ];

  // Filter the sensing data based on the selected timestamp range
  const filteredData = sensingData.filter(data => {
    if (startTimestamp && endTimestamp) {
      return data.timestamp >= startTimestamp && data.timestamp <= endTimestamp;
    }
    return true; // If no timestamp range is selected, show all data
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Box bgcolor="white" boxShadow={3} p={3} borderRadius={2} my={4}>
          {/* Timestamp Input Fields */}
          <Box mb={3}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={setStartTime}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          </Box>

          <Box mb={3}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={setEndTime}
              renderInput={(params: any) => <TextField {...params} fullWidth />}
            />
          </Box>

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
    </LocalizationProvider>
  );
}

export default Dashboard;
