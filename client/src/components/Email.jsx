import {Box, Typography, Checkbox, styled} from '@mui/material';
import {Star, StarBorder} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {routes} from '../routes/routes';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const Wrapper = styled(Box)(({
    padding :'0 0 0 10px',
    background:'#f2f6fc',
    cursor:'pointer',
    display:'flex',
    alignItems:'center',

    '& > div' : {
        display:'flex',
        width:'100%',
        '& > p' : {
            fontSize:14
        }
    }
}));

const Indicator = styled(Typography)({
    fontSize:'12px !important',
    background:'#ddd',
    color:'#222',
    padding:'0 4px',
    borderRadius:4,
    marginRight:6
});

const Date = styled(Typography)({
    marginLeft:'auto',
    marginRight:'20px',
    fontSize:'12',
    color:'#5f6368'
})

const Email = ({email, selectedEmails, setRefreshScreen, setSelectedEmails}) => {

    const navigate = useNavigate();

    const toggleStarredServices = useApi(API_URLS.toggleStarredEmail);

    const toggleStarredMails=() => {
        toggleStarredServices.call({id:email._id, value: !email.starred});
        setRefreshScreen(prev=> !prev);
    }

    const onValueChange= () => {
        if(selectedEmails.includes(email._id)){
            setSelectedEmails(prevState => prevState.filter(id =>id  !=email._id));
        }else{
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }

  return (
    <Wrapper>
        <Checkbox 
            size="small"
            checked={selectedEmails.includes(email._id)}
            onClick={()=> onValueChange()}
        />
        {
            email.starred?
            <Star fontSize='small' style={{marginRight:10, color:'#fff200'}} onClick={()=> toggleStarredMails()}/>
            :
            <StarBorder fontSize='small' style={{marginRight:10}} onClick={()=> toggleStarredMails()}/>
        }
        
        <Box onClick={ () => navigate(routes.view.path, {state: {email : email}})}>
            <Typography style={{width:200, overflow:'hidden'}}>{email.name}</Typography>
            <Indicator>Inbox</Indicator>
            <Typography>{email.subject} {email.body && '-'} {email.body}</Typography>
            <Date>
                {(new window.Date(email.date)).getDate()}
                {(new window.Date(email.date)).toLocaleString('default',{month:'long'})}
            </Date>
        </Box>
    </Wrapper>
  )
}

export default Email;