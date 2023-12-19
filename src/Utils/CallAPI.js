import { hideLoading, setDataUser, showLoading } from '../Components/Redux/Reducers';
import { HOST_LIST } from "./Constants/SystemVars";
import { _fetchAPI } from "./FuncRequest";
import AsyncStorage from '@react-native-async-storage/async-storage';

const _fetchLogin = (hostName, apiPath, data) => async (dispatch, state) => {
    try {
        dispatch(showLoading());
        const apiResult = await _fetchAPI(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, data);
        dispatch(hideLoading());

        if(!apiResult.iserror)
        {
            AsyncStorage.setItem('logininfo', JSON.stringify(apiResult.resultObject));
            dispatch(setDataUser(apiResult.resultObject));
            return {
                ...apiResult,
                messaege : 'Đăng nhập thành công!',
            }
        }
        else
        {
            return apiResult;
        }
    } catch (error) {
        return {
            iserror: true,
            message: error.messaege,
            messagedetail: error,
            resultObject: null
        }
    }
}

const _fetchData = (hostName, apiPath, data, method = 'POST') => async (dispatch, state) => {
    try {
        const logininfo = JSON.parse(localStorage.getItem('logininfo'));
        const _header = {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'Access-Control-Allow-Origin': '*',
            "token": `Bearer ${logininfo.accessToken}`,
            'Content-Type' : 'application/json'
        };
    dispatch(showLoading());
    const apiResult = await _fetchAPI(`${HOST_LIST[hostName].hostBaseURL}${apiPath}`, data, _header);
    dispatch(hideLoading());
        return apiResult
        
    } catch (error) {
        return {
            iserror: true,
            message: error.messaege,
            messagedetail: error,
            resultObject: null
        }
    }
}

export {
    _fetchLogin,
    _fetchData
}