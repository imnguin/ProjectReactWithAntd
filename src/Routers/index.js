import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import UI from '../components/UI/Ui';
import Authen from './CheckAuthen';

const Router = (props) => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login/>}></Route>
                {/* <Route path='*' element={<Authen><UI/></Authen>}></Route> */}
                <Route path='*' element={<UI/>}></Route>
            </Routes>
        </>
    );
}
export default Router;