import * as React from 'react';
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
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';

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

export default function SingleAnnouncements({issue}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let location=useLocation()

  return (
    <div style={{margin: '10%'}} alignitems="left">
    <Card sx={{ maxWidth: 600 }} style={{marginBottom: '10px'}}>
      <CardHeader 
        title={location.state.issue.announcementTitle} style={{color:"black"}}
      />
      <CardContent>
        <Typography  color="text.secondary">
        {location.state.issue.announcementDescription}        
        </Typography>
        <Typography style={{marginTop: '10px'}}>
          About Us:
          JPMC is a leading FinTech company dedicated to provide flexible banking services. With a commitment to innovation, excellence, and customer satisfaction, we have established ourselves as a key player in the industry.
        </Typography>
        <Typography style={{marginTop: '10px'}}>
          Job Title: SWE
          Job Description:
          In this role, you will have the opportunity to work on different domains and improve your skillset accordingly. You will be responsible for the project assigned for the duration, and will play a crucial role in helping the company to reach its goal.
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
