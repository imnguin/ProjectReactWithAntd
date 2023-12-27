import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../../../Components/Redux/Reducers";
import { AddElementList, EditPagePath } from "../Constants";
import FormContainer from "../../../../Components/FormContainer";
import { _fetchData } from "../../../../Utils/CallAPI";
import { HOSTNAME } from "../../../../Utils/Constants/SystemVars";
import { Notification } from "../../../../Utils/Notification";
import { useNavigate, useParams } from "react-router-dom";

const Edit = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({});
    const [isFinish, setIsFinish] = useState(false);

    useEffect(() => {
        dispatch(setBreadcrumb(EditPagePath));
        loadData();
    }, []);

    const loadData = async () => {
        setIsFinish(false);
        const response = await dispatch(_fetchData(HOSTNAME, 'api/user/load', {username : id}));
        if (!response.iserror) {
            setData(response?.resultObject);
            setIsFinish(true);
        } else {
            Notification('Thông báo', response.message, 'error');
        }
    }

    const onSubmit = async (MLObject) => {
        const response = await dispatch(_fetchData(HOSTNAME, 'api/user/update', MLObject));
        if (!response.iserror) {
            Notification('Thông báo', response.message, 'success');
            navigate('/User');
        } else {
            Notification('Thông báo', response.message, 'error');
        }
    }

    return (
        !!isFinish && <FormContainer
            title='Chỉnh sửa nhân viên'
            backLink='/User'
            onSubmit={onSubmit}
            listColumn={AddElementList}
            dataSoure={data}
            layout='horizontal'
        ></FormContainer>
    );
}
export default Edit;