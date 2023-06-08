import axios from 'axios';

const API_URL = '';

const API_GMAIL = async (urlObject, payload, type) => {
    //console.log('api_gmail ttk to aa gaye');
    
    return await axios ({
        method :urlObject.method ,
        url : `${API_URL}/${urlObject.endpoint}/${type}`, 
        data : payload
    })
}

export default API_GMAIL;