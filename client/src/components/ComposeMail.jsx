import { useState } from 'react';
import {Dialog, Box,Typography, styled, InputBase,TextField,Button} from '@mui/material';
import{Close, DeleteOutlined} from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle = {
        height:'90%',
        width:'80%',
        maxWidth:'100%',
        maxHeight:'100%',
        boxShadow:'none', 
        borderRadius:'10px 10px 0 0'
};

const Header = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    background:'#f2f6fc',
    '& > p': {
        fontSize:14,
        fontWeight:500
    }
});

const Footer =styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px'

})

const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '& > div': {
        fontSize:14,
        borderBottom: '1px solid #f5f5f5',
        marginTop:10
    }
});

const SendButton = styled(Button)({
    background:'#0b57d0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100
})

const ComposeMail = ({openDialog, setOpenDialog}) => {

    const [data, setData ] = useState({});
    const sentEmailServies = useApi(API_URLS.saveSentEmail);
    const saveDraftServices = useApi(API_URLS.saveDraftEmails);

    const config ={
            Host : "smtp.elasticemail.com",
            Username : 'ankur5125222@gmail.com',
            Password : '2FBE920EF40C130353F3FEE97AE2D201A356',
            Port :2525,  
    }

    const closeComposeMail =(e) => {
        e.preventDefault();

        const payload = {
            to :data.to,
            from : 'ankurknp0310@gmail.com',
            subject : data.subject,
            body : data.body,
            date : new Date(),
            image :'',
            name :'Ankur Gautam',
            starred : false,
            type :'drafts' 
        }

        saveDraftServices.call(payload);

        if(!saveDraftServices.error){
            setOpenDialog(false);
            setData({});
        }
        else
        {
            
            console.log(saveDraftServices.error);
        }

        setOpenDialog(false);
    }

    const sendMail =(e)=>{
        e.preventDefault();

        if(window.Email)
        {
            window.Email.send({
                ...config,
                To : data.to,
                From : "ankurknp0310@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
              message => alert(message)
            );
        }
         
        const payload = {
            to :data.to,
            from : 'ankurknp0310@gmail.com',
            subject : data.subject,
            body : data.body,
            date : new Date(),
            image :'',
            name :'Ankur Gautam',
            starred : false,
            type :'sent' 
        }

        sentEmailServies.call(payload);

        if(!sentEmailServies.error){
            setOpenDialog(false);
            setData({});
        }
        else
        {
            
            console.log(sentEmailServies.error);
        }

        setOpenDialog(false);
    }

    const onValueChange= (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
    }

  return (
        <Dialog
            open={openDialog}
            PaperProps={{sx: dialogStyle}}
        >
           <Header>
                <Typography>New Message</Typography>
                <Close fontSize='small' onClick={(e)=>closeComposeMail(e)}/>
           </Header>
           <RecipientsWrapper>
                <InputBase placeholder='Recipients' name='to' onChange={(e) => onValueChange(e)}/>
                <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChange(e)}/>
           </RecipientsWrapper>
           <TextField
            multiline
            rows={25}
            sx={{'& .MuiOutlinedInput-notchedOutline' : {border:'none'}}}
            name='body'
            onChange={(e) => onValueChange(e)}
           />
            <Footer>
                <SendButton onClick={(e)=> sendMail(e)}>Send</SendButton>
                <DeleteOutlined onClick={()=> setOpenDialog(false)}/>
            </Footer>
        </Dialog>
  )
}

export default ComposeMail;