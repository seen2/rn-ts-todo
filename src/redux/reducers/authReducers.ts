import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from "../../types/appTypes";

const initialState: IUser = {
  name: "",
  email: "",
  password: "",
  _id: "",
  loading: false,
  msg: "",
  statusCode: 0
}

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    nameChange: (state: IUser, action: PayloadAction<string>) => ({
      ...state, name: action.payload
    }),
    emailChange: (state: IUser, action: PayloadAction<string>) => ({
      ...state, email: action.payload
    }),
    passwordChange: (state: IUser, action) => ({
      ...state, password: action.payload
    }),
    setLoading: (state: IUser, action: PayloadAction<boolean>) => ({
      ...state, loading: action.payload
    }),
    setStatusCode: (state: IUser, action: PayloadAction<number>) => ({
      ...state, statusCode: action.payload
    }),
    setMsg: (state: IUser, action: PayloadAction<string>) => ({
      ...state, msg: action.payload
    }),
    login: (state: IUser, action: PayloadAction<IUser>) => {

      return { ...state, ...action.payload }

    },
    logout: (state: IUser, action: PayloadAction<any>) => ({ ...initialState })

  },



});



export const { nameChange, emailChange, passwordChange, login, logout, setLoading, setStatusCode, setMsg } = authSlice.actions;

export default authSlice.reducer;
