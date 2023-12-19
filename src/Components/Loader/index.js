import React from "react";
import { useSelector } from "react-redux";
import { selectLoadding } from '../Redux/Reducers'
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
    const loaddingReducer = useSelector(selectLoadding) > 0;
    const [css, Setcss] = useState({
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#b5b4b4bd',
        height: '100vb',
        zIndex: 9999,
        textAlign: 'center'
    });

    useEffect(() => {
        if (!!loaddingReducer) {
            Setcss({
                ...css,
                display: 'flex'
            });
        }
        else {
            Setcss({
                ...css,
                display: 'none'
            });
        }
    }, [loaddingReducer]);

    return (
        <div style={css}>
            <div style={{ margin: 'auto' }}>
                <Spin/>
            </div>
        </div>
    );
}
export default Loader;