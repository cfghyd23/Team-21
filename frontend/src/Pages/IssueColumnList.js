import React from 'react';
import List from '@mui/material/List';
import IssueCard from './IssueCard'; // Assuming IssueCard component is imported and available

const IssueList = ({ issues }) => {
  return (
    <List>
      {issues.map((issue, index) => (
        
        <IssueCard key={index} issue={issue} />
      ))}
    </List>
  );
};

export default IssueList;
