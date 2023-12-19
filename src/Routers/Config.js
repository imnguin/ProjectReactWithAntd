import DashBoard from "../Components/UI/DashBoard";
import PageNotFound from "../Components/UI/PageNotFound";
import { routes as dec } from "../Views/Declarations";
import { routes as major } from "../Views/Major"

const configRoute = [
    {
        path: '/',
        component: DashBoard,
        layout: 'Nguin'
    },
    ...dec,
    ...major,
    {
        path: '*',
        component: PageNotFound,
        layout: 'pagenotfound'
    },
]

export default configRoute;