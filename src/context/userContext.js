import AsyncStorage from '@react-native-async-storage/async-storage';
import createContext from './createContext';


import api from '../services/api';

const initialState = {};

function reducer (state, action) {
    switch(action.type){
        default:
            return state;
    };
};

function teste (dispatch) {
    return (args) => {
        console.log(args);
    };
};

function returnHome(data) {
    console.log(data);
    return data;
};

function loginUser (dispatch) {
    return async (matricula, senha) => {
        try{
            const data = await api.post('/api/login', {
                matricula: matricula,
                senha: senha
            });

            await AsyncStorage.setItem("id", data.data.jwt);

        } catch(e){
            console.log(e);
        };
    };
};

export const { Context, UserProvider } = createContext(
    reducer, 
    {teste, loginUser}, 
    initialState
);