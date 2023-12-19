import { Col, Form, Select } from "antd";
import React, { useEffect, useState } from "react";

const SelectBox = (props) => {
    let {
        name,
        label,
        value,
        listOption,
        mode,
        isLoadData,
        index,
        url,
        keyCache,
        maxTagCount
    } = props;

    const [options, setOptions] = useState([]);
    const [initValue, setInitValue] = useState(mode == 'multiple' ? [-1] : -1);
    const [isRender, setIsrender] = useState(false);

    useEffect(() => {
        if (!!value) {
            setInitValue(value);
        }
    }, [value]);

    useEffect(() => {
        async function fetchData() {
            const response = await bindData();
            setOptions(response);
        }
        fetchData();
    }, [isLoadData, listOption, keyCache]);

    const bindData = async () => {
        setIsrender(false);
        let data = [{
            value: -1,
            label: '---Vui lòng chọn---',
            key: 1
        }];

        if (!!isLoadData) {
            if (!!url) {
                //chỗ này code để gọi api lấy dữ liệu nè mấy ba
                //ví dụ
                for (let i = 1; i < 10; i++) {
                    data.push({
                        value: i,
                        label: 'Dữ liệu từ api dòng ' + i
                    });
                }
            }
            else {
                //chỗ này code để gọi cache lấy dữ liệu nè mấy ba
                //ví dụ
                for (let i = 1; i < 10; i++) {
                    data.push({
                        value: i,
                        label: 'Dữ liệu từ cache dòng ' + i
                    });
                }
            }
        }
        else {
            if (listOption?.filter(x => x.value == -1).lenght > 0) {
                data = listOption;
            }
            else {
                data = data.concat(listOption);
            }
        }
        const result = renderOption(data);
        setIsrender(true);
        return result;
    }

    const renderOption = (list) => {
        return list.map((item, index) => {
            return <Select.Option value={item.value} key={index + 1}>{item.label}</Select.Option>
        });
    }

    return (
        isRender &&
        <Col xs={24} sm={6} lg={4} key={index}>
            <Form.Item
                name={name}
                label={label}
                initialValue={initValue}
            >
                <Select mode={mode} maxTagCount={maxTagCount}>{options}</Select>
            </Form.Item>
        </Col>
    );
}
export default SelectBox;