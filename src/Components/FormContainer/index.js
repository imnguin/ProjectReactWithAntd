import { Button, Checkbox, Col, Divider, Form, Grid, Row, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextBox from '../FormCotrol/TextBox';
import SelectBox from "../FormCotrol/SelectBox";
import TextArea from "../FormCotrol/TextArea";
import StyleDefault from "../FormCotrol/StyleDefault";
const{useBreakpoint} = Grid;

const FormContainer = (props) => {
    let {
        title,
        listColumn,
        layout,
        onCloseModal,
        backLink,
        onSubmit,
        dataSoure
    } = props;

    const navigate = useNavigate();
    const [Items, setItems] = useState([]);
    const screen = useBreakpoint();
    const islg = screen.lg;
    const [formLayout , SetLayout] = useState(!!layout? layout : 'vertical');

    useEffect(() => {if(islg){if(!!layout){SetLayout(layout);}else{SetLayout('vertical');}}else{SetLayout('vertical');}}, [islg]);
    
    useEffect(() => {
        const items = renderControl();
        setItems(items);
    }, [listColumn]);

    const renderControl = () => {
        const children = listColumn?.map((elm, index) => {
            let value = dataSoure?.[elm.name];
            switch(elm.type){
                case 'textbox': 
                    return (
                        <TextBox 
                            {...elm} 
                            index={index} 
                            key={index} 
                            value={value}
                        />
                    );
                case 'select':
                    return (
                        <SelectBox 
                            {...elm} 
                            key={index}
                            index={index} 
                            value={value}
                            mode={elm.mode}
                        />
                    );
                case 'textarea':
                    return (
                        <TextArea 
                            {...elm} 
                            key={index} 
                            index={index} 
                            value={value}
                        />
                    );
                case 'checkbox':
                    return <Col xs={24} sm={!!elm.span? elm.span : 12} key={index}>
                        <Form.Item name={elm.name} valuePropName="checked" initialValue={value !== undefined? value : false}>
                            <Checkbox>{elm.label}</Checkbox>
                        </Form.Item>
                    </Col>
                default : return ""
            }
        });
        return children;
    }
    const eventBackLink = () =>{
        if(!!onCloseModal)
        {
            onCloseModal?.();
        }
        else
        {
            navigate(backLink);
        }
    }

    const onFinish = (values) => {
        onSubmit?.(values);
    }

    return (
        <>
            {!!title && <Divider style={{marginBottom : 40}}>{title}</Divider>}
            <Form layout={formLayout} onFinish={onFinish} name='s_form' >
                <Row gutter={24}>{Items}</Row>
                <div style={{ textAlign: 'right',}}>
                    <Space size="small">
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                        <Button onClick={() => {eventBackLink()}}>Quay lại</Button>
                    </Space>
                </div>
            </Form>{!!props.children && <><Divider></Divider>{props.children}</>}
        </>
    );
}
export default FormContainer;