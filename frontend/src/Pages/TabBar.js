import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IssueList from './IssueColumnList';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabBar() {
  const [issues, setIssues] = useState([]); // Renamed `issue` to `issues` for clarity

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:4000/api/v1/showIssue',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssues(response.data.foundItems);
      } catch (error) {
      console.log('Error:', error);
    }
  };
  

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let open=issues.filter((issue) => issue.status === "Open");
  let progress=issues.filter((issue) => issue.status === "inProgress");
  let closed=issues.filter((issue) => issue.status === "closed");
  
  return (
    <Box sx={{ bgcolor: 'background.paper', flexGrow: 1 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{ width: '100%' }}
        >
          <Tab label="Open" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Closed" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ width: '100%' }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <IssueList issues={open} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <IssueList issues={progress} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <IssueList issues={closed} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
