import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from "../../../../Components/Redux/Reducers";
import { AddElementList, AddPagePath } from "../Constants";
import FormContainer from "../../../../Components/FormContainer";
import { _fetchData } from "../../../../Utils/CallAPI";
import { HOSTNAME } from "../../../../Utils/Constants/SystemVars";
import { Notification } from "../../../../Utils/Notification";
import { useNavigate } from "react-router-dom";

const Add = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(setBreadcrumb(AddPagePath));
    }, []);

    const onSubmit = async (MLObject) => {
        console.log('onSubmit', MLObject);
        MLObject.password  = '080104';
        const response = await dispatch(_fetchData(HOSTNAME, 'api/user/add', MLObject));
        if (!response.iserror) {
            navigate('/User');
        }else {
            Notification('Thông báo', response.message, 'error');
        }
    }

    return(
        <FormContainer
            title='Thêm mới nhân viên'
            backLink='/User'
            onSubmit={onSubmit}
            listColumn={AddElementList}
            dataSoure={{}}
            layout='horizontal' //default : vertical
        ></FormContainer>
    );
}
export default Add;