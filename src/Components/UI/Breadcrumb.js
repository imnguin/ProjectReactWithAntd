import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb as BreadcrumbAntd, Row, theme } from 'antd';

const Breadcrumb = (props) => {
    const breadcrumb = useSelector(state => state.breadcrumb);
    const [pagePath, setPagePath] = useState(breadcrumb);
    const {token: { colorBgContainer },} = theme.useToken();
    useEffect(() => {
        setPagePath(breadcrumb)
    }, [breadcrumb])

    return (
        <div style={{padding: '5px 0 8px 24px',overflow: 'initial',margin: '0 0 8px',background: colorBgContainer,borderRadius: 7,fontWeight: 500}}>
            <BreadcrumbAntd items={!pagePath || pagePath.length < 2 ? [{ title: 'Trang chủ' }] : pagePath} />
        </div>
    );
}
export default Breadcrumb;