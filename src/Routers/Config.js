import DashBoard from "../components/UI/DashBoard";
import PageNotFound from "../components/UI/PageNotFound";
import Chats from "../views/Chats";
import { routes as dec } from "../views/Declarations";
import { routes as major } from "../views/Major"

const configRoute = [
    {
        path: '/',
        component: DashBoard,
        layout: 'Nguin'
    },
    ...dec,
    ...major,
    {
        path: '/Chats',
        component: Chats,
        layout: 'notUse'
    },
    {
        path: '*',
        component: PageNotFound,
        layout: 'notUse'
    },
]

export default configRoute;