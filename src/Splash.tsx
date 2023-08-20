import React from 'react';
import {
  Box, Typography, Container, List, ListItem, Card, CardContent, Divider, IconButton
} from '@mui/material';
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet';
import NodeIcon from '@mui/icons-material/DeviceHub';
import CodeIcon from '@mui/icons-material/Code';
  
const mockData = {
  totalTransactions: 100,
  totalNodes: 5,
  totalChaincodes: 3,
  peerNames: [
    'peer0.org1.example.com', 
    'peer0.org2.example.com', 
    'peer0.org3.example.com',
    'peer0.org4.example.com',
    'peer0.org5.example.com',
    'peer0.org6.example.com',
    'peer0.org7.example.com',
    'peer0.org8.example.com',
    'peer0.org9.example.com',
    'peer0.org10.example.com',
    ],
  latestTransactions: ['tx123', 'tx124', 'tx125', 'tx126', 'tx127'],
};

const HomePage: React.FC = () => {
    return (
      <Container>
        <Box mt={4} mb={4}>
          <Typography variant="h4">BLOCC Explorer Overview</Typography>
        </Box>
  
        {/* Overview Card */}
        <Card elevation={3} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>General Overview</Typography>
            <Divider />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Box display="flex" flexDirection="column" alignItems="center" marginLeft={3}>
                <IconButton><TransactionIcon /></IconButton>
                <Typography variant="subtitle1">Total Transactions</Typography>
                <Typography>{mockData.totalTransactions}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <IconButton><NodeIcon /></IconButton>
                <Typography variant="subtitle1">Total Nodes (Peers)</Typography>
                <Typography>{mockData.totalNodes}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" marginRight={3}>
                <IconButton><CodeIcon /></IconButton>
                <Typography variant="subtitle1">Total Chaincodes</Typography>
                <Typography>{mockData.totalChaincodes}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
  
        {/* Peer Names Card */}
        <Card elevation={3} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Peer Names</Typography>
            <Divider />
            <List style={{ maxHeight: '150px', overflow: 'auto' }}>
              {mockData.peerNames.map((peer, index) => (
                <ListItem key={index} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'transparent' }}>
                  {peer}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
  
        {/* Latest Transactions Card */}
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Latest Transactions</Typography>
            <Divider />
            <List>
              {mockData.latestTransactions.map((tx, index) => (
                <ListItem key={index} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'transparent' }}>
                  {tx}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
    );
  };
  
  export default HomePage;