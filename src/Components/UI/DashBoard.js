import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from '../Redux/Reducers';
import { convertFileToBase64 } from "../../Utils/convertFileToBase64";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ExcelExport from "../ExcelExport";
import ImportExcel from "../ExcelImport";
const DashBoard = (props) => {
    const PagePath = [{ href: "/", title: 'Trang chủ' }];
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
    }, []);

    const [selectedImages, setSelectedImages] = useState(null);

    const handleImageChange = async (event) => {
        if (event.target.files.length > 0) {
            const images = await convertFileToBase64(event.target.files);
            setSelectedImages(images);
        }
    };


    const handleUpload = async () => {
        console.log(selectedImages);
    };

    const confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
        });
    };

    const sheet1 = {
        data: [['Name', 'Age', 'City'], ['John Doe', 25, 'New York'], ['Jane Doe', 30, 'San Francisco']],
    };

    const sheet2 = {
        data: [['Country', 'Population'], ['USA', 331000000], ['India', 1380004385]],
    };

    const schema = {
        "Mã nhân viên": {
            prop: 'UserName',
            type: Number,
            // required: true
        },
        "Tên nhân viên": {
            prop: 'FullName',
            type: String
        }
    };

    const checkFile = (data) => {
        let errors = [];
        data.map((item, index) => {
            if (item.UserName < 0) {
                errors.push({
                    error: 'Mã số nhân viên không được phép âm!',
                    row: index + 2,
                    column: 'Mã nhân viên'
                });
            }
        });

        return errors
    }

    return (
        <div>
            <input type="file" onChange={handleImageChange} multiple />
            {!!selectedImages && <img src={selectedImages[0].base64} alt="Preview" style={{ maxWidth: '100%' }} />}
            <button onClick={handleUpload}>Upload Ảnh</button>

            <Button onClick={confirm}>Confirm</Button>
            <ExcelExport sheets={[sheet1, sheet2]} />
            <ImportExcel
                schema={schema}
                // check={checkFile}
                rules={[
                    {
                        key: 'UserName',
                        value: ['<0', '>=100'],
                        column : 'Mã nhân viên'
                    }
                ]}
            />
            {contextHolder}
        </div>
    );
}
export default DashBoard;