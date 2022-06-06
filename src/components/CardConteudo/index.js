import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function CardConteudo({data}) {

 return (
    <View style={styles.container}>
        <View style={styles.contentArea}>
            <Text style={styles.title}>Nome: {data.nome}</Text>
            <Text style={styles.subtitle}>Projeto: {data.link_github}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: '4%',
        marginTop: 30,
        borderRadius: 15,
        backgroundColor: '#FFF'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 5,
        color: '#781e20',
        marginBottom: 15
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 5
    },
    contentArea: {
        margin: 15
    }
})