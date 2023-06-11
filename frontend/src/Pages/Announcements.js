import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MDBBadge } from 'mdb-react-ui-kit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Announcements() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [issues, setIssues] = useState([]); // Renamed `issue` to `issues` for clarity

  useEffect(() => {
    getIssues();
  }, []);

  let navigate=useNavigate()

  const getIssues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:4000/api/v1/showAnnouncement',
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

  return (
    <div style={{margin: '5%'}} alignitems="left">
      <h1>Announcements</h1>
    {issues.map((issue, index) => (
        <Card key={index} sx={{ maxWidth: 345 }} style={{marginBottom: '10px'}} onClick={()=>navigate('/singleAnnouncement',{state:{issue}})}>
      <CardHeader 
        title={issue.announcementTitle} style={{color:"black"}}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {issue.announcementDescription}        
        </Typography>
      </CardContent>
    </Card>
      ))}
    </div>
  );
}
