import React, { useState } from 'react';
import {
  Container, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Box,
  TextField, Grid, Button,Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText
} from '@mui/material';

// Mock data
const sensingData = [
  { creator: 'dummy1', timestamp: 1677644867000, temperature: 25.5, approvals: 3, txId: 'tx123', chaincode: 'sensing' },
  { creator: 'dummy2', timestamp: 1677648867000, temperature: 26.2, approvals: 5, txId: 'tx124', chaincode: 'sensing' },
  { creator: 'dummy1', timestamp: 1677649867000, txId: 'tx125', chaincode: 'bscc', referenceTransaction: 'tx123'},
  // ... more sensing data
];

interface SensingDataItem {
  creator: string;
  timestamp: number;
  temperature?: number;
  approvals?: number;
  txId: string;
  chaincode: string;
  referenceTransaction?: string;
}

const filterData = (
  data: SensingDataItem[],
  startDate: string,
  endDate: string,
  approvalWindow: string | null,
  selectedCreators: string[]
): SensingDataItem[] => {  
  let filteredData = data;

  // Date and Time Filtering
  if (startDate || endDate) {
      let startTimestamp = startDate ? new Date(startDate).getTime() : Number.MIN_SAFE_INTEGER;
      let endTimestamp = endDate ? new Date(endDate).getTime() : Number.MAX_SAFE_INTEGER;

      if (startDate && !startDate.includes('T')) {
          startTimestamp = new Date(startDate).setHours(0, 0, 0, 0);
          endTimestamp = new Date(startDate).setHours(23, 59, 59, 999);
      }

      filteredData = filteredData.filter(data => data.timestamp >= startTimestamp && data.timestamp <= endTimestamp);
  }

  // Approval Window Filtering
  if (approvalWindow !== null) {
    const approvalWindowMillis = Number(approvalWindow);

    filteredData = filteredData.filter(data => {
          if (data.chaincode === 'bscc') return false; // Exclude approval transactions from the displayed data

          const approvalTransaction = sensingData.find(item => item.chaincode === 'bscc' && item.referenceTransaction === data.txId);
          if (!approvalTransaction) return false;

          const approvalTimeDifference = approvalTransaction.timestamp - data.timestamp;
          return approvalTimeDifference <= approvalWindowMillis;
      });
  }

  // Creator Filtering
  if (selectedCreators.length > 0) {
      filteredData = filteredData.filter(data => selectedCreators.includes(data.creator));
  }

  return filteredData;
}

interface CreatorFilterProps {
  selectedCreators: string[];
  setSelectedCreators: React.Dispatch<React.SetStateAction<string[]>>;
}

function CreatorFilter({ selectedCreators, setSelectedCreators }: CreatorFilterProps) {
  const uniqueCreators = Array.from(new Set(sensingData.map(data => data.creator)));

  return (
    <Grid item xs={10}>
      <FormControl fullWidth>
        <InputLabel>Filter by Creator</InputLabel>
        <Select
          multiple
          value={selectedCreators}
          onChange={(e) => setSelectedCreators(e.target.value as string[])}
          renderValue={(selected) => (selected as string[]).join(', ')}
          label="Filter by Creator"
        >
          {uniqueCreators.map((creator) => (
            <MenuItem key={creator} value={creator}>
              <Checkbox checked={selectedCreators.indexOf(creator) > -1} />
              <ListItemText primary={creator} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

function DateFilter({ startDate, setStartDate, endDate, setEndDate }: { startDate: string; setStartDate: React.Dispatch<React.SetStateAction<string>>; endDate: string; setEndDate: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <>
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
    </>
  );
}

function ResetButton({ resetFilters }: { resetFilters: () => void }) {
  return (
    <Grid item xs={2} container alignItems="center">
      <Button 
        variant="outlined" 
        onClick={resetFilters} 
        style={{ height: '100%', color: 'red', borderColor: 'red' }}>
        Reset
      </Button>
    </Grid>
  );
}


function ApprovalFilter({ approvalWindow, setApprovalWindow }: { approvalWindow: string | null; setApprovalWindow: React.Dispatch<React.SetStateAction<string | null>> }) {
  return (
    <Grid item xs={10}>
      <TextField
        label="Approval Window (ms)"
        type="number"
        value={approvalWindow}
        onChange={(e) => setApprovalWindow(e.target.value || null)}
        fullWidth
      />
    </Grid>
  );
}

function Dashboard() {
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Date & Time
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Approval Window
  const [approvalWindow, setApprovalWindow] = useState<string | null>(null);

  // Creators
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  // Reset filters
  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setApprovalWindow(null);
  };

  const filteredData = filterData(sensingData, startDate, endDate, approvalWindow, selectedCreators);

  return (
<    Container>
      <Box bgcolor="white" boxShadow={3} p={3} borderRadius={2} my={4}>
        <Grid container spacing={3}>
          <CreatorFilter selectedCreators={selectedCreators} setSelectedCreators={setSelectedCreators} />
        </Grid>

        <Grid container spacing={3} marginTop={0}>
          <DateFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          <ResetButton resetFilters={resetFilters} />
        </Grid>

        <Grid container spacing={3} marginTop={0}>
          <ApprovalFilter approvalWindow={approvalWindow} setApprovalWindow={setApprovalWindow} />
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Creator</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Approvals</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Chaincode</TableCell>
              <TableCell>Approved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
              <TableRow key={data.txId}>
                <TableCell>{data.creator}</TableCell>
                <TableCell>{new Date(data.timestamp).toLocaleString()}</TableCell>
                <TableCell>{data.temperature}°C</TableCell>
                <TableCell>{data.approvals}</TableCell>
                <TableCell>{data.txId}</TableCell>
                <TableCell>{data.chaincode}</TableCell>
                <TableCell>{data.referenceTransaction}</TableCell>
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
