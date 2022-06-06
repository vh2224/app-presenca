import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Disciplina({data}) {

    const navigation = useNavigation();

 return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Alunos', {data: data})}>
        <View style={styles.contentButton}>
            <Text style={styles.text}>{data.nome}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: '4%',
        marginTop: 30
    },
    shoesImg: {
        width: 175,
        height: 175
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginHorizontal: 5
    },
    contentButton: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        backgroundColor: '#781e20',
        borderRadius: 15,
        height: 130,
        width: 255
    }
})