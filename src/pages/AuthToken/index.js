import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import api from '../../services/api';

export default function AuthToken() {

    const navigation = useNavigation();

    useEffect(() =>{
        const signToken = async () => {
            const id = await AsyncStorage.getItem("id");
            if (id) {
                try {
                    const data = await api.get('/professor', {
                        headers: { 'Authorization': `Bearer ${id}`}
                    });
                    navigation.navigate('Home');
                } catch (e) {
                    navigation.navigate('Login');
                    console.log(e)
                }
            } else {
                navigation.navigate('Login');
            }
        }
        signToken()
    })

    return (
        <View/>
    );
}