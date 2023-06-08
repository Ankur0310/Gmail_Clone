export const API_URLS = {
    saveSentEmail : {
        endpoint:'save',
        method :'post'
    },
    getEmailFromType : {
        endpoint:'emails',
        method:'get'
    },
    saveDraftEmails : {
        endpoint :'save-draft',
        method:'post'
    },
    moveEmailsToBin: {
        endpoint:'bin',
        method:'post'
    },
    toggleStarredEmail:{
        endpoint:'starred',
        method:'post'
    },
    deleteEmail:{
        endpoint:'delete',
        method:'delete'
    }
}