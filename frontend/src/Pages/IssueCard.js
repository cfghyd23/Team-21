import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function IssueCard({issue}) {

  const [status, setStatus] = useState(issue.status);
  let navigate=useNavigate()

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    // Perform action with the updated status, such as making an API call
    console.log('Updated status:', status);
  };


  return (
    <Card sx={{ flexGrow: 1, m: 5 }} onClick={()=>navigate('/editIssue',{ state: { issue } })}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {issue.issueTitle}
        </Typography>
        
        <Stack direction="row" spacing={1}>
      <Chip label={issue.category} />
      <Chip label={issue.status} variant="outlined" />
    </Stack>
    <Typography gutterBottom variant="h5" component="div">
          {issue.issueDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
