import { Button, Col, DatePicker, Form, Input, Row, Grid } from 'antd';
import React, { useState } from "react";
import { useEffect } from 'react';
import SelectBox from '../SearchControl/SelectBox';
import TextBox from '../SearchControl/TextBox';
const { useBreakpoint } = Grid;
const SearchForm = (props) => {
    let {
        layout,
        listColumn,
        onSubmit
    } = props;
    
    const [Items, setItems] = useState([]);
    const [form] = Form.useForm();
    const [IsShow, SetIsShow] = useState(false);
    const [cssBtnSubmit, setcssBtnSubmit] = useState({ marginTop: 0, float: 'left' });
    const isMobile = useBreakpoint().xs;

    useEffect(() => {
        const items = elementSearch();
        setItems(items);
        SetIsShow(true);
    }, [listColumn]);

    useEffect(() => {
        if (!!isMobile) {
            setcssBtnSubmit({
                ...cssBtnSubmit,
                marginTop: 0
            });
        }
        else {
            setcssBtnSubmit({
                ...cssBtnSubmit,
                marginTop: layout === 'vertical' ? 30 : 0
            });
        }
    }, [isMobile, layout]);

    const elementSearch = () => {
        const children = listColumn?.map((item, index) => {
            switch (item.type) {
                case 'SelectBox':
                    return <SelectBox {...item} key={index} index={index}/>
                case 'TextBox':
                    return <TextBox {...item} key={index} index={index}/>
                case 'date':
                    return <Col key={index}>
                        <Form.Item name={item.name} label={item.label} rules={item.rules}>
                            <DatePicker placement={!!item.placement ? item.placement : 'topLeft'} />
                        </Form.Item>
                    </Col>
                default:
                    return <>
                    </>
            }
        });

        return children;
    }

    const onFinish = (values) => {
        onSubmit?.(values);
    };

    return (
        IsShow &&
        <Form form={form} layout={layout} name='search_form' onFinish={onFinish}>
            <Row gutter={24}>
                {Items}
                <Col xs={4}>
                    <Form.Item style={cssBtnSubmit}>
                        <Button type="primary" htmlType="submit">Tìm</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
export default SearchForm;