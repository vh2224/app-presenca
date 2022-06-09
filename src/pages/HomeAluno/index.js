import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Disciplina from '../../components/Disciplina';
import * as Location from 'expo-location';

import api from '../../services/api';

export default function HomeAluno() {

    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [authTokenProfessor, setAuthTokenProfessor] = useState(false);
    const [disciplinas, setDisciplinas] = useState([]);

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
    
                    <Text style={styles.text}>Disciplinas matriculadas</Text>
    
                    <View style={styles.containerDisciplina}>
                        {disciplinas && disciplinas.map((disciplina, index) => {
                            return (
                                <Disciplina data ={disciplina} key={index}/>
                            )
                        })}
                    </View>
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
})