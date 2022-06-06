import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Login from './pages/Login';
import Alunos from './pages/Alunos';
import Conteudo from './pages/Conteudo';
import CadastroDisciplina from './pages/CadastroDisciplina';
import CadastroAluno from './pages/CadastroAluno';
import HomeAluno from './pages/HomeAluno';
import PerfilAluno from './pages/PerfilAluno';
import PerfilProfessor from './pages/PerfilProfessor';
import AuthToken from './pages/AuthToken';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name="AuthToken"
            component={AuthToken}
            />
            <Stack.Screen 
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="Home"
            component={Home}
            />
            <Stack.Screen 
            name="Alunos"
            component={Alunos}
            />
            <Stack.Screen 
            name="Conteudo"
            component={Conteudo}
            />
            <Stack.Screen 
            name="CadastroDisciplina"
            component={CadastroDisciplina}
            />
            <Stack.Screen 
            name="CadastroAluno"
            component={CadastroAluno}
            />
            <Stack.Screen 
            name="HomeAluno"
            component={HomeAluno}
            />
            <Stack.Screen 
            name="PerfilAluno"
            component={PerfilAluno}
            />
            <Stack.Screen 
            name="PerfilProfessor"
            component={PerfilProfessor}
            />
        </Stack.Navigator>
    )
}

export default Routes;