import React,{useEffect,useState} from 'react';
import List from '@mui/material/List';
import IssueCard from './IssueCard'; 
import Button from '@mui/material/Button';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const IssueYAList = () => {

  const [issues, setIssues] = useState([]); // Renamed `issue` to `issues` for clarity
  let navigate=useNavigate()

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:4000/api/v1/showAllIssuesById',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      setIssues(response.data.foundItems);
      } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <List>
        <Button onClick={()=>navigate('/addIssue')}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              style={{maxWidth: '200px', maxHeight: '50px', minWidth: '100px', minHeight: '100px'}}
            >
              Raise Query
            </Button>,

      {issues.map((issue, index) => (
        <IssueCard key={index} issue={issue} />
      ))}
    </List>
  );
};

export default IssueYAList;
