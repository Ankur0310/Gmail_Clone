import {lazy} from 'react';

const Main = lazy(() => import('../pages/Main'));
const Emails = lazy(() => import('../components/Emails'));
const ViewMail = lazy(()=>import ('../components/ViewEmail'));
const routes = {
    main: {
        path: '/',
        element:Main
    },
    emails : {
        path:'/emails',
        element:Emails
    },
    view : {
        path :'/view',
        element:ViewMail
    },
    invalid :{
        path:'/*',
        element:Emails
    }
}

export {routes};
