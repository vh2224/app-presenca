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

function registerPresence(dispatch) {
    return async (presenca, aluno, nome, matricula, senha) => {
        try{
            await api.put(`alunos/${aluno}/`, {
                nome: nome,
                matricula: matricula,
                senha: senha,
                presenca: presenca,
            });

        } catch(e){
            console.log(e);
        };
    };
}

function registerDiscipline(dispatch) {
    return async (disciplina, codigo, aluno) => {
        try{
            const data = await api.post('disciplinas/', {
                conteudos: [],
                nome: disciplina,
                codigo: codigo,
                aluno: [
                    aluno
                ]
            });

            if(data.status === 201) {
                return true;
            }
        } catch(e){
            console.log(e);
        };
    };
}

function registerStudent(dispatch) {
    return async (nome, matricula, senha) => {
        try{
            const data = await api.post('alunos/', {
                nome: nome,
                matricula: matricula,
                senha: senha,
            });
        } catch(e){
            console.log(e);
        };
    };
}

function registerContent(dispatch) {
    return async (conteudo, link, disciplina) => {
        console.log(conteudo, link, disciplina)
        try{
            const data = await api.post('conteudos/', {
                nome: conteudo,
                link_github: link,
                disciplina: disciplina,
            });
            console.log(data.data);
        } catch(e){
            console.log(e);
        };
    };
}

export const { Context, UserProvider } = createContext(
    reducer, 
    {teste, loginUser, registerPresence, registerDiscipline, registerStudent, registerContent}, 
    initialState
);