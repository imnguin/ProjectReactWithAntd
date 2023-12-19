import {
    HomeOutlined,
    OrderedListOutlined
} from '@ant-design/icons';

const AppMenu = [
    {
        name : 'Home',
        icon :  HomeOutlined,
        label : 'Trang chủ',
        path : '/'
    },
    {
        name : 'Declaration',
        icon : OrderedListOutlined,
        label : 'Khai báo',
        path : '',
        subItem : [
            {
                name : 'User',
                label : 'Nhân viên',
                path : '/User',
                subItem : []
            },
        ]
    }
];

export default AppMenu;