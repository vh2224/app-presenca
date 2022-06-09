import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Disciplina from '../../components/Disciplina';
import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import { BlurView } from 'expo-blur';

import api from '../../services/api';


export default function Home() {

    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [authTokenProfessor, setAuthTokenProfessor] = useState(false);
    const [disciplinas, setDisciplinas] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [handleLogin, setHandleLogin] = useState(false);

    useEffect(() =>{
        const signToken = async () => {
            const id = await AsyncStorage.getItem("id");
            if (id) {
                try {
                    await api.get('/api/professor', {
                        headers: { 'Authorization': `Bearer ${id}`}
                    });
                    setAuthTokenProfessor(true);
                    const disciplina = await api.get('/disciplinas',{
                        headers: { 'Authorization': `Bearer ${id}`}})
                    setDisciplinas(disciplina.data);
                } catch (e) {
                    navigation.navigate('Login');
                }
            } else {
                navigation.navigate('Login');
            }
        }
        signToken()
    }, [])

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        })();
    });

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    function biometriaPerfil() {
        setHandleLogin(true);
        verifyUserAuthentication();
    }

    async function verifyUserAuthentication(){
        if(handleLogin){
            const authentication = await LocalAuthentication.authenticateAsync();
            if (authentication.success){
                navigation.navigate('PerfilProfessor');
                setHandleLogin(false)
            }
        }
    }

    function agradecimentos() {
        setVisibleModal(true)
    }


    if(authTokenProfessor){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image 
                        source={require('../../assets/logoLogin.png')}
                        style={styles.image}
                    />
                </View>
    
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
    
    
                    <View style={styles.buttonsCadastro}>
                        <Text style={styles.textCadastro}>Perfil</Text>
    
                        <TouchableOpacity style={styles.buttonConteudo} onPress={() => biometriaPerfil()}>
                            <Text style={styles.buttonText}>
                            Ver Perfil
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonConteudo}>
                            <Text style={styles.buttonText}>
                            Sair
                            </Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={styles.buttonsCadastro}>
                        <Text style={styles.textCadastro}>Cadastros</Text>
    
                        <TouchableOpacity style={styles.buttonConteudo} onPress={() => navigation.navigate('CadastroDisciplina')}>
                            <Text style={styles.buttonText}>
                            Cadastrar Disciplina
                            </Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity style={styles.buttonConteudo} onPress={() => navigation.navigate('CadastroAluno')}>
                            <Text style={styles.buttonText}>
                            Cadastrar Aluno
                            </Text>
                        </TouchableOpacity>
                    </View>
    
                    
    
                    <Text style={styles.text}>Disciplinas ministradas</Text>
    
                    <View style={styles.containerDisciplina}>
                        {disciplinas && disciplinas.map((disciplina, index) => {
                            return (
                                <Disciplina data ={disciplina} key={index}/>
                            )
                        })}
                    </View>

                    <TouchableOpacity style={styles.buttonConteudo} onPress={() => agradecimentos()}>
                        <Text style={styles.buttonText}>Agradecimentos</Text>
                    </TouchableOpacity>

                    <Modal transparent={true} visible={visibleModal}>
                        <BlurView style={styles.blur}>
                            <View style={styles.modal}>
                                <Text style={styles.nome1}>PEDRO HENRIQUE VASCONCELOS</Text>
                                <Text style={styles.matricula}>201911133</Text>

                                <Text style={styles.nome}>DAVI BERNARDO</Text>
                                <Text style={styles.matricula}>201910960</Text>

                                <Text style={styles.nome}>VINICIUS ALMEIDA</Text>
                                <Text style={styles.matricula}>201911133</Text>

                                <TouchableOpacity style={styles.buttonModal} onPress={() => setVisibleModal(false)}>
                                    <Text style={styles.buttonText}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </BlurView>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView>
                <Text> Erro </Text>
            </SafeAreaView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF'
    },
    header: {
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#781e20'
    },
    image: {
        width: 200,
        height: 200
    },
    textContainer: {
        flexDirection: 'row',
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
    text: {
        fontSize: 26,
        marginHorizontal: 15,
        fontWeight: 'bold'
    },
    scrollView: {
        marginHorizontal: 15,
        marginTop: 30
    },
    containerDisciplina: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConteudo: {
        margin: 15,
        backgroundColor: "#781e20",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 22,
        color: "#FFF",
        fontWeight: 'bold'
    },
    buttonsCadastro: {
        marginBottom: 30
    },
    textCadastro: {
        fontSize: 26,
        marginHorizontal: 15,
        fontWeight: 'bold',
        marginBottom: 20
    },
    blur: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        height: 400,
        width: 350,
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    buttonModal: {
        width: 100,
        height: 50,
        backgroundColor: '#781e20',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        borderRadius: 10
    },
    nome: {
        fontWeight: 'bold',
        marginTop: 22
    },
    matricula: {
        fontWeight: 'bold',
        color: '#781e20'
    },
    nome1: {
        fontWeight: 'bold',
        marginTop: 65
    }
})