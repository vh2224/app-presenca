import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity, Modal } from 'react-native';
import ComponentCamera from "../../components/ComponentCamera";

export default function PerfilAluno() {

    const [visibleModal, setVisibleModal] = useState(false);

    function tirarFoto() {
        setVisibleModal(true)
    }

 return (
   <SafeAreaView style={styles.container}>
       <View style={styles.contentArea}>
            <Image  
                source={require('../../assets/eu.jpg')}
                style={styles.foto}
            />
            <Text style={styles.textName}>Pedro Henrique</Text>
            <Text style={styles.textMatricula}>000000000</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton} onPress={() => tirarFoto()}>Trocar foto</Text>
            </TouchableOpacity>
       </View>

        <Modal transparent={true} visible={visibleModal}>
            <ComponentCamera />
        </Modal>
        
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15
    },
    foto: {
        width: 70,
        height: 70,
        borderRadius: 60 / 2
    },
    contentArea: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    textName: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8
    },
    textMatricula: {
        color: '#781e20',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 15
    },
    button: {
        backgroundColor: '#781e20',
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})