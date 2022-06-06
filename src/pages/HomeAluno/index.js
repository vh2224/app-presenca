import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import DisciplinaAluno from '../../components/DisciplinaAluno';
import * as Location from 'expo-location';

export default function HomeAluno() {

    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        console.log(location)
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

 return (
   <View style={styles.container}>
       <View style={styles.header}>
           <View>
                <Image
                    style={styles.logo}
                    source={require('../../assets/logo2.png')}
                />
           </View>
            <View>
                <TouchableOpacity style={styles.buttonPerfil} onPress={() => navigation.navigate('PerfilAluno')}>
                    <Text style={styles.text}>Ver Perfil</Text>
                </TouchableOpacity>
            </View>
       </View>
       <View style={styles.containerDisciplina}>
            <DisciplinaAluno />
            <DisciplinaAluno />
        </View>
       
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    logo: {
        width: 160,
        height: 60
    },
    buttonPerfil: {
        width: 80,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#781e20',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    containerDisciplina: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})