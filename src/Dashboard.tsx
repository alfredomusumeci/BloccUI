import React, { useState } from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Box } from '@mui/material';

function Dashboard() {
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filters

  // Mock data
  const sensingData = [
    { timestamp: 1677644867000, temperature: 25.5, approvals: 3, txId: 'tx123' },
    { timestamp: 1677648867000, temperature: 26.2, approvals: 5, txId: 'tx124' },
    // ... more sensing data
  ];

  return (
      <Container>
        <Box bgcolor="white" boxShadow={3} p={3} borderRadius={2} my={4}>
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
              {sensingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
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
          count={sensingData.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Container>
  );
}

export default Dashboard;
