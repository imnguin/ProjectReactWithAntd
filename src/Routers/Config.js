import DashBoard from "../Components/UI/DashBoard";
import PageNotFound from "../Components/UI/PageNotFound";
import { routes as dec } from "../Views/Declarations";

const configRoute = [
    {
        path: '/',
        component: DashBoard,
        layout: 'Nguin'
    },
    ...dec,
    {
        path: '*',
        component: PageNotFound,
        layout: 'pagenotfound'
    },
]

export default configRoute;