import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Container, Box } from '@mui/material';

type ApprovedTempReading = {
    timestamp: number;
    temperature: number;
    approvals: number;
    txId: string;
  };

  
const mockTempReadings: ApprovedTempReading[] = [
    { timestamp: 1629456000000, temperature: 22.5, approvals: 5, txId: 'tx123' },
    { timestamp: 1629542400000, temperature: 23.1, approvals: 7, txId: 'tx124' },
    { timestamp: 1629628800000, temperature: 24.2, approvals: 6, txId: 'tx125' },
    { timestamp: 1629715200000, temperature: 23.8, approvals: 8, txId: 'tx126' },
    { timestamp: 1629801600000, temperature: 22.9, approvals: 5, txId: 'tx127' },
];

const Linechart: React.FC = () => {
    return (
        <Container>
            <Box bgcolor="white" boxShadow={3} p={3} borderRadius={2} my={4}>
                <LineChart
                    height={600}
                    xAxis={[
                        {
                            dataKey: 'timestamp',
                            valueFormatter: (v: number) => new Date(v).toLocaleDateString('en-UK', { month: 'short', day: 'numeric' }),
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'temperature',
                            label: 'Temperature (°C)',
                            color: 'blue',
                        },
                    ]}
                    dataset={mockTempReadings}
                />
            </Box>
        </Container>
    );
};

  
export default Linechart;