import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    user: UserType | null
}

export interface IUserUpdate {
    user: UserType | null
}

export interface UserType {
    id: string;
    firstName:string;
    lastName:string;
    username:string;   
}

const initialState: IUser = {
    user: null,
};

type GetLabelsAction = PayloadAction<IUser>;
type GetUpdateAction = PayloadAction<IUserUpdate>;


const reducers = {
    login: (state: IUser, action: GetLabelsAction) => {
        state.user = action.payload.user;
    },
    updateUser: (state: IUser, action: GetUpdateAction) => {
        state.user = action.payload.user;
    },
    Logout: (state: IUser) => {
        state.user = null;
    }
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers
});

export const { login, Logout, updateUser } = UserSlice.actions;

export default UserSlice;
