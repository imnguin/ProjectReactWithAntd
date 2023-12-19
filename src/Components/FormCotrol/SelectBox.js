import { Col, Form, Select } from "antd";
import { useEffect, useState } from "react";

const SelectBox = (props) => {
    const {
        colSpan,
        label,
        name,
        value,
        disabled,
        labelCol,
        labelAlign,
        index,
        listOptions,
        isCahce,
        url,
        keyCache,
        mode
    } = props;

    const [values, setValue] = useState([]);
    const [options, SetOptions] = useState([]);
    const [initValue, setInitValue] = useState([-1]);
    const selectProps = {
        style: {
          width: '100%',
        },
        value : values,
        options,
        onChange: (newValue) => {
          setValue(newValue);
        },
        placeholder: 'Vui lòng chọn...',
        maxTagCount: 'responsive',
        disabled
    };

    useEffect(() => {
        if(!!value)
        {
            if(!!mode)
            {
                setInitValue([value]);
            }
            else
            {
                setInitValue(value);
            }
        }
        else
        {
            if(!!mode)
            {
                setInitValue([-1]);
            }
            else
            {
                setInitValue(-1);
            }
        }
        renderOption();
    }, []);

    const renderOption = () => {
        if(!!isCahce)
        {
            let data = [
                {
                    label : 'data từ cache',
                    value : 'cache'
                }
            ];
            SetOptions(binData(data))
        }
        else if(!isCahce && !!url)
        {
            let data = [
                {
                    label : 'data từ api',
                    value : 'api'
                }
            ];

            SetOptions(binData(data))
        }
        else
        {
            SetOptions(binData(!!listOptions ? listOptions : []));
        }
    }

    const binData = (data) => {
        const list = [
            {
                value : -1,
                label : 'Vui lòng chọn'
            }
        ];
        data?.forEach(element => {
            let check = list.find(x => x.value === element.value);
            if(!check)
            {
                list.push(element);
            }
        });
        return list;
    }

    return (
        <Col key={`${name}-${index}`} xs={24} sm={!!colSpan ? colSpan : 12}>
            <Form.Item label={label} name={name} initialValue={initValue} labelCol={{ span: !!labelCol ? labelCol : 6 }} labelAlign={!!labelAlign? labelAlign : 'left'}>
                <Select {...selectProps} mode={mode}/>
            </Form.Item>
        </Col>
    );
}
export default SelectBox;