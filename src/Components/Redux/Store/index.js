import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "../Reducers";

const customMiddleWare = store => next => action => {
    next(action);
}

export const store = configureStore({ reducer: rootReducer ?? null, middleware: [thunk, customMiddleWare], })